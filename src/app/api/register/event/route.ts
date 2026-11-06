import { NextRequest, NextResponse } from 'next/server';
import { getStore, saveStore, EventRegistration } from '@/lib/store';
import { verifyTelebirrReceipt } from '@/lib/verify-receipt';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      fullName,
      email,
      phone,
      business,
      profession,
      interestCategory,
      paymentMethod = 'Telebirr',
      telebirrNumber = '+251 98 334 4761',
      amountSent = '900',
      transactionRef,
      paymentScreenshot,
      screenshotName,
    } = body;

    if (!fullName || !email || !phone) {
      return NextResponse.json(
        { error: 'Full name, email, and phone number are required.' },
        { status: 400 }
      );
    }

    const store = await getStore();
    const cleanRef = transactionRef ? String(transactionRef).trim().toUpperCase() : undefined;

    // Check for duplicate transaction reference
    if (cleanRef) {
      const existing = store.eventRegistrations.find(
        (r) => r.transactionRef && r.transactionRef.toUpperCase() === cleanRef
      );
      if (existing) {
        return NextResponse.json(
          {
            error: `This Telebirr transaction reference (${cleanRef}) has already been registered in the system. Each attendee requires a unique receipt.`,
          },
          { status: 400 }
        );
      }
    }

    // Run initial verification check
    const apiKey = store.settings.verifyEtApiKey || process.env.VERIFY_ET_API_KEY;
    let verificationStatus: 'unverified' | 'verified' | 'failed' | 'pending' = 'unverified';
    let verificationDetails: any = undefined;

    if (cleanRef || paymentScreenshot) {
      const vResult = await verifyTelebirrReceipt({
        transactionNumber: cleanRef,
        paymentScreenshot: paymentScreenshot || undefined,
        apiKey,
        expectedAmount: String(amountSent || '900'),
      });

      verificationStatus = vResult.status;
      verificationDetails = {
        verifiedAt: new Date().toISOString(),
        verifiedBy: vResult.verifiedBy,
        transactionNumber: vResult.transactionNumber || cleanRef,
        amount: vResult.amount || String(amountSent || '900'),
        payerName: vResult.payerName,
        receiverName: vResult.receiverName,
        message: vResult.message,
      };
    }

    const newRegistration: EventRegistration = {
      id: `reg-${Date.now()}`,
      sessionId: store.upcomingSession.number || 's07',
      sessionTitle: store.upcomingSession.title,
      fullName: String(fullName).trim(),
      email: String(email).trim().toLowerCase(),
      phone: String(phone).trim(),
      business: business ? String(business).trim() : undefined,
      profession: String(profession || 'Attendee').trim(),
      interestCategory: String(interestCategory || 'Coffee enthusiast').trim(),
      paymentMethod: 'Telebirr',
      telebirrNumber: String(telebirrNumber || '+251 98 334 4761'),
      amountSent: String(amountSent || '900').trim(),
      transactionRef: cleanRef,
      paymentScreenshot: paymentScreenshot || undefined,
      screenshotName: screenshotName ? String(screenshotName).trim() : undefined,
      status: verificationStatus === 'verified' ? 'accepted' : 'pending',
      verificationStatus,
      verificationDetails,
      createdAt: new Date().toISOString(),
    };

    store.eventRegistrations.unshift(newRegistration);
    await saveStore(store);

    return NextResponse.json({
      success: true,
      message:
        verificationStatus === 'verified'
          ? 'Registration and receipt verified successfully! Your seat is reserved.'
          : 'Registration and payment proof submitted successfully. Awaiting receipt verification.',
      registration: newRegistration,
      verificationStatus,
    });
  } catch (err) {
    console.error('Error submitting event registration:', err);
    return NextResponse.json(
      { error: 'Internal server error while saving registration' },
      { status: 500 }
    );
  }
}
