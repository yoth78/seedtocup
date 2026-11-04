/**
 * Verify.ET & Telebirr Receipt Verification Service
 * Integrates with Verify.ET (https://verify.et) and Telebirr upstream receipt checks.
 */

export interface VerifyReceiptOptions {
  transactionNumber?: string;
  paymentScreenshot?: string; // Base64 data URL
  apiKey?: string;
  expectedAmount?: string; // e.g. "900"
}

export interface VerificationResult {
  success: boolean;
  verified: boolean;
  status: 'verified' | 'failed' | 'pending';
  provider: 'telebirr';
  transactionNumber?: string;
  amount?: string;
  payerName?: string;
  receiverName?: string;
  verifiedBy: 'verify.et' | 'telebirr_direct' | 'manual';
  message: string;
  verifyEtUrl: string;
  officialReceiptUrl?: string;
  raw?: any;
}

export async function verifyTelebirrReceipt(
  options: VerifyReceiptOptions
): Promise<VerificationResult> {
  const { transactionNumber, paymentScreenshot, apiKey, expectedAmount = '900' } = options;

  const cleanRef = transactionNumber ? transactionNumber.trim().toUpperCase() : '';
  const verifyEtUrl = cleanRef
    ? `https://verify.et/verify/telebirr?ref=${encodeURIComponent(cleanRef)}`
    : 'https://verify.et/verify/telebirr';
  const officialReceiptUrl = cleanRef
    ? `https://transactioninfo.ethiotelecom.et/receipt/${encodeURIComponent(cleanRef)}`
    : undefined;

  // 1. Try Verify.ET API if an API key is available
  if (apiKey && cleanRef) {
    try {
      const response = await fetch('https://verify.et/api/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey.trim(),
          'Idempotency-Key': `stc-${cleanRef}-${Date.now()}`,
        },
        body: JSON.stringify({
          bank: 'telebirr',
          transactionNumber: cleanRef,
        }),
      });

      const data = await response.json().catch(() => null);

      if (response.ok && data) {
        // Successful response from Verify.ET
        const receipt = data.receipt || data.data?.receipt || data;
        const amount = String(receipt.amount || data.amount || '');
        const payer = receipt.sender || receipt.payer || data.sender || '';
        const receiver = receipt.receiver || receipt.recipient || data.receiver || '';
        const isCompleted =
          String(receipt.status || data.status || '').toLowerCase() === 'completed' ||
          String(receipt.status || data.status || '').toLowerCase() === 'success' ||
          response.status === 200;

        return {
          success: true,
          verified: isCompleted,
          status: isCompleted ? 'verified' : 'failed',
          provider: 'telebirr',
          transactionNumber: cleanRef,
          amount: amount || expectedAmount,
          payerName: payer,
          receiverName: receiver || 'Seed To Cup / Cashmere Events',
          verifiedBy: 'verify.et',
          message: isCompleted
            ? `Verified via Verify.ET API: ${amount ? amount + ' ETB' : ''} confirmed completed.`
            : `Verify.ET reported status: ${receipt.status || 'Unconfirmed'}.`,
          verifyEtUrl,
          officialReceiptUrl,
          raw: data,
        };
      } else if (data?.error) {
        console.warn('Verify.ET API returned error:', data.error);
      }
    } catch (err: any) {
      console.warn('Verify.ET API request failed, falling back:', err.message);
    }
  }

  // 2. Try Image Verification if image is present and API key is provided
  if (apiKey && paymentScreenshot && paymentScreenshot.startsWith('data:image')) {
    try {
      const base64Data = paymentScreenshot.replace(/^data:image\/\w+;base64,/, '');
      const imgRes = await fetch('https://links.et/api/verify-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey.trim(),
        },
        body: JSON.stringify({
          imageBase64: base64Data,
        }),
      });

      const imgData = await imgRes.json().catch(() => null);
      if (imgRes.ok && imgData) {
        const receipt = imgData.upstream?.result?.receipt || imgData.receipt || imgData;
        const extractedRef = imgData.reference || receipt.transactionNumber || cleanRef;
        return {
          success: true,
          verified: true,
          status: 'verified',
          provider: 'telebirr',
          transactionNumber: extractedRef || cleanRef,
          amount: receipt.amount ? String(receipt.amount) : expectedAmount,
          payerName: receipt.sender || '',
          receiverName: receipt.receiver || 'Seed To Cup / Cashmere Events',
          verifiedBy: 'verify.et',
          message: 'Screenshot authenticated via Verify.ET image analysis.',
          verifyEtUrl,
          officialReceiptUrl: extractedRef
            ? `https://transactioninfo.ethiotelecom.et/receipt/${encodeURIComponent(extractedRef)}`
            : officialReceiptUrl,
          raw: imgData,
        };
      }
    } catch (err: any) {
      console.warn('Verify.ET image verification failed:', err.message);
    }
  }

  // 3. Fallback: Format analysis & Direct Receipt link preparation
  // Standard Telebirr reference codes are typically 8-14 alphanumeric chars (e.g. DET..., CHQ..., etc.)
  if (cleanRef) {
    const isValidFormat = /^[A-Z0-9]{6,16}$/i.test(cleanRef);
    if (!isValidFormat) {
      return {
        success: false,
        verified: false,
        status: 'failed',
        provider: 'telebirr',
        transactionNumber: cleanRef,
        verifiedBy: 'manual',
        message: 'Invalid Telebirr reference code format. Must be 6-16 letters and numbers.',
        verifyEtUrl,
        officialReceiptUrl,
      };
    }

    return {
      success: true,
      verified: false,
      status: 'pending',
      provider: 'telebirr',
      transactionNumber: cleanRef,
      amount: expectedAmount,
      verifiedBy: 'telebirr_direct',
      message: 'Reference formatted correctly. Ready for instant cross-check on Verify.ET.',
      verifyEtUrl,
      officialReceiptUrl,
    };
  }

  return {
    success: false,
    verified: false,
    status: 'failed',
    provider: 'telebirr',
    verifiedBy: 'manual',
    message: 'No transaction reference code or receipt screenshot provided.',
    verifyEtUrl,
  };
}
