import { NextResponse } from 'next/server';
import { getStore } from '@/lib/store';

export async function GET() {
  try {
    const store = await getStore();
    return NextResponse.json({
      upcomingSession: store.upcomingSession,
      previousSessions: store.previousSessions,
      eventGallery: store.eventGallery,
      settings: store.settings,
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to retrieve site data' }, { status: 500 });
  }
}
