import { NextRequest, NextResponse } from 'next/server';
import { getStore, saveStore, ConsultationBooking } from '@/lib/store';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { fullName, email, phone, topic, preferredDate, preferredTime, description } = body;

    if (!fullName || !email || !phone || !topic) {
      return NextResponse.json(
        { error: 'Name, email, phone number, and consultation topic are required.' },
        { status: 400 }
      );
    }

    const store = await getStore();
    const newBooking: ConsultationBooking = {
      id: `con-${Date.now()}`,
      fullName: String(fullName).trim(),
      email: String(email).trim().toLowerCase(),
      phone: String(phone).trim(),
      topic: String(topic).trim(),
      preferredDate: String(preferredDate || 'Flexible').trim(),
      preferredTime: String(preferredTime || 'Flexible').trim(),
      description: String(description || '').trim(),
      price: store.settings.consultationFee || '1,000 ETB',
      status: 'pending',
      createdAt: new Date().toISOString(),
    };

    store.consultationBookings.unshift(newBooking);
    await saveStore(store);

    return NextResponse.json({
      success: true,
      message: 'Consultation booking requested. Our coordinator will contact you to confirm the time slot.',
      booking: newBooking,
    });
  } catch (err) {
    console.error('Error submitting consultation booking:', err);
    return NextResponse.json(
      { error: 'Internal server error while saving consultation booking' },
      { status: 500 }
    );
  }
}
