import session1 from "@/assets/session-1.jpg";
import session2 from "@/assets/session-2.jpg";
import session3 from "@/assets/session-3.jpg";
import farm from "@/assets/farm.jpg";
import barista from "@/assets/barista.jpg";
import hero from "@/assets/hero-coffee.jpg";

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
  venue: "Cashmere Events Space, Bole, Addis Ababa",
  topic: "Origin, processing, and the taste of place",
  speaker: {
    name: "Hanna Neuschwander",
    role: "Q Grader · Coffee Author",
    bio: "A specialty coffee educator with 15+ years working alongside Ethiopian producers, exploring how processing shapes the cup.",
  },
  description:
    "Ethiopian naturals are among the most expressive coffees in the world. In this session we taste through five single-origin lots, break down processing at origin, and discuss what makes each region unmistakable.",
  learn: [
    "How natural processing shapes flavour",
    "Distinguishing Yirgacheffe, Guji, Sidamo and Harar",
    "Cupping vocabulary for tasting like a professional",
    "How to source and store naturals for your café",
  ],
};

export const previousSessions: Session[] = [
  {
    id: "s06",
    number: "Session 06",
    title: "Espresso: Dialing in the Perfect Shot",
    date: "July 12, 2026",
    topic: "Extraction · Grind · Pressure",
    description:
      "A hands-on evening exploring the variables that make or break espresso, with three roasters comparing their approaches.",
    image: session2,
    youtubeUrl: "#",
  },
  {
    id: "s05",
    number: "Session 05",
    title: "Building a Café That Lasts",
    date: "June 14, 2026",
    topic: "Business · Concept · Menu",
    description:
      "Café owners share what they wish they'd known before opening — from lease negotiation to menu engineering.",
    image: session3,
    youtubeUrl: "#",
  },
  {
    id: "s04",
    number: "Session 04",
    title: "From Cherry to Green: A Farmer's Perspective",
    date: "May 10, 2026",
    topic: "Origin · Sustainability",
    description:
      "A conversation with three Ethiopian coffee farmers on climate, quality, and the economics behind every kilogram.",
    image: farm,
    youtubeUrl: "#",
  },
  {
    id: "s03",
    number: "Session 03",
    title: "Latte Art & Milk Science",
    date: "April 12, 2026",
    topic: "Barista Craft",
    description:
      "An intimate barista session with live demos on steaming, pouring, and the physics behind that perfect rosetta.",
    image: barista,
    youtubeUrl: "#",
  },
  {
    id: "s02",
    number: "Session 02",
    title: "The Roaster's Ear",
    date: "March 8, 2026",
    topic: "Roasting · Development",
    description:
      "Sensory roasting — how listening, seeing, and smelling guide the development of a coffee's final character.",
    image: session1,
    youtubeUrl: "#",
  },
  {
    id: "s01",
    number: "Session 01",
    title: "A History of Coffee in Ethiopia",
    date: "February 8, 2026",
    topic: "Culture · Story",
    description:
      "Our inaugural session. A journey through legend, ritual and the birthplace of coffee.",
    image: hero,
    youtubeUrl: "#",
  },
];

export const interestCategories = [
  "Coffee enthusiast",
  "Café owner",
  "Barista",
  "Roaster",
  "Coffee trader / exporter",
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
