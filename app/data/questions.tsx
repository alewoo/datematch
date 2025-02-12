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

export interface Question {
  id: number;
  text: string;
  answers: Answer[];
  icon: ReactElement;
  category: "dating" | "social" | "lifestyle" | "career";
}

export interface Answer {
  text: string;
  score: number;
}

function createIcon(
  Icon: LucideIcon,
  className: string = "w-6 h-6"
): ReactElement {
  return <Icon className={className} />;
}

export const questions: Question[] = [
  {
    id: 1,
    text: "How do you typically meet potential romantic interests?",
    icon: createIcon(Users, "w-6 h-6 text-pink-500"),
    category: "social",
    answers: [
      {
        text: "Through mutual friends or social events",
        score: 80,
      },
      {
        text: "Dating apps are my go-to",
        score: 60,
      },
      {
        text: "I don't actively seek out romantic interests",
        score: 20,
      },
      {
        text: "In class or at work",
        score: 70,
      },
    ],
  },
  {
    id: 2,
    text: "What's your ideal first date?",
    icon: createIcon(Coffee, "w-6 h-6 text-brown-500"),
    category: "dating",
    answers: [
      {
        text: "Coffee and a walk in the park",
        score: 30,
      },
      {
        text: "Netflix and chill",
        score: 60,
      },
      {
        text: "An exciting activity like rock climbing or escape room",
        score: 20,
      },
      {
        text: "Dinner at a trendy restaurant",
        score: 40,
      },
    ],
  },
  {
    id: 3,
    text: "How do you handle your crush's social media activity?",
    icon: createIcon(Smartphone, "w-6 h-6 text-blue-500"),
    category: "social",
    answers: [
      {
        text: "I don't pay much attention to it",
        score: 30,
      },
      {
        text: "I analyze every post and story",
        score: 70,
      },
      {
        text: "I casually like their posts sometimes",
        score: 40,
      },
      {
        text: "I don't use social media much",
        score: 50,
      },
    ],
  },
  {
    id: 4,
    text: "What's your approach to balancing romance and career/education?",
    icon: createIcon(Briefcase, "w-6 h-6 text-gray-600"),
    category: "career",
    answers: [
      {
        text: "Career/education comes first, always",
        score: 70,
      },
      {
        text: "I strive for a healthy balance",
        score: 30,
      },
      {
        text: "Romance is my priority",
        score: 50,
      },
      {
        text: "I struggle to manage both",
        score: 60,
      },
    ],
  },
  {
    id: 5,
    text: "How do you spend most of your free time?",
    icon: createIcon(Headphones, "w-6 h-6 text-purple-500"),
    category: "lifestyle",
    answers: [
      {
        text: "Hanging out with friends",
        score: 30,
      },
      {
        text: "Pursuing hobbies or personal projects",
        score: 40,
      },
      {
        text: "Binge-watching shows or gaming",
        score: 60,
      },
      {
        text: "Studying or working on side hustles",
        score: 50,
      },
    ],
  },
  {
    id: 6,
    text: "How do you feel about long-term relationships?",
    icon: createIcon(Heart, "w-6 h-6 text-red-500"),
    category: "dating",
    answers: [
      {
        text: "I'm actively looking for one",
        score: 20,
      },
      {
        text: "I'm open to it, but not in a rush",
        score: 40,
      },
      {
        text: "I prefer casual dating",
        score: 60,
      },
      {
        text: "I'm not interested in relationships right now",
        score: 80,
      },
    ],
  },
  {
    id: 7,
    text: "How do you handle rejection or disappointment in dating?",
    icon: createIcon(Book, "w-6 h-6 text-green-500"),
    category: "dating",
    answers: [
      {
        text: "I take it in stride and move on",
        score: 30,
      },
      {
        text: "It affects me deeply for a while",
        score: 60,
      },
      {
        text: "I rarely put myself in situations where might be rejected",
        score: 70,
      },
      {
        text: "I use it as motivation to improve myself",
        score: 40,
      },
    ],
  },
  {
    id: 8,
    text: "What's your idea of a perfect weekend?",
    icon: createIcon(Calendar, "w-6 h-6 text-indigo-500"),
    category: "lifestyle",
    answers: [
      {
        text: "Partying with friends",
        score: 40,
      },
      {
        text: "A quiet time at home with books or movies",
        score: 60,
      },
      {
        text: "Outdoor adventures or sports",
        score: 30,
      },
      {
        text: "Working on personal goals or projects",
        score: 50,
      },
    ],
  },
  {
    id: 9,
    text: "How do you feel about using dating apps?",
    icon: createIcon(Smartphone, "w-6 h-6 text-pink-500"),
    category: "dating",
    answers: [
      {
        text: "They're great, I use them often",
        score: 40,
      },
      {
        text: "I've tried them but prefer meeting people in person",
        score: 30,
      },
      {
        text: "I'm skeptical about them",
        score: 60,
      },
      {
        text: "I've never used them and don't plan to",
        score: 70,
      },
    ],
  },
  {
    id: 10,
    text: "Where do you see yourself in 5 years regarding relationships?",
    icon: createIcon(Home, "w-6 h-6 text-blue-500"),
    category: "lifestyle",
    answers: [
      {
        text: "Married or in a committed long-term relationship",
        score: 20,
      },
      {
        text: "Focusing on my career or personal growth",
        score: 60,
      },
      {
        text: "Playing the field and enjoying my freedom",
        score: 70,
      },
      {
        text: "I have no idea, and that's okay",
        score: 50,
      },
    ],
  },
];
