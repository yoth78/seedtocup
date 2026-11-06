import { NextRequest, NextResponse } from 'next/server';
import { getStore, saveStore, MembershipApplication } from '@/lib/store';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { fullName, email, phone, profession, reason } = body;

    if (!fullName || !email || !phone) {
      return NextResponse.json(
        { error: 'Name, email, and phone number are required.' },
        { status: 400 }
      );
    }

    const store = await getStore();
    const newMembership: MembershipApplication = {
      id: `mem-${Date.now()}`,
      fullName: String(fullName).trim(),
      email: String(email).trim().toLowerCase(),
      phone: String(phone).trim(),
      profession: String(profession || 'Enthusiast').trim(),
      reason: String(reason || '').trim(),
      amount: store.settings.annualMembershipFee || '15,000 ETB',
      status: 'pending',
      createdAt: new Date().toISOString(),
    };

    store.membershipApplications.unshift(newMembership);
    await saveStore(store);

    return NextResponse.json({
      success: true,
      message: 'Membership application received. Our team will verify and activate your membership.',
      membership: newMembership,
    });
  } catch (err) {
    console.error('Error submitting membership application:', err);
    return NextResponse.json(
      { error: 'Internal server error while saving membership application' },
      { status: 500 }
    );
  }
}
