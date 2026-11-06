import { NextRequest, NextResponse } from 'next/server';
import { getStore, saveStore } from '@/lib/store';
import { verifyTelebirrReceipt } from '@/lib/verify-receipt';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { registrationId, manualStatus, notes } = body;

    if (!registrationId) {
      return NextResponse.json(
        { error: 'registrationId is required' },
        { status: 400 }
      );
    }

    const store = await getStore();
    const reg = store.eventRegistrations.find((r) => r.id === registrationId);

    if (!reg) {
      return NextResponse.json(
        { error: 'Registration not found' },
        { status: 404 }
      );
    }

    // Manual status override by admin
    if (manualStatus) {
      reg.verificationStatus = manualStatus;
      reg.verificationDetails = {
        verifiedAt: new Date().toISOString(),
        verifiedBy: 'manual',
        transactionNumber: reg.transactionRef,
        amount: reg.amountSent,
        message: notes || `Manually marked as ${manualStatus} by admin.`,
      };
      if (manualStatus === 'verified' && reg.status === 'pending') {
        reg.status = 'accepted';
      }

      await saveStore(store);

      return NextResponse.json({
        success: true,
        verification: reg.verificationDetails,
        registration: reg,
      });
    }

    // Run verification via Verify.ET service
    const apiKey = store.settings.verifyEtApiKey || process.env.VERIFY_ET_API_KEY;
    const result = await verifyTelebirrReceipt({
      transactionNumber: reg.transactionRef,
      paymentScreenshot: reg.paymentScreenshot,
      apiKey,
      expectedAmount: reg.amountSent || '900',
    });

    reg.verificationStatus = result.status;
    reg.verificationDetails = {
      verifiedAt: new Date().toISOString(),
      verifiedBy: result.verifiedBy,
      transactionNumber: result.transactionNumber || reg.transactionRef,
      amount: result.amount || reg.amountSent,
      payerName: result.payerName,
      receiverName: result.receiverName,
      message: result.message,
      raw: result.raw,
    };

    if (result.verified && reg.status === 'pending') {
      reg.status = 'accepted';
    }

    await saveStore(store);

    return NextResponse.json({
      success: true,
      result,
      registration: reg,
    });
  } catch (error: any) {
    console.error('Error verifying receipt:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to verify receipt' },
      { status: 500 }
    );
  }
}
