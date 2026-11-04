// CMS-friendly data structure for sessions/events
// In production, this would come from a headless CMS like Contentful, Sanity, or Strapi

export interface Session {
  id: string;
  title: string;
  date: string;
  time: string;
  venue: string;
  topic: string;
  description: string;
  longDescription?: string;
  speaker: {
    name: string;
    title: string;
    bio?: string;
    image?: string;
  };
  whatYouWillLearn: string[];
  image: string;
  youtubeUrl?: string;
  isPast: boolean;
  isFeatured?: boolean;
  category?: string;
}

export interface ConsultationTopic {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export const upcomingSession: Session = {
  id: 'session-7',
  title: 'The Art of Ethiopian Coffee Roasting',
  date: 'December 14, 2026',
  time: '10:00 AM - 1:00 PM (EAT)',
  venue: 'Cashmere Events Space, Addis Ababa',
  topic: 'Roasting Techniques & Profile Development',
  description: 'Explore the science and artistry behind roasting Ethiopian coffee beans. From green bean selection to the perfect roast profile, learn how temperature, time, and technique transform raw coffee into extraordinary flavors.',
  longDescription: 'Join us for an immersive session where you\'ll discover the nuances of roasting Ethiopian single-origin coffee. Our expert roaster will walk you through the complete roasting process — from evaluating green beans to developing roast profiles that highlight the unique terroir of Ethiopian coffee regions. Whether you\'re a home roaster, café owner, or coffee professional, this session will deepen your understanding of the craft.',
  speaker: {
    name: 'Abebe Fekadu',
    title: 'Head Roaster & Coffee Q Grader',
    bio: 'With over 15 years of experience in Ethiopian specialty coffee, Abebe has roasted for some of the country\'s most celebrated coffee brands and holds a Q Grader certification from the Coffee Quality Institute.',
    image: '/images/speaker-placeholder.jpg',
  },
  whatYouWillLearn: [
    'Understanding green bean characteristics and grading',
    'First crack, second crack, and development time',
    'Creating roast profiles for Ethiopian single-origins',
    'Cupping and evaluating roasted coffee',
    'Common roasting defects and how to avoid them',
    'Equipment selection for home and commercial roasting',
  ],
  image: '/images/session-placeholder.jpg',
  isPast: false,
  isFeatured: true,
  category: 'Roasting',
};

export const pastSessions: Session[] = [
  {
    id: 'session-6',
    title: 'Coffee Origins: A Journey Through Ethiopian Terroir',
    date: 'November 9, 2026',
    time: '10:00 AM - 1:00 PM',
    venue: 'Cashmere Events Space, Addis Ababa',
    topic: 'Coffee Origins & Terroir',
    description: 'We explored how altitude, soil, and climate shape the flavor profiles of coffees from Yirgacheffe, Sidamo, Guji, and Harrar — and why Ethiopian coffee is considered the birthplace of specialty.',
    speaker: {
      name: 'Dr. Meseret Tadesse',
      title: 'Coffee Agronomist & Researcher',
    },
    whatYouWillLearn: [],
    image: '/images/session-placeholder.jpg',
    youtubeUrl: 'https://youtube.com/@seedtocup_et?si=u-FwCIQngSuAsJjE',
    isPast: true,
    category: 'Origins',
  },
  {
    id: 'session-5',
    title: 'Building a Café Business in Addis Ababa',
    date: 'October 12, 2026',
    time: '10:00 AM - 1:00 PM',
    venue: 'Cashmere Events Space, Addis Ababa',
    topic: 'Coffee Business & Entrepreneurship',
    description: 'A deep dive into the business of coffee — from café concept development to supply chain, menu pricing, staffing, and creating a memorable customer experience in a growing market.',
    speaker: {
      name: 'Hanna Mekonnen',
      title: 'Café Owner & Business Consultant',
    },
    whatYouWillLearn: [],
    image: '/images/session-placeholder.jpg',
    youtubeUrl: 'https://youtube.com/@seedtocup_et?si=u-FwCIQngSuAsJjE',
    isPast: true,
    category: 'Business',
  },
  {
    id: 'session-4',
    title: 'The Science of Brewing: Pour-Over to Espresso',
    date: 'September 14, 2026',
    time: '10:00 AM - 1:00 PM',
    venue: 'Cashmere Events Space, Addis Ababa',
    topic: 'Brewing Methods & Techniques',
    description: 'From the ritualistic Ethiopian jebena to precision pour-over and espresso extraction — we explored how water temperature, grind size, and brewing time create the perfect cup.',
    speaker: {
      name: 'Dawit Gebremedhin',
      title: 'SCA Certified Barista Trainer',
    },
    whatYouWillLearn: [],
    image: '/images/session-placeholder.jpg',
    youtubeUrl: 'https://youtube.com/@seedtocup_et?si=u-FwCIQngSuAsJjE',
    isPast: true,
    category: 'Brewing',
  },
  {
    id: 'session-3',
    title: 'Coffee Cupping: Training Your Palate',
    date: 'August 10, 2026',
    time: '10:00 AM - 1:00 PM',
    venue: 'Cashmere Events Space, Addis Ababa',
    topic: 'Cupping & Sensory Analysis',
    description: 'An interactive cupping session where participants learned to identify acidity, body, sweetness, and flavor notes across Ethiopian coffee varieties using SCA cupping protocols.',
    speaker: {
      name: 'Sara Alemayehu',
      title: 'Q Grader & Sensory Analyst',
    },
    whatYouWillLearn: [],
    image: '/images/session-placeholder.jpg',
    youtubeUrl: 'https://youtube.com/@seedtocup_et?si=u-FwCIQngSuAsJjE',
    isPast: true,
    category: 'Cupping',
  },
  {
    id: 'session-2',
    title: 'From Farm to Export: The Ethiopian Coffee Supply Chain',
    date: 'July 13, 2026',
    time: '10:00 AM - 1:00 PM',
    venue: 'Cashmere Events Space, Addis Ababa',
    topic: 'Supply Chain & Trade',
    description: 'Understanding the journey of Ethiopian coffee from smallholder farms through washing stations, the ECX, and onto the global market — and the opportunities within.',
    speaker: {
      name: 'Yonas Berhanu',
      title: 'Coffee Exporter & Trade Specialist',
    },
    whatYouWillLearn: [],
    image: '/images/session-placeholder.jpg',
    youtubeUrl: 'https://youtube.com/@seedtocup_et?si=u-FwCIQngSuAsJjE',
    isPast: true,
    category: 'Trade',
  },
  {
    id: 'session-1',
    title: 'Seed To Cup: The Inaugural Session',
    date: 'June 8, 2026',
    time: '10:00 AM - 1:00 PM',
    venue: 'Cashmere Events Space, Addis Ababa',
    topic: 'Introduction to Specialty Coffee',
    description: 'The very first Seed To Cup session — an introduction to the world of specialty coffee, Ethiopia\'s unique place in coffee history, and the vision behind our platform.',
    speaker: {
      name: 'Seed To Cup Team',
      title: 'Platform Founders',
    },
    whatYouWillLearn: [],
    image: '/images/session-placeholder.jpg',
    youtubeUrl: 'https://youtube.com/@seedtocup_et?si=u-FwCIQngSuAsJjE',
    isPast: true,
    category: 'Introduction',
  },
];

export const consultationTopics: ConsultationTopic[] = [
  {
    id: 'opening-cafe',
    title: 'Opening a Coffee Shop',
    description: 'From concept to launch — location, design, equipment, licensing, and everything you need to open a successful café.',
    icon: '☕',
  },
  {
    id: 'business-strategy',
    title: 'Coffee Business Strategy',
    description: 'Market positioning, competitive analysis, financial planning, and growth strategies for coffee businesses.',
    icon: '📊',
  },
  {
    id: 'sourcing',
    title: 'Coffee Sourcing',
    description: 'Navigate Ethiopian coffee sourcing — from farm relationships to quality assessment and supply chain management.',
    icon: '🌱',
  },
  {
    id: 'roasting',
    title: 'Roasting Guidance',
    description: 'Develop roast profiles, select equipment, and optimize your roasting process for consistency and quality.',
    icon: '🔥',
  },
  {
    id: 'concept-development',
    title: 'Café Concept Development',
    description: 'Create a compelling café concept — brand identity, interior design, customer experience, and atmosphere.',
    icon: '✨',
  },
  {
    id: 'menu-development',
    title: 'Menu & Product Development',
    description: 'Craft a menu that tells a story — espresso drinks, filter coffee, food pairings, and retail products.',
    icon: '📋',
  },
  {
    id: 'general-guidance',
    title: 'General Coffee Industry Guidance',
    description: 'Explore opportunities in the Ethiopian and global coffee industry — from trading to specialty retail.',
    icon: '🧭',
  },
];

export const membershipBenefits = [
  {
    title: 'Monthly Coffee Sessions',
    description: 'Access to all 12 Seed To Cup sessions throughout the year, covering every aspect of the coffee journey.',
    icon: '📅',
  },
  {
    title: 'Expert Learning',
    description: 'Learn directly from coffee professionals, roasters, agronomists, and industry experts.',
    icon: '🎓',
  },
  {
    title: 'Community Network',
    description: 'Connect with fellow coffee enthusiasts, entrepreneurs, baristas, and industry professionals.',
    icon: '🤝',
  },
  {
    title: 'Priority Access',
    description: 'Get early access to sessions, special events, and exclusive Seed To Cup experiences.',
    icon: '⭐',
  },
  {
    title: 'Exclusive Updates',
    description: 'Receive members-only content, industry insights, and community updates.',
    icon: '📬',
  },
  {
    title: 'Session Recaps',
    description: 'Access recorded session highlights and educational resources from past events.',
    icon: '🎬',
  },
];
