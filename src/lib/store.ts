import fs from 'fs/promises';
import path from 'path';
import {
  upcomingSession as defaultUpcoming,
  previousSessions as defaultPrevious,
  eventGallery as defaultGallery,
  Session,
} from './sessions-data';

export type { Session };
export type RegistrationStatus = 'pending' | 'accepted' | 'declined';
export type MembershipStatus = 'pending' | 'active' | 'declined';
export type ConsultationStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled';

export interface EventRegistration {
  id: string;
  sessionId: string;
  sessionTitle: string;
  fullName: string;
  email: string;
  phone: string;
  profession: string;
  business?: string;
  interestCategory: string;
  paymentMethod: string;
  telebirrNumber?: string;
  amountSent: string;
  transactionRef?: string;
  paymentScreenshot?: string;
  screenshotName?: string;
  status: RegistrationStatus;
  createdAt: string;
  notes?: string;
  verificationStatus?: 'unverified' | 'verified' | 'failed' | 'pending';
  verificationDetails?: {
    verifiedAt?: string;
    verifiedBy?: 'verify.et' | 'telebirr_direct' | 'manual';
    transactionNumber?: string;
    amount?: string;
    payerName?: string;
    receiverName?: string;
    message?: string;
    raw?: any;
  };
}

export interface MembershipApplication {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  profession: string;
  reason: string;
  amount: string;
  status: MembershipStatus;
  createdAt: string;
  notes?: string;
}

export interface ConsultationBooking {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  topic: string;
  preferredDate: string;
  preferredTime: string;
  description: string;
  price: string;
  status: ConsultationStatus;
  createdAt: string;
  notes?: string;
}

export interface UpcomingSessionData {
  number: string;
  title: string;
  date: string;
  time: string;
  venue: string;
  topic: string;
  speaker: {
    name: string;
    role: string;
    bio: string;
  };
  image: string;
  description: string;
  learn: string[];
}

export interface GalleryItem {
  id: string;
  title: string;
  caption: string;
  image: string;
}

export interface SiteSettings {
  annualMembershipFee: string;
  consultationFee: string;
  contactEmail: string;
  phone: string;
  youtubeUrl: string;
  linkedinUrl: string;
  verifyEtApiKey?: string;
  telebirrAccount?: string;
}

export interface AppStoreData {
  upcomingSession: UpcomingSessionData;
  previousSessions: Session[];
  eventGallery: GalleryItem[];
  settings: SiteSettings;
  eventRegistrations: EventRegistration[];
  membershipApplications: MembershipApplication[];
  consultationBookings: ConsultationBooking[];
}

const DATA_DIR = path.join(process.cwd(), 'data');
const DATA_FILE = path.join(DATA_DIR, 'content-store.json');

