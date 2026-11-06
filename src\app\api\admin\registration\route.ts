import { NextRequest, NextResponse } from 'next/server';
import { getStore, saveStore } from '@/lib/store';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { type, id, status, notes, action } = body;

    if (!type || !id) {
      return NextResponse.json({ error: 'Type and ID are required' }, { status: 400 });
    }

    const store = await getStore();

    if (type === 'event') {
      const idx = store.eventRegistrations.findIndex((item) => item.id === id);
      if (idx === -1) {
        return NextResponse.json({ error: 'Event registration not found' }, { status: 404 });
      }

      if (action === 'delete') {
        store.eventRegistrations.splice(idx, 1);
      } else {
        if (status) store.eventRegistrations[idx].status = status;
        if (notes !== undefined) store.eventRegistrations[idx].notes = notes;
      }
    } else if (type === 'membership') {
      const idx = store.membershipApplications.findIndex((item) => item.id === id);
      if (idx === -1) {
        return NextResponse.json({ error: 'Membership application not found' }, { status: 404 });
      }

      if (action === 'delete') {
        store.membershipApplications.splice(idx, 1);
      } else {
        if (status) store.membershipApplications[idx].status = status;
        if (notes !== undefined) store.membershipApplications[idx].notes = notes;
      }
    } else if (type === 'consultation') {
      const idx = store.consultationBookings.findIndex((item) => item.id === id);
      if (idx === -1) {
        return NextResponse.json({ error: 'Consultation booking not found' }, { status: 404 });
      }

      if (action === 'delete') {
        store.consultationBookings.splice(idx, 1);
      } else {
        if (status) store.consultationBookings[idx].status = status;
        if (notes !== undefined) store.consultationBookings[idx].notes = notes;
      }
    } else {
      return NextResponse.json({ error: 'Invalid registration type' }, { status: 400 });
    }

    await saveStore(store);

    return NextResponse.json({
      success: true,
      message: action === 'delete' ? 'Registration removed' : 'Registration status updated successfully',
      data: store,
    });
  } catch (error) {
    console.error('Registration status update error:', error);
    return NextResponse.json({ error: 'Failed to update registration' }, { status: 500 });
  }
}
