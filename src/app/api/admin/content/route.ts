import { NextRequest, NextResponse } from 'next/server';
import { getStore, saveStore } from '@/lib/store';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { section, payload } = body;

    if (!section || !payload) {
      return NextResponse.json({ error: 'Section and payload are required' }, { status: 400 });
    }

    const store = await getStore();

    if (section === 'upcomingSession') {
      store.upcomingSession = {
        ...store.upcomingSession,
        ...payload,
      };
    } else if (section === 'previousSessions') {
      store.previousSessions = payload;
    } else if (section === 'addPreviousSession') {
      store.previousSessions.unshift(payload);
    } else if (section === 'deletePreviousSession') {
      store.previousSessions = store.previousSessions.filter((s) => s.id !== payload.id);
    } else if (section === 'eventGallery') {
      store.eventGallery = payload;
    } else if (section === 'settings') {
      store.settings = {
        ...store.settings,
        ...payload,
      };
    } else {
      return NextResponse.json({ error: 'Invalid content section' }, { status: 400 });
    }

    await saveStore(store);

    return NextResponse.json({
      success: true,
      message: `${section} content updated successfully`,
      data: store,
    });
  } catch (error) {
    console.error('Content update error:', error);
    return NextResponse.json({ error: 'Failed to update content' }, { status: 500 });
  }
}
