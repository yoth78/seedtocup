export type Session = {
  id: string;
  number: string;
  title: string;
  date: string;
  topic: string;
  description: string;
  image: string;
  youtubeUrl: string;
};

export const upcomingSession = {
  number: "Session 07",
  title: "The Art of Ethiopian Naturals",
  date: "Saturday, August 16, 2026",
  time: "3:00 PM — 6:00 PM EAT",
  venue: "The HUB Addis / Cashmere Events Space, Bole, Addis Ababa",
  topic: "Origin, processing, and the taste of place",
  speaker: {
    name: "Hanna Neuschwander",
    role: "Q Grader · Coffee Author",
    bio: "A specialty coffee educator with 15+ years working alongside Ethiopian producers, exploring how processing shapes the cup.",
  },
  image: "/images/events/IMG_3872.jpg",
  description:
    "Ethiopian naturals are among the most expressive coffees in the world. In this session we taste through five single-origin lots, break down processing at origin, and discuss what makes each region unmistakable.",
  learn: [
    "How natural processing shapes flavour profiles",
    "Distinguishing Yirgacheffe, Guji, Sidamo and Harar",
    "Cupping vocabulary for tasting like a professional",
    "How to source and store naturals for your café",
  ],
};

export const previousSessions: Session[] = [
  {
    id: "s06",
    number: "Session 06",
    title: "Agronomy & The Coffee Growth Lifecycle",
    date: "July 12, 2026",
    topic: "Plant Care · Soil · Harvest",
    description:
      "A deep-dive presentation exploring root systems, disease prevention, and tree development with leading Ethiopian agronomists.",
    image: "/images/events/IMG_4046.jpg",
    youtubeUrl: "https://youtube.com/@seedtocup_et?si=u-FwCIQngSuAsJjE",
  },
  {
    id: "s05",
    number: "Session 05",
    title: "Coffee, Culture & Community Networking",
    date: "June 14, 2026",
    topic: "Networking · Collaboration · Commerce",
    description:
      "Roasters, café founders, baristas, and coffee enthusiasts gathered for an interactive networking evening and idea exchange.",
    image: "/images/events/IMG_3971.jpg",
    youtubeUrl: "https://youtube.com/@seedtocup_et?si=u-FwCIQngSuAsJjE",
  },
  {
    id: "s04",
    number: "Session 04",
    title: "Seedling Management & Nursery Best Practices",
    date: "May 10, 2026",
    topic: "Origin · Cultivation · Sustainability",
    description:
      "Expert guidance on cultivating healthy seedlings, shade management, and nursery stewardship for Ethiopian coffee farms.",
    image: "/images/events/IMG_4011.jpg",
    youtubeUrl: "https://youtube.com/@seedtocup_et?si=u-FwCIQngSuAsJjE",
  },
  {
    id: "s03",
    number: "Session 03",
    title: "Coffee Service, Cupping & Sensory Notes",
    date: "April 12, 2026",
    topic: "Sensory · Service · Barista Craft",
    description:
      "Hands-on cupping session exploring regional tasting profiles, brewing temperature, and the craft of specialty coffee presentation.",
    image: "/images/events/IMG_3938.jpg",
    youtubeUrl: "https://youtube.com/@seedtocup_et?si=u-FwCIQngSuAsJjE",
  },
  {
    id: "s02",
    number: "Session 02",
    title: "Specialty Coffee Masterclass & Panel Discussion",
    date: "March 8, 2026",
    topic: "Industry Insights · Panel Q&A",
    description:
      "A full-house assembly of coffee minds discussing value addition, local roasting growth, and international market positioning.",
    image: "/images/events/IMG_4004.jpg",
    youtubeUrl: "https://youtube.com/@seedtocup_et?si=u-FwCIQngSuAsJjE",
  },
  {
    id: "s01",
    number: "Session 01",
    title: "Inaugural Session: Discovering Seed To Cup",
    date: "February 8, 2026",
    topic: "Culture · Story · Vision",
    description:
      "Our launch event by Cashmere Events — bringing together our founding members to celebrate Ethiopia's rich coffee heritage.",
    image: "/images/events/IMG_4057.jpg",
    youtubeUrl: "https://youtube.com/@seedtocup_et?si=u-FwCIQngSuAsJjE",
  },
];

export const eventGallery = [
  {
    id: "g1",
    title: "Participant Accreditation & Welcome",
    caption: "Official Seed To Cup participant badges and registration desk",
    image: "/images/events/IMG_3948.jpg",
  },
  {
    id: "g2",
    title: "Fresh Brew Station & Service",
    caption: "Attendees enjoying pour-over and freshly brewed Ethiopian specialty coffee",
    image: "/images/events/IMG_3938.jpg",
  },
  {
    id: "g3",
    title: "Coffee Tasting & Sensory Discussion",
    caption: "Tasting notes and flavor dialogue among coffee lovers",
    image: "/images/events/IMG_3958.jpg",
  },
  {
    id: "g4",
    title: "Community Exchange",
    caption: "Vibrant networking between café founders, baristas and roasters",
    image: "/images/events/IMG_3971.jpg",
  },
  {
    id: "g5",
    title: "Expert Seminar & Lecture",
    caption: "Interactive presentations by coffee agronomists and industry leaders",
    image: "/images/events/IMG_3876.jpg",
  },
  {
    id: "g6",
    title: "Full-House Audience",
    caption: "Over 50 engaged attendees learning together at The HUB Addis",
    image: "/images/events/IMG_4004.jpg",
  },
  {
    id: "g7",
    title: "Keynote Address",
    caption: "Deep dive into Ethiopian coffee value chains and trade",
    image: "/images/events/IMG_4057.jpg",
  },
  {
    id: "g8",
    title: "Closing & Appreciation",
    caption: "Official closing ceremony with Seed To Cup signature stage banners",
    image: "/images/events/IMG_4054.jpg",
  },
];

export const interestCategories = [
  "Coffee enthusiast",
  "Café owner",
  "Barista",
  "Roaster",
  "Coffee trader/exporter",
  "Aspiring coffee entrepreneur",
  "Other",
];

export const consultationTopics = [
  "Opening a coffee shop",
  "Coffee business strategy",
  "Coffee sourcing",
  "Roasting guidance",
  "Café concept development",
  "Menu and product development",
  "General coffee industry guidance",
];
