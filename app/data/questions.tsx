import {
  Heart,
  Coffee,
  Smartphone,
  Briefcase,
  Headphones,
  Book,
  Users,
  Calendar,
  Home,
} from "lucide-react";
import { ReactElement } from "react";
import { LucideIcon } from "lucide-react";
import { Question } from "./types";

function createIcon(
  Icon: LucideIcon,
  className: string = "w-6 h-6"
): ReactElement {
  return <Icon className={className} />;
}

export const questions: Question[] = [
  {
    id: "1",
    text: "How do you typically meet potential romantic interests?",
    icon: createIcon(Users, "w-6 h-6 text-pink-500"),
    category: "social",
    answers: [
      {
        text: "Through mutual friends or social events",
        traits: {
          socialStyle: 8,
          communication: 7,
          independence: 5,
        },
        explanation:
          "You thrive in social settings and value authentic connections",
      },
      {
        text: "Dating apps are my go-to",
        traits: {
          socialStyle: 6,
          independence: 7,
          dateStyle: 8,
        },
        explanation:
          "You're proactive about dating and comfortable with modern approaches",
      },
      {
        text: "I don't actively seek out romantic interests",
        traits: {
          independence: 9,
          emotionalReadiness: 4,
          dateStyle: 3,
        },
        explanation:
          "You prioritize independence and aren't focused on dating right now",
      },
      {
        text: "In class or at work",
        traits: {
          socialStyle: 7,
          dateStyle: 5,
          communication: 6,
        },
        explanation:
          "You connect naturally through shared environments and common interests",
      },
    ],
  },
  {
    id: "2",
    text: "What's your ideal first date?",
    icon: createIcon(Coffee, "w-6 h-6 text-brown-500"),
    category: "dating",
    answers: [
      {
        text: "Coffee and a walk in the park",
        traits: {
          dateStyle: 6,
          communication: 7,
          emotionalReadiness: 7,
        },
        explanation:
          "You value meaningful conversation and authentic connections",
      },
      {
        text: "Netflix and chill",
        traits: {
          dateStyle: 8,
          communication: 6,
          emotionalReadiness: 5,
        },
        explanation:
          "You're comfortable with modern approaches and value connection",
      },
      {
        text: "An exciting activity like rock climbing or escape room",
        traits: {
          dateStyle: 2,
          communication: 5,
          emotionalReadiness: 3,
        },
        explanation: "You prefer more adventurous and exciting dates",
      },
      {
        text: "Dinner at a trendy restaurant",
        traits: {
          dateStyle: 4,
          communication: 5,
          emotionalReadiness: 4,
        },
        explanation: "You value a nice dining experience and connection",
      },
    ],
  },
  {
    id: "3",
    text: "How do you handle your crush's social media activity?",
    icon: createIcon(Smartphone, "w-6 h-6 text-blue-500"),
    category: "social",
    answers: [
      {
        text: "I don't pay much attention to it",
        traits: {
          socialStyle: 3,
          communication: 3,
          independence: 3,
        },
        explanation: "You're not very interested in social media activity",
      },
      {
        text: "I analyze every post and story",
        traits: {
          socialStyle: 7,
          communication: 7,
          independence: 7,
        },
        explanation: "You're very interested in social media activity",
      },
      {
        text: "I casually like their posts sometimes",
        traits: {
          socialStyle: 4,
          communication: 4,
          independence: 4,
        },
        explanation: "You're somewhat interested in social media activity",
      },
      {
        text: "I don't use social media much",
        traits: {
          socialStyle: 1,
          communication: 1,
          independence: 1,
        },
        explanation: "You're not interested in social media activity",
      },
    ],
  },
  {
    id: "4",
    text: "What's your approach to balancing romance and career/education?",
    icon: createIcon(Briefcase, "w-6 h-6 text-gray-600"),
    category: "career",
    answers: [
      {
        text: "Career/education comes first, always",
        traits: {
          career: 7,
          independence: 5,
          dateStyle: 3,
        },
        explanation: "You prioritize career and education",
      },
      {
        text: "I strive for a healthy balance",
        traits: {
          career: 3,
          independence: 3,
          dateStyle: 3,
        },
        explanation:
          "You strive for a balance between career and personal life",
      },
      {
        text: "Romance is my priority",
        traits: {
          career: 5,
          independence: 3,
          dateStyle: 8,
        },
        explanation: "You prioritize romance",
      },
      {
        text: "I struggle to manage both",
        traits: {
          career: 6,
          independence: 6,
          dateStyle: 6,
        },
        explanation: "You struggle to balance career and personal life",
      },
    ],
  },
  {
    id: "5",
    text: "How do you spend most of your free time on campus?",
    icon: createIcon(Headphones, "w-6 h-6 text-purple-500"),
    category: "lifestyle",
    answers: [
      {
        text: "At campus events and club meetings",
        traits: {
          socialStyle: 8,
          communication: 7,
          flexibility: 6,
        },
        explanation: "You're actively involved in campus life and community",
      },
      {
        text: "In study groups or the library",
        traits: {
          career: 8,
          independence: 6,
          communication: 5,
        },
        explanation:
          "You prioritize academics while maintaining social connections",
      },
      {
        text: "Hanging out in dorm common areas",
        traits: {
          socialStyle: 7,
          communication: 8,
          flexibility: 7,
        },
        explanation: "You value casual social interactions and community",
      },
      {
        text: "In my room gaming or watching shows",
        traits: {
          independence: 8,
          socialStyle: 4,
          flexibility: 3,
        },
        explanation: "You prefer solitary activities and personal space",
      },
    ],
  },
  {
    id: "6",
    text: "How do you feel about long-term relationships?",
    icon: createIcon(Heart, "w-6 h-6 text-red-500"),
    category: "dating",
    answers: [
      {
        text: "I'm actively looking for one",
        traits: {
          dateStyle: 2,
          communication: 3,
          emotionalReadiness: 3,
        },
        explanation: "You're actively seeking a long-term relationship",
      },
      {
        text: "I'm open to it, but not in a rush",
        traits: {
          dateStyle: 4,
          communication: 4,
          emotionalReadiness: 4,
        },
        explanation:
          "You're open to the idea of a long-term relationship but not in a rush",
      },
      {
        text: "I prefer casual dating",
        traits: {
          dateStyle: 6,
          communication: 6,
          emotionalReadiness: 6,
        },
        explanation: "You prefer casual dating over long-term relationships",
      },
      {
        text: "I'm not interested in relationships right now",
        traits: {
          dateStyle: 8,
          communication: 8,
          emotionalReadiness: 8,
        },
        explanation: "You're not interested in relationships right now",
      },
    ],
  },
  {
    id: "7",
    text: "How do you handle rejection or disappointment in dating?",
    icon: createIcon(Book, "w-6 h-6 text-green-500"),
    category: "dating",
    answers: [
      {
        text: "I take it in stride and move on",
        traits: {
          dateStyle: 3,
          communication: 3,
          emotionalReadiness: 3,
        },
        explanation:
          "You handle rejection by taking it in stride and moving on",
      },
      {
        text: "It affects me deeply for a while",
        traits: {
          dateStyle: 6,
          communication: 6,
          emotionalReadiness: 6,
        },
        explanation: "You let rejection affect you deeply for a while",
      },
      {
        text: "I rarely put myself in situations where might be rejected",
        traits: {
          dateStyle: 7,
          communication: 7,
          emotionalReadiness: 7,
        },
        explanation: "You avoid situations where you might be rejected",
      },
      {
        text: "I use it as motivation to improve myself",
        traits: {
          dateStyle: 4,
          communication: 4,
          emotionalReadiness: 4,
        },
        explanation: "You use rejection as motivation to improve yourself",
      },
    ],
  },
  {
    id: "8",
    text: "What's your idea of a perfect weekend?",
    icon: createIcon(Calendar, "w-6 h-6 text-indigo-500"),
    category: "lifestyle",
    answers: [
      {
        text: "Partying with friends",
        traits: {
          dateStyle: 4,
          communication: 4,
          emotionalReadiness: 4,
        },
        explanation: "You enjoy social gatherings and connection",
      },
      {
        text: "A quiet time at home with books or movies",
        traits: {
          dateStyle: 6,
          communication: 5,
          emotionalReadiness: 5,
        },
        explanation: "You enjoy relaxation and passive entertainment",
      },
      {
        text: "Outdoor adventures or sports",
        traits: {
          dateStyle: 3,
          communication: 3,
          emotionalReadiness: 3,
        },
        explanation: "You enjoy outdoor activities and physical exertion",
      },
      {
        text: "Working on personal goals or projects",
        traits: {
          dateStyle: 5,
          communication: 5,
          emotionalReadiness: 5,
        },
        explanation: "You enjoy working on personal goals and projects",
      },
    ],
  },
  {
    id: "9",
    text: "How do you feel about using dating apps?",
    icon: createIcon(Smartphone, "w-6 h-6 text-pink-500"),
    category: "dating",
    answers: [
      {
        text: "They're great, I use them often",
        traits: {
          dateStyle: 4,
          communication: 4,
          emotionalReadiness: 4,
        },
        explanation: "You feel positive about using dating apps",
      },
      {
        text: "I've tried them but prefer meeting people in person",
        traits: {
          dateStyle: 3,
          communication: 3,
          emotionalReadiness: 3,
        },
        explanation:
          "You prefer meeting people in person over using dating apps",
      },
      {
        text: "I'm skeptical about them",
        traits: {
          dateStyle: 6,
          communication: 6,
          emotionalReadiness: 6,
        },
        explanation: "You're skeptical about the effectiveness of dating apps",
      },
      {
        text: "I've never used them and don't plan to",
        traits: {
          dateStyle: 7,
          communication: 7,
          emotionalReadiness: 7,
        },
        explanation: "You've never used dating apps and don't plan to",
      },
    ],
  },
  {
    id: "10",
    text: "Where do you see yourself in 5 years regarding relationships?",
    icon: createIcon(Home, "w-6 h-6 text-blue-500"),
    category: "lifestyle",
    answers: [
      {
        text: "Married or in a committed long-term relationship",
        traits: {
          dateStyle: 2,
          communication: 3,
          emotionalReadiness: 3,
        },
        explanation: "You see yourself in a committed long-term relationship",
      },
      {
        text: "Focusing on my career or personal growth",
        traits: {
          career: 6,
          independence: 6,
          dateStyle: 5,
        },
        explanation: "You prioritize career and personal growth",
      },
      {
        text: "Playing the field and enjoying my freedom",
        traits: {
          dateStyle: 7,
          communication: 7,
          emotionalReadiness: 7,
        },
        explanation: "You prefer playing the field and enjoying your freedom",
      },
      {
        text: "I have no idea, and that's okay",
        traits: {
          dateStyle: 5,
          communication: 5,
          emotionalReadiness: 5,
        },
        explanation: "You have no idea and that's okay",
      },
    ],
  },
  {
    id: "11",
    text: "How do you feel about dating someone from your major/classes?",
    icon: createIcon(Book, "w-6 h-6 text-purple-500"),
    category: "dating",
    answers: [
      {
        text: "I prefer it - we have similar interests and schedules",
        traits: {
          dateStyle: 7,
          career: 8,
          communication: 6,
        },
        explanation: "You value shared academic interests and convenience",
      },
      {
        text: "I'd rather date someone from a different field",
        traits: {
          dateStyle: 6,
          independence: 7,
          career: 4,
        },
        explanation:
          "You prefer keeping your academic and romantic life separate",
      },
      {
        text: "I'm open to either, it doesn't matter",
        traits: {
          dateStyle: 5,
          emotionalReadiness: 7,
          flexibility: 8,
        },
        explanation: "You're flexible about academic backgrounds in dating",
      },
      {
        text: "I avoid dating classmates to prevent drama",
        traits: {
          dateStyle: 3,
          career: 8,
          independence: 7,
        },
        explanation:
          "You prioritize academic success over dating opportunities",
      },
    ],
  },
  {
    id: "12",
    text: "What's your biggest concern about dating in college?",
    icon: createIcon(Book, "w-6 h-6 text-red-500"),
    category: "lifestyle",
    answers: [
      {
        text: "Balancing academics with relationship time",
        traits: {
          career: 8,
          commitment: 6,
          emotionalReadiness: 5,
        },
        explanation: "You're concerned about maintaining academic performance",
      },
      {
        text: "Missing out on the full college experience",
        traits: {
          independence: 8,
          socialStyle: 7,
          commitment: 3,
        },
        explanation:
          "You value the overall college experience and social opportunities",
      },
      {
        text: "Long-term potential after graduation",
        traits: {
          commitment: 8,
          emotionalReadiness: 7,
          career: 6,
        },
        explanation: "You think long-term about relationships",
      },
      {
        text: "Finding someone with similar goals",
        traits: {
          communication: 7,
          career: 7,
          commitment: 6,
        },
        explanation: "You value alignment in future aspirations",
      },
    ],
  },
  {
    id: "13",
    text: "How do you handle dating during exam periods?",
    icon: createIcon(Book, "w-6 h-6 text-yellow-500"),
    category: "lifestyle",
    answers: [
      {
        text: "Study dates - best of both worlds",
        traits: {
          career: 7,
          dateStyle: 6,
          communication: 7,
        },
        explanation: "You find creative ways to balance academics and romance",
      },
      {
        text: "Take a break from dating to focus on studies",
        traits: {
          career: 9,
          independence: 8,
          commitment: 4,
        },
        explanation: "You prioritize academic success during crucial periods",
      },
      {
        text: "Maintain regular dates but shorter duration",
        traits: {
          commitment: 7,
          communication: 8,
          career: 6,
        },
        explanation: "You value balance and time management",
      },
      {
        text: "Let my partner know I'll be busy but stay in touch",
        traits: {
          communication: 9,
          emotionalReadiness: 7,
          commitment: 7,
        },
        explanation: "You prioritize clear communication during busy periods",
      },
    ],
  },
  {
    id: "14",
    text: "How do you feel about long-distance relationships during summer break?",
    icon: createIcon(Smartphone, "w-6 h-6 text-blue-500"),
    category: "dating",
    answers: [
      {
        text: "I'm willing to make it work",
        traits: {
          commitment: 9,
          communication: 8,
          emotionalReadiness: 7,
        },
        explanation:
          "You value commitment and are willing to put in the effort",
      },
      {
        text: "I prefer to take a break and resume in fall",
        traits: {
          independence: 8,
          flexibility: 5,
          commitment: 4,
        },
        explanation: "You prefer practical approaches to seasonal changes",
      },
      {
        text: "I'd rather date someone from my hometown",
        traits: {
          dateStyle: 7,
          independence: 6,
          flexibility: 4,
        },
        explanation: "You prefer maintaining separate school and home life",
      },
      {
        text: "Haven't thought about it - I'll deal with it later",
        traits: {
          flexibility: 7,
          emotionalReadiness: 4,
          communication: 5,
        },
        explanation: "You take a more spontaneous approach to relationships",
      },
    ],
  },
  {
    id: "15",
    text: "What's your take on dating someone from a rival college?",
    icon: createIcon(Users, "w-6 h-6 text-green-500"),
    category: "values",
    answers: [
      {
        text: "Love knows no school boundaries",
        traits: {
          flexibility: 9,
          independence: 7,
          socialStyle: 8,
        },
        explanation:
          "You're open-minded and don't let rivalries affect relationships",
      },
      {
        text: "Only if they're not too passionate about sports",
        traits: {
          flexibility: 6,
          communication: 7,
          dateStyle: 5,
        },
        explanation: "You're open but cautious about potential conflicts",
      },
      {
        text: "It would be too complicated",
        traits: {
          flexibility: 3,
          independence: 6,
          socialStyle: 4,
        },
        explanation: "You prefer avoiding potential school-related conflicts",
      },
      {
        text: "It could be a fun rivalry dynamic",
        traits: {
          flexibility: 8,
          socialStyle: 7,
          dateStyle: 6,
        },
        explanation: "You see potential fun in school rivalries",
      },
    ],
  },
];