const INITIAL_DATA: AppStoreData = {
  upcomingSession: defaultUpcoming,
  previousSessions: defaultPrevious,
  eventGallery: defaultGallery,
  settings: {
    annualMembershipFee: '15,000 ETB',
    consultationFee: '1,000 ETB',
    contactEmail: 'hello@seedtocup.et',
    phone: '+251 911 234 567',
    youtubeUrl: 'https://youtube.com/@seedtocup_et?si=u-FwCIQngSuAsJjE',
    linkedinUrl: 'https://linkedin.com/showcase/seedtocup-et',
  },
  eventRegistrations: [
    {
      id: 'reg-001',
      sessionId: 's07',
      sessionTitle: 'The Art of Ethiopian Naturals',
      fullName: 'Natnael Tesfaye',
      email: 'natnael.t@example.com',
      phone: '+251 911 458 920',
      profession: 'Head Barista, Tomoca Coffee',
      interestCategory: 'Barista',
      paymentMethod: 'Telebirr',
      telebirrNumber: '+251 98 334 4761',
      amountSent: '900',
      transactionRef: 'TB98347101',
      status: 'accepted',
      createdAt: '2026-08-02T10:14:00Z',
      notes: 'Badge confirmed and seat reserved.',
    },
    {
      id: 'reg-002',
      sessionId: 's07',
      sessionTitle: 'The Art of Ethiopian Naturals',
      fullName: 'Hana Tadesse',
      email: 'hana.tadesse@example.com',
      phone: '0970902922',
      profession: 'Specialty Roastery Co-founder',
      business: 'ELEMCH SOLUTION',
      interestCategory: 'Roaster',
      paymentMethod: 'Telebirr',
      telebirrNumber: '+251 98 334 4761',
      amountSent: '900',
      transactionRef: 'TB88349021',
      status: 'pending',
      createdAt: '2026-08-03T14:22:00Z',
    },
    {
      id: 'reg-003',
      sessionId: 's07',
      sessionTitle: 'The Art of Ethiopian Naturals',
      fullName: 'Mikiyas Kassaye',
      email: 'mikiyas.k@example.com',
      phone: '0911223344',
      profession: 'Café Owner in Bole',
      interestCategory: 'Café owner',
      paymentMethod: 'Telebirr',
      telebirrNumber: '+251 98 334 4761',
      amountSent: '900',
      transactionRef: 'TB77123904',
      status: 'pending',
      createdAt: '2026-08-04T09:40:00Z',
    },
    {
      id: 'reg-004',
      sessionId: 's07',
      sessionTitle: 'The Art of Ethiopian Naturals',
      fullName: 'Bethlehem Alemu',
      email: 'bethlehem.a@example.com',
      phone: '0944670231',
      profession: 'Green Coffee Exporter',
      interestCategory: 'Coffee trader/exporter',
      paymentMethod: 'Telebirr',
      telebirrNumber: '+251 98 334 4761',
      amountSent: '900',
      transactionRef: 'TB66509124',
      status: 'accepted',
      createdAt: '2026-08-04T16:05:00Z',
    },
  ],
  membershipApplications: [
    {
      id: 'mem-001',
      fullName: 'Yonas Gebremedhin',
      email: 'yonas.g@origincoffee.et',
      phone: '+251 911 778 899',
      profession: 'Commercial Roastery Director',
      reason: 'Looking to network with exporters and stay up to date on processing innovations.',
      amount: '15,000 ETB',
      status: 'active',
      createdAt: '2026-07-28T11:00:00Z',
      notes: 'Payment verified via Telebirr. Annual card issued.',
    },
    {
      id: 'mem-002',
      fullName: 'Selamawit Desta',
      email: 'selam.desta@gmail.com',
      phone: '+251 912 334 556',
      profession: 'Q-Grader & Coffee Enthusiast',
      reason: 'Passionate about cupping standards and community education in Ethiopia.',
      amount: '15,000 ETB',
      status: 'pending',
      createdAt: '2026-08-02T15:30:00Z',
    },
    {
      id: 'mem-003',
      fullName: 'Dawit Mengistu',
      email: 'dawit.m@cafesolutions.et',
      phone: '+251 920 889 123',
      profession: 'Espresso Bar Chain Operator',
      reason: 'Want our baristas and shift managers to attend all 12 monthly masterclasses.',
      amount: '15,000 ETB',
      status: 'pending',
      createdAt: '2026-08-03T18:15:00Z',
    },
  ],
  consultationBookings: [
    {
      id: 'con-001',
      fullName: 'Abel Kebede',
      email: 'abel.kebede@newwavecafe.com',
      phone: '+251 911 556 778',
      topic: 'Opening a coffee shop',
      preferredDate: '2026-08-20',
      preferredTime: '10:00',
      description: 'Opening a 45-seat specialty espresso bar near Kazanchis. Need advice on bar flow and machine sourcing.',
      price: '1,000 ETB',
      status: 'confirmed',
      createdAt: '2026-08-01T12:00:00Z',
      notes: 'Scheduled for Aug 20, 10:00 AM at Cashmere Space.',
    },
    {
      id: 'con-002',
      fullName: 'Lensa Bekele',
      email: 'lensa.b@roastcraft.et',
      phone: '+251 933 445 566',
      topic: 'Roasting guidance',
      preferredDate: '2026-08-22',
      preferredTime: '14:30',
      description: 'Dialing in roast profiles for Sidama natural lots on a 5kg drum roaster. Experiencing under-development in first crack.',
      price: '1,000 ETB',
      status: 'pending',
      createdAt: '2026-08-03T09:10:00Z',
    },
  ],
};

let memoryStore: AppStoreData | null = null;

export async function getStore(): Promise<AppStoreData> {
  if (memoryStore) {
    return memoryStore;
  }

  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    const content = await fs.readFile(DATA_FILE, 'utf-8');
    memoryStore = JSON.parse(content) as AppStoreData;
    return memoryStore;
  } catch {
    // If file doesn't exist or is invalid, seed it
    memoryStore = { ...INITIAL_DATA };
    try {
      await fs.writeFile(DATA_FILE, JSON.stringify(memoryStore, null, 2), 'utf-8');
    } catch (writeErr) {
      console.error('Failed to write initial store to disk, using in-memory:', writeErr);
    }
    return memoryStore;
  }
}

export async function saveStore(data: AppStoreData): Promise<void> {
  memoryStore = data;
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error('Failed to persist store to disk:', err);
  }
}
