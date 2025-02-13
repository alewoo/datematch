import {
  Heart,
  Smartphone,
  Briefcase,
  Book,
  Users,
  Calendar,
  Home,
  MessageCircle,
  Globe,
  School,
  Camera,
  DollarSign,
  Map,
  //   Party,
  Plane,
  Lock,
  Brain,
  Trophy,
} from "lucide-react";
import { Question } from "./types";
import { ReactElement } from "react";
import { LucideIcon } from "lucide-react";

function createIcon(
  Icon: LucideIcon,
  className: string = "w-6 h-6"
): ReactElement {
  return <Icon className={className} />;
}

export const questionBank: Question[] = [
  // SOCIAL MEDIA & TECHNOLOGY (10 questions)
  {
    id: "social_1",
    text: "Your crush posts a story with someone else. What's your reaction?",
    icon: createIcon(Smartphone, "w-6 h-6 text-blue-500"),
    category: "social",
    answers: [
      {
        text: "Immediately analyze who that person might be",
        traits: { socialStyle: 8, emotionalReadiness: 4, independence: 3 },
        explanation: "You might be prone to social media overthinking",
      },
      {
        text: "Notice it but continue with your day",
        traits: { socialStyle: 6, emotionalReadiness: 7, independence: 7 },
        explanation: "You maintain healthy social media boundaries",
      },
      {
        text: "Don't check their social media regularly",
        traits: { socialStyle: 4, emotionalReadiness: 6, independence: 8 },
        explanation: "You prioritize real-world connections",
      },
      {
        text: "Feel a bit jealous but keep it to yourself",
        traits: { socialStyle: 5, emotionalReadiness: 5, independence: 5 },
        explanation: "You're working on managing social media emotions",
      },
    ],
  },
  {
    id: "social_2",
    text: "How do you handle dating app conversations?",
    icon: createIcon(MessageCircle, "w-6 h-6 text-pink-500"),
    category: "communication",
    answers: [
      {
        text: "Quick responses, keep multiple chats going",
        traits: { communication: 8, dateStyle: 8, socialStyle: 7 },
        explanation: "You're comfortable with modern dating dynamics",
      },
      {
        text: "Focus on one person at a time",
        traits: { communication: 6, dateStyle: 4, commitment: 8 },
        explanation: "You prefer focused, meaningful connections",
      },
      {
        text: "Take time to craft thoughtful messages",
        traits: { communication: 7, dateStyle: 5, emotionalReadiness: 7 },
        explanation: "You value quality communication",
      },
      {
        text: "Prefer meeting in person quickly",
        traits: { communication: 5, dateStyle: 7, socialStyle: 8 },
        explanation: "You prioritize real-world connections",
      },
    ],
  },

  // ACADEMIC/CAREER BALANCE (10 questions)
  {
    id: "career_1",
    text: "How do you balance studying and dating during finals week?",
    icon: createIcon(Book, "w-6 h-6 text-purple-500"),
    category: "career",
    answers: [
      {
        text: "Study dates - best of both worlds",
        traits: { career: 7, flexibility: 8, dateStyle: 6 },
        explanation: "You seek creative balance",
      },
      {
        text: "Put dating on hold completely",
        traits: { career: 9, independence: 8, commitment: 4 },
        explanation: "You prioritize academic success",
      },
      {
        text: "Quick coffee breaks between study sessions",
        traits: { career: 6, flexibility: 7, communication: 7 },
        explanation: "You maintain balance through time management",
      },
      {
        text: "Regular dates but shorter duration",
        traits: { career: 5, commitment: 7, flexibility: 6 },
        explanation:
          "You value maintaining connections while managing priorities",
      },
    ],
  },

  // SOCIAL LIFE & DATING (10 questions)
  {
    id: "social_3",
    text: "Your friends don't like the person you're dating. What do you do?",
    icon: createIcon(Users, "w-6 h-6 text-yellow-500"),
    category: "social",
    answers: [
      {
        text: "Trust your friends' judgment and reconsider",
        traits: { socialStyle: 8, independence: 4, emotionalReadiness: 6 },
        explanation: "You value your friends' opinions highly",
      },
      {
        text: "Keep dating but try to understand their concerns",
        traits: { socialStyle: 6, independence: 7, communication: 8 },
        explanation: "You balance different perspectives",
      },
      {
        text: "Keep the relationships separate",
        traits: { socialStyle: 4, independence: 8, flexibility: 5 },
        explanation: "You maintain clear boundaries",
      },
      {
        text: "Try to help them get to know each other better",
        traits: { socialStyle: 7, communication: 8, flexibility: 7 },
        explanation: "You're a natural mediator",
      },
    ],
  },

  // LONG-DISTANCE & TECHNOLOGY (5 questions)
  {
    id: "distance_1",
    text: "How would you handle a long-distance relationship in college?",
    icon: createIcon(Globe, "w-6 h-6 text-green-500"),
    category: "commitment",
    answers: [
      {
        text: "Daily video calls and constant texting",
        traits: { commitment: 9, communication: 8, independence: 4 },
        explanation: "You prioritize staying connected",
      },
      {
        text: "Focus on your own growth while maintaining contact",
        traits: { commitment: 6, independence: 8, emotionalReadiness: 7 },
        explanation: "You balance independence with connection",
      },
      {
        text: "Prefer not to do long-distance",
        traits: { commitment: 4, independence: 6, dateStyle: 7 },
        explanation: "You value physical presence in relationships",
      },
      {
        text: "Schedule regular visits and virtual dates",
        traits: { commitment: 7, flexibility: 8, communication: 7 },
        explanation: "You're adaptable while maintaining connection",
      },
    ],
  },

  // FINANCIAL ASPECTS (5 questions)
  {
    id: "finance_1",
    text: "How do you handle dating expenses as a student?",
    icon: createIcon(DollarSign, "w-6 h-6 text-green-500"),
    category: "lifestyle",
    answers: [
      {
        text: "Split everything 50/50",
        traits: { independence: 8, communication: 7, flexibility: 6 },
        explanation: "You value financial equality in relationships",
      },
      {
        text: "Take turns paying",
        traits: { flexibility: 8, communication: 7, dateStyle: 7 },
        explanation: "You're flexible and balanced with finances",
      },
      {
        text: "Prefer low-cost or free activities",
        traits: { dateStyle: 6, flexibility: 7, independence: 7 },
        explanation: "You're creative and practical about dating",
      },
      {
        text: "Whoever initiated the date pays",
        traits: { dateStyle: 7, communication: 6, flexibility: 7 },
        explanation: "You follow traditional dating etiquette",
      },
    ],
  },

  // PARTY/SOCIAL SCENE (5 questions)
  {
    id: "party_1",
    text: "Your crush is at the same party. What's your move?",
    icon: createIcon(Users, "w-6 h-6 text-purple-500"),
    category: "social",
    answers: [
      {
        text: "Try to naturally end up in the same conversation group",
        traits: { socialStyle: 7, communication: 6, dateStyle: 7 },
        explanation: "You're strategic but natural in social situations",
      },
      {
        text: "Wait for them to approach you",
        traits: { socialStyle: 4, independence: 7, emotionalReadiness: 5 },
        explanation: "You prefer letting things unfold naturally",
      },
      {
        text: "Ask a mutual friend to help create an interaction",
        traits: { socialStyle: 6, communication: 5, dateStyle: 6 },
        explanation: "You value social connections in dating",
      },
      {
        text: "Direct approach - go say hi",
        traits: { socialStyle: 8, communication: 8, independence: 7 },
        explanation: "You're confident in social situations",
      },
    ],
  },
  {
    id: "party_2",
    text: "How do you handle group hangouts with couples when you're single?",
    icon: createIcon(Users, "w-6 h-6 text-indigo-500"),
    category: "social",
    answers: [
      {
        text: "Feel comfortable being the single friend",
        traits: { independence: 8, socialStyle: 7, emotionalReadiness: 7 },
        explanation: "You're secure in your single status",
      },
      {
        text: "Try to bring another single friend along",
        traits: { socialStyle: 6, independence: 5, flexibility: 7 },
        explanation: "You seek balance in social situations",
      },
      {
        text: "Sometimes avoid these gatherings",
        traits: { independence: 4, socialStyle: 4, emotionalReadiness: 5 },
        explanation: "You're still adjusting to couple dynamics",
      },
      {
        text: "Use it as an opportunity to learn about relationships",
        traits: { emotionalReadiness: 8, communication: 7, dateStyle: 6 },
        explanation: "You're observant and growth-oriented",
      },
    ],
  },

  // ACADEMIC COMPATIBILITY (5 questions)
  {
    id: "academic_1",
    text: "How important is your partner's academic major to you?",
    icon: createIcon(Book, "w-6 h-6 text-blue-500"),
    category: "values",
    answers: [
      {
        text: "Very - I prefer dating within my field",
        traits: { career: 8, dateStyle: 6, commitment: 7 },
        explanation: "You value academic compatibility",
      },
      {
        text: "Don't care as long as they're passionate about something",
        traits: { flexibility: 8, independence: 7, emotionalReadiness: 7 },
        explanation: "You value passion over specific fields",
      },
      {
        text: "Prefer different majors for diverse perspectives",
        traits: { flexibility: 9, communication: 7, independence: 6 },
        explanation: "You value diverse viewpoints",
      },
      {
        text: "Only care about their academic dedication",
        traits: { career: 7, commitment: 8, dateStyle: 5 },
        explanation: "You value academic dedication",
      },
    ],
  },

  // FAMILY RELATIONSHIPS (5 questions)
  {
    id: "family_1",
    text: "How soon would you introduce someone to your family?",
    icon: createIcon(Home, "w-6 h-6 text-green-500"),
    category: "commitment",
    answers: [
      {
        text: "Only after we're officially dating",
        traits: { commitment: 7, emotionalReadiness: 6, dateStyle: 5 },
        explanation: "You take family introductions seriously",
      },
      {
        text: "When it feels right, regardless of timing",
        traits: { flexibility: 8, emotionalReadiness: 7, independence: 6 },
        explanation: "You trust your instincts",
      },
      {
        text: "Very early - family approval is important",
        traits: { commitment: 8, socialStyle: 7, dateStyle: 4 },
        explanation: "You value family involvement",
      },
      {
        text: "Prefer to keep family and dating separate initially",
        traits: { independence: 8, flexibility: 5, commitment: 4 },
        explanation: "You maintain clear boundaries",
      },
    ],
  },

  // FUTURE PLANNING (5 questions)
  {
    id: "future_1",
    text: "How do you approach post-graduation relationship decisions?",
    icon: createIcon(Map, "w-6 h-6 text-yellow-500"),
    category: "career",
    answers: [
      {
        text: "Career first, relationship second",
        traits: { career: 9, independence: 8, commitment: 4 },
        explanation: "You prioritize career development",
      },
      {
        text: "Try to find a balance between both",
        traits: { flexibility: 8, communication: 7, commitment: 7 },
        explanation: "You seek work-life balance",
      },
      {
        text: "Would consider long-distance for the right person",
        traits: { commitment: 9, emotionalReadiness: 8, communication: 7 },
        explanation: "You're willing to make sacrifices for love",
      },
      {
        text: "Haven't thought that far ahead",
        traits: { flexibility: 6, independence: 7, emotionalReadiness: 4 },
        explanation: "You live in the present",
      },
    ],
  },

  // LIFESTYLE & HABITS (5 questions)
  {
    id: "lifestyle_1",
    text: "How do you prefer to spend weekends when dating?",
    icon: createIcon(Calendar, "w-6 h-6 text-orange-500"),
    category: "lifestyle",
    answers: [
      {
        text: "Mix of social events and quiet time together",
        traits: { flexibility: 8, socialStyle: 6, dateStyle: 7 },
        explanation: "You value balanced social life",
      },
      {
        text: "Mostly adventurous activities and trying new things",
        traits: { dateStyle: 8, socialStyle: 7, independence: 6 },
        explanation: "You're adventure-seeking",
      },
      {
        text: "Prefer relaxed, low-key hangouts",
        traits: { dateStyle: 5, socialStyle: 4, emotionalReadiness: 7 },
        explanation: "You value quality quiet time",
      },
      {
        text: "Independent activities with some together time",
        traits: { independence: 8, flexibility: 7, commitment: 5 },
        explanation: "You maintain independence while dating",
      },
    ],
  },

  // COMMUNICATION STYLES (5 questions)
  {
    id: "comm_1",
    text: "How do you handle disagreements in a relationship?",
    icon: createIcon(MessageCircle, "w-6 h-6 text-pink-500"),
    category: "communication",
    answers: [
      {
        text: "Address issues immediately and directly",
        traits: { communication: 9, emotionalReadiness: 8, dateStyle: 6 },
        explanation: "You value direct communication",
      },
      {
        text: "Take time to process before discussing",
        traits: { communication: 7, emotionalReadiness: 7, independence: 6 },
        explanation: "You're thoughtful in communication",
      },
      {
        text: "Try to avoid conflict",
        traits: { communication: 4, emotionalReadiness: 4, flexibility: 5 },
        explanation: "You might benefit from more direct communication",
      },
      {
        text: "Seek advice from friends first",
        traits: { socialStyle: 7, communication: 5, independence: 4 },
        explanation: "You value outside perspectives",
      },
    ],
  },

  // SOCIAL MEDIA BOUNDARIES (5 questions)
  {
    id: "social_media_1",
    text: "Your partner hasn't posted about your relationship. How do you feel?",
    icon: createIcon(Camera, "w-6 h-6 text-pink-500"),
    category: "social",
    answers: [
      {
        text: "Doesn't bother me - prefer keeping things private",
        traits: { independence: 8, emotionalReadiness: 7, socialStyle: 4 },
        explanation: "You value privacy in relationships",
      },
      {
        text: "Would like some acknowledgment of the relationship",
        traits: { socialStyle: 7, communication: 6, commitment: 7 },
        explanation: "You value public recognition of relationships",
      },
      {
        text: "Feel insecure about what it means",
        traits: { independence: 4, emotionalReadiness: 5, communication: 6 },
        explanation: "You might tie social media to relationship validation",
      },
      {
        text: "Have an open discussion about social media expectations",
        traits: { communication: 8, emotionalReadiness: 8, flexibility: 7 },
        explanation: "You value clear communication about boundaries",
      },
    ],
  },

  // FRIENDSHIP & DATING BOUNDARIES
  {
    id: "friendship_1",
    text: "Your best friend starts dating your ex. Your reaction?",
    icon: createIcon(Heart, "w-6 h-6 text-red-500"),
    category: "values",
    answers: [
      {
        text: "Support them if they're both happy",
        traits: { emotionalReadiness: 9, flexibility: 8, independence: 7 },
        explanation: "You're mature and secure in relationships",
      },
      {
        text: "Need time to process but eventually accept it",
        traits: { emotionalReadiness: 7, communication: 6, flexibility: 6 },
        explanation: "You balance emotions with rationality",
      },
      {
        text: "Feel betrayed and distance yourself",
        traits: { emotionalReadiness: 4, independence: 5, flexibility: 4 },
        explanation: "You have strong feelings about loyalty",
      },
      {
        text: "Set clear boundaries for group situations",
        traits: { communication: 8, independence: 7, flexibility: 7 },
        explanation: "You're practical about managing complex dynamics",
      },
    ],
  },

  // TECHNOLOGY & MODERN DATING
  {
    id: "tech_1",
    text: "You notice your partner's dating app is still active. What's your approach?",
    icon: createIcon(Smartphone, "w-6 h-6 text-blue-500"),
    category: "communication",
    answers: [
      {
        text: "Have an immediate conversation about exclusivity",
        traits: { communication: 9, commitment: 8, emotionalReadiness: 7 },
        explanation: "You value clear relationship definitions",
      },
      {
        text: "Wait to see if they bring it up first",
        traits: { independence: 6, flexibility: 5, communication: 4 },
        explanation: "You might benefit from more direct communication",
      },
      {
        text: "Assume we're not exclusive yet",
        traits: { independence: 8, dateStyle: 7, emotionalReadiness: 6 },
        explanation: "You have modern views on dating progression",
      },
      {
        text: "Keep yours active too until we discuss exclusivity",
        traits: { independence: 7, dateStyle: 8, communication: 5 },
        explanation: "You maintain equal relationship dynamics",
      },
    ],
  },

  // CULTURAL & VALUES
  {
    id: "culture_2",
    text: "How do you handle different cultural backgrounds in dating?",
    icon: createIcon(Globe, "w-6 h-6 text-green-500"),
    category: "values",
    answers: [
      {
        text: "Excited to learn and share different traditions",
        traits: { flexibility: 9, communication: 8, emotionalReadiness: 7 },
        explanation: "You're open-minded and culturally curious",
      },
      {
        text: "Prefer dating within my own culture",
        traits: { dateStyle: 4, flexibility: 4, commitment: 7 },
        explanation: "You value cultural familiarity",
      },
      {
        text: "Open to it but concerned about family reactions",
        traits: { flexibility: 6, communication: 7, independence: 5 },
        explanation: "You balance openness with practical concerns",
      },
      {
        text: "Focus on shared values regardless of background",
        traits: { emotionalReadiness: 8, flexibility: 7, independence: 6 },
        explanation: "You prioritize core compatibility",
      },
    ],
  },

  // CAREER AMBITIONS
  {
    id: "career_3",
    text: "Your dream job opportunity requires moving away. How does this affect your dating life?",
    icon: createIcon(Briefcase, "w-6 h-6 text-purple-500"),
    category: "career",
    answers: [
      {
        text: "Take the job - right person will understand",
        traits: { career: 9, independence: 8, commitment: 5 },
        explanation: "You prioritize career growth",
      },
      {
        text: "Try to find a compromise that works for both",
        traits: { flexibility: 8, communication: 8, commitment: 7 },
        explanation: "You seek balance in life decisions",
      },
      {
        text: "Consider your partner's career goals too",
        traits: { commitment: 8, communication: 7, flexibility: 7 },
        explanation: "You value partnership in decisions",
      },
      {
        text: "Decline if it means ending a good relationship",
        traits: { commitment: 9, career: 5, emotionalReadiness: 7 },
        explanation: "You prioritize relationship stability",
      },
    ],
  },

  // DIGITAL AGE DATING
  {
    id: "digital_1",
    text: "How do you feel about sharing phone passwords in a relationship?",
    icon: createIcon(Lock, "w-6 h-6 text-gray-500"),
    category: "trust",
    answers: [
      {
        text: "Never - privacy is important",
        traits: { independence: 9, communication: 6, commitment: 4 },
        explanation: "You value personal boundaries",
      },
      {
        text: "Only after becoming very serious",
        traits: { commitment: 7, communication: 7, independence: 6 },
        explanation: "You balance trust with privacy",
      },
      {
        text: "Yes - nothing to hide",
        traits: { commitment: 8, independence: 4, communication: 7 },
        explanation: "You value complete openness",
      },
      {
        text: "Depends on the circumstances",
        traits: { flexibility: 8, communication: 7, independence: 6 },
        explanation: "You're adaptable based on context",
      },
    ],
  },

  // MENTAL HEALTH & RELATIONSHIPS (5 questions)
  {
    id: "mental_1",
    text: "How do you handle stress in your relationship during midterms?",
    icon: createIcon(Brain, "w-6 h-6 text-purple-500"),
    category: "lifestyle",
    answers: [
      {
        text: "Open up about feeling overwhelmed",
        traits: { communication: 8, emotionalReadiness: 8, flexibility: 7 },
        explanation: "You value emotional transparency",
      },
      {
        text: "Keep relationship and academic stress separate",
        traits: { independence: 8, career: 7, emotionalReadiness: 6 },
        explanation:
          "You maintain clear boundaries between different life areas",
      },
      {
        text: "Take a brief relationship pause",
        traits: { career: 8, independence: 7, commitment: 4 },
        explanation: "You prioritize academic success during crucial periods",
      },
      {
        text: "Use each other for mutual support",
        traits: { communication: 7, emotionalReadiness: 8, commitment: 7 },
        explanation: "You value partnership during challenging times",
      },
    ],
  },

  // SOCIAL ACTIVITIES (5 questions)
  {
    id: "social_5",
    text: "Your partner gets invited to a party where you don't know anyone. You...",
    icon: createIcon(Brain, "w-6 h-6 text-pink-500"),
    category: "social",
    answers: [
      {
        text: "Go and try to make new friends",
        traits: { socialStyle: 8, flexibility: 7, independence: 6 },
        explanation: "You're socially adaptable and confident",
      },
      {
        text: "Ask them to skip it and hang out with you instead",
        traits: { socialStyle: 4, independence: 4, commitment: 7 },
        explanation: "You might need to work on social independence",
      },
      {
        text: "Go but stick close to your partner",
        traits: { socialStyle: 6, flexibility: 5, independence: 5 },
        explanation: "You're working on social confidence",
      },
      {
        text: "Encourage them to go without you",
        traits: { independence: 8, emotionalReadiness: 7, flexibility: 8 },
        explanation: "You value independence in relationships",
      },
    ],
  },

  // CULTURAL VALUES (5 questions)
  {
    id: "culture_1",
    text: "How important is it that your partner shares your cultural background?",
    icon: createIcon(Globe, "w-6 h-6 text-blue-500"),
    category: "values",
    answers: [
      {
        text: "Very important - it's easier to relate",
        traits: { flexibility: 4, dateStyle: 6, commitment: 7 },
        explanation: "You value cultural compatibility",
      },
      {
        text: "Open to learning about different cultures",
        traits: { flexibility: 8, communication: 7, emotionalReadiness: 7 },
        explanation: "You're culturally open-minded",
      },
      {
        text: "Doesn't matter if we connect well",
        traits: { flexibility: 9, independence: 7, emotionalReadiness: 8 },
        explanation:
          "You prioritize personal connection over cultural background",
      },
      {
        text: "Prefer similar but not a dealbreaker",
        traits: { flexibility: 6, communication: 7, dateStyle: 6 },
        explanation: "You balance cultural preferences with flexibility",
      },
    ],
  },

  // FRIEND GROUP DYNAMICS (5 questions)
  {
    id: "friends_1",
    text: "How do you handle conflicts between your friend group and your partner?",
    icon: createIcon(Users, "w-6 h-6 text-orange-500"),
    category: "social",
    answers: [
      {
        text: "Always side with friends",
        traits: { socialStyle: 8, commitment: 4, independence: 5 },
        explanation: "You prioritize longtime friendships",
      },
      {
        text: "Try to understand both perspectives",
        traits: { communication: 8, flexibility: 7, emotionalReadiness: 8 },
        explanation: "You're a natural mediator",
      },
      {
        text: "Keep them separate to avoid drama",
        traits: { independence: 7, flexibility: 5, socialStyle: 4 },
        explanation: "You prefer maintaining separate social spheres",
      },
      {
        text: "Work actively to resolve the tension",
        traits: { communication: 9, socialStyle: 7, emotionalReadiness: 8 },
        explanation: "You actively work to maintain harmony",
      },
    ],
  },

  // CAMPUS LIFE (8 questions)
  {
    id: "campus_1",
    text: "You see your crush in the library. What's your move?",
    icon: createIcon(Book, "w-6 h-6 text-indigo-500"),
    category: "social",
    answers: [
      {
        text: "Casually sit at their table",
        traits: { socialStyle: 8, dateStyle: 7, communication: 6 },
        explanation: "You're confident in social situations",
      },
      {
        text: "Study nearby and hope they notice you",
        traits: { socialStyle: 5, dateStyle: 4, independence: 6 },
        explanation: "You prefer subtle approaches",
      },
      {
        text: "Ask them about the class/assignment",
        traits: { communication: 7, dateStyle: 6, socialStyle: 7 },
        explanation: "You create natural conversation opportunities",
      },
      {
        text: "Focus on your own studying",
        traits: { career: 8, independence: 7, emotionalReadiness: 6 },
        explanation: "You prioritize academics over dating",
      },
    ],
  },
  {
    id: "campus_2",
    text: "How do you handle running into an ex on campus?",
    icon: createIcon(School, "w-6 h-6 text-red-500"),
    category: "social",
    answers: [
      {
        text: "Friendly hello and brief chat",
        traits: { emotionalReadiness: 8, communication: 7, socialStyle: 7 },
        explanation: "You handle awkward situations maturely",
      },
      {
        text: "Avoid them completely",
        traits: { emotionalReadiness: 4, independence: 6, socialStyle: 4 },
        explanation: "You prefer avoiding uncomfortable situations",
      },
      {
        text: "Act like you didn't see them",
        traits: { emotionalReadiness: 5, communication: 4, socialStyle: 5 },
        explanation: "You're still processing past relationships",
      },
      {
        text: "Use it as a chance to catch up",
        traits: { emotionalReadiness: 9, communication: 8, flexibility: 7 },
        explanation: "You're very emotionally mature",
      },
    ],
  },

  // SEASONAL & HOLIDAYS (7 questions)
  {
    id: "seasonal_1",
    text: "Valentine's Day is coming up and you're single. Your plan?",
    icon: createIcon(Heart, "w-6 h-6 text-pink-500"),
    category: "lifestyle",
    answers: [
      {
        text: "Singles party with friends",
        traits: { socialStyle: 8, independence: 7, emotionalReadiness: 7 },
        explanation: "You celebrate all forms of love and connection",
      },
      {
        text: "Treat it like any other day",
        traits: { independence: 8, emotionalReadiness: 7, flexibility: 6 },
        explanation: "You don't let social pressure affect you",
      },
      {
        text: "Self-care and pampering day",
        traits: { independence: 7, emotionalReadiness: 8, dateStyle: 6 },
        explanation: "You prioritize self-love",
      },
      {
        text: "Try to find a last-minute date",
        traits: { socialStyle: 7, dateStyle: 8, independence: 4 },
        explanation: "You're motivated by social occasions",
      },
    ],
  },

  // LIVING SITUATIONS (6 questions)
  {
    id: "living_1",
    text: "Your roommate's significant other is always at your place. You...",
    icon: createIcon(Home, "w-6 h-6 text-orange-500"),
    category: "lifestyle",
    answers: [
      {
        text: "Have an honest conversation about boundaries",
        traits: { communication: 9, independence: 7, flexibility: 6 },
        explanation: "You address issues directly",
      },
      {
        text: "Spend more time elsewhere",
        traits: { flexibility: 7, independence: 6, communication: 4 },
        explanation: "You adapt to avoid conflict",
      },
      {
        text: "Join them and make it social",
        traits: { socialStyle: 8, flexibility: 7, communication: 6 },
        explanation: "You make the best of situations",
      },
      {
        text: "Passive-aggressive hints",
        traits: { communication: 4, independence: 5, flexibility: 4 },
        explanation: "You struggle with direct confrontation",
      },
    ],
  },

  // DIGITAL AGE DATING (5 questions)
  {
    id: "digital_2",
    text: "You matched with someone on a dating app who goes to your school. Next step?",
    icon: createIcon(Smartphone, "w-6 h-6 text-blue-500"),
    category: "communication",
    answers: [
      {
        text: "Suggest meeting on campus right away",
        traits: { dateStyle: 8, socialStyle: 7, communication: 6 },
        explanation: "You prefer real-world connections",
      },
      {
        text: "Chat more to ensure compatibility",
        traits: { communication: 7, emotionalReadiness: 7, dateStyle: 5 },
        explanation: "You value getting to know someone first",
      },
      {
        text: "Ask mutual friends about them",
        traits: { socialStyle: 7, communication: 5, dateStyle: 6 },
        explanation: "You value social verification",
      },
      {
        text: "Wait for them to make the first move",
        traits: { dateStyle: 4, independence: 6, socialStyle: 5 },
        explanation: "You prefer others to take initiative",
      },
    ],
  },

  // GREEK LIFE & DATING (5 questions)
  {
    id: "greek_1",
    text: "How do you feel about dating within your fraternity/sorority circle?",
    icon: createIcon(Users, "w-6 h-6 text-blue-500"),
    category: "social",
    answers: [
      {
        text: "Prefer to avoid drama and date outside",
        traits: { independence: 8, socialStyle: 6, dateStyle: 7 },
        explanation: "You value separation between social circles",
      },
      {
        text: "Love the shared community aspect",
        traits: { socialStyle: 8, commitment: 7, dateStyle: 6 },
        explanation: "You value shared social connections",
      },
      {
        text: "Take it case by case",
        traits: { flexibility: 8, emotionalReadiness: 7, communication: 7 },
        explanation: "You're open-minded but cautious",
      },
      {
        text: "Only for casual dating",
        traits: { dateStyle: 8, independence: 7, commitment: 4 },
        explanation: "You separate casual dating from serious relationships",
      },
    ],
  },

  // SPORTS & ATHLETICS (5 questions)
  {
    id: "sports_1",
    text: "Your date invites you to watch their intramural game. You...",
    icon: createIcon(Trophy, "w-6 h-6 text-yellow-500"),
    category: "lifestyle",
    answers: [
      {
        text: "Go and cheer enthusiastically",
        traits: { commitment: 8, socialStyle: 7, emotionalReadiness: 7 },
        explanation: "You're supportive of partner's interests",
      },
      {
        text: "Go but bring friends for company",
        traits: { socialStyle: 7, independence: 6, flexibility: 7 },
        explanation: "You balance support with social comfort",
      },
      {
        text: "Make an excuse - not your scene",
        traits: { independence: 7, communication: 4, flexibility: 4 },
        explanation: "You're honest about your preferences",
      },
      {
        text: "Go but use the time to study",
        traits: { career: 8, flexibility: 6, commitment: 5 },
        explanation: "You multitask commitments",
      },
    ],
  },

  // STUDY ABROAD (5 questions)
  {
    id: "abroad_1",
    text: "Your partner wants to study abroad for a semester. Your reaction?",
    icon: createIcon(Plane, "w-6 h-6 text-purple-500"),
    category: "commitment",
    answers: [
      {
        text: "Fully support and plan virtual dates",
        traits: { commitment: 8, communication: 8, flexibility: 7 },
        explanation: "You're supportive of growth opportunities",
      },
      {
        text: "Suggest taking a break during that time",
        traits: { independence: 7, emotionalReadiness: 6, commitment: 4 },
        explanation: "You're practical about long-distance challenges",
      },
      {
        text: "Try to study abroad together",
        traits: { commitment: 9, socialStyle: 7, flexibility: 6 },
        explanation: "You seek shared experiences",
      },
      {
        text: "Worry about the relationship surviving",
        traits: { emotionalReadiness: 4, independence: 4, communication: 5 },
        explanation: "You struggle with uncertainty",
      },
    ],
  },

  // CAREER NETWORKING (5 questions)
  {
    id: "career_4",
    text: "You meet someone interesting at a career fair. Would you...",
    icon: createIcon(Briefcase, "w-6 h-6 text-green-500"),
    category: "career",
    answers: [
      {
        text: "Keep it strictly professional",
        traits: { career: 9, independence: 7, dateStyle: 4 },
        explanation: "You separate professional and personal life",
      },
      {
        text: "Be open to both networking and dating",
        traits: { flexibility: 8, dateStyle: 7, career: 6 },
        explanation: "You're open to opportunities in all forms",
      },
      {
        text: "Focus on career opportunity first",
        traits: { career: 8, emotionalReadiness: 6, dateStyle: 5 },
        explanation: "You prioritize professional growth",
      },
      {
        text: "Subtly gauge their interest in dating",
        traits: { dateStyle: 8, communication: 6, career: 5 },
        explanation: "You balance professional and personal interests",
      },
    ],
  },

  // CLUB ACTIVITIES (5 questions)
  {
    id: "club_1",
    text: "How do you approach dating within your student organizations?",
    icon: createIcon(Users, "w-6 h-6 text-indigo-500"),
    category: "social",
    answers: [
      {
        text: "Keep club activities and dating separate",
        traits: { independence: 8, career: 7, socialStyle: 6 },
        explanation: "You maintain clear boundaries",
      },
      {
        text: "Great way to meet like-minded people",
        traits: { socialStyle: 8, dateStyle: 7, communication: 7 },
        explanation: "You value shared interests",
      },
      {
        text: "Only if it won't affect club dynamics",
        traits: { emotionalReadiness: 8, communication: 7, flexibility: 7 },
        explanation: "You're thoughtful about group dynamics",
      },
      {
        text: "Focus on leadership/achievement instead",
        traits: { career: 9, independence: 7, dateStyle: 4 },
        explanation: "You prioritize personal development",
      },
    ],
  },

  // ROOMMATE DYNAMICS (4 questions)
  {
    id: "roommate_1",
    text: "Your roommate doesn't like your dating habits. How do you handle it?",
    icon: createIcon(Home, "w-6 h-6 text-purple-500"),
    category: "lifestyle",
    answers: [
      {
        text: "Have an open discussion about boundaries",
        traits: { communication: 8, flexibility: 7, independence: 6 },
        explanation: "You value open communication and compromise",
      },
      {
        text: "Keep your dating life separate from home",
        traits: { independence: 8, flexibility: 6, socialStyle: 5 },
        explanation: "You maintain clear life boundaries",
      },
      {
        text: "Ignore their opinion - it's your life",
        traits: { independence: 9, communication: 4, flexibility: 3 },
        explanation: "You strongly value personal autonomy",
      },
      {
        text: "Try to accommodate their concerns",
        traits: { flexibility: 8, communication: 7, independence: 5 },
        explanation: "You prioritize household harmony",
      },
    ],
  },

  // ACADEMIC COMPETITION (3 questions)
  {
    id: "academic_2",
    text: "You're competing with your crush for the same internship. Your approach?",
    icon: createIcon(Briefcase, "w-6 h-6 text-blue-500"),
    category: "career",
    answers: [
      {
        text: "Focus on winning - romance can wait",
        traits: { career: 9, independence: 8, dateStyle: 4 },
        explanation: "You prioritize professional success",
      },
      {
        text: "Try to help each other prepare",
        traits: { communication: 8, flexibility: 7, career: 6 },
        explanation: "You value collaboration over competition",
      },
      {
        text: "Look for different opportunities",
        traits: { flexibility: 8, independence: 7, career: 6 },
        explanation: "You avoid potential conflicts",
      },
      {
        text: "Use it as a chance to get closer",
        traits: { dateStyle: 8, socialStyle: 7, career: 5 },
        explanation: "You see opportunities in challenges",
      },
    ],
  },

  // CAMPUS EVENTS (4 questions)
  {
    id: "event_1",
    text: "There's a campus formal coming up. Your dating status is complicated. You...",
    icon: createIcon(Calendar, "w-6 h-6 text-pink-500"),
    category: "social",
    answers: [
      {
        text: "Go with friends instead of a date",
        traits: { independence: 8, socialStyle: 7, dateStyle: 5 },
        explanation: "You value friendship and independence",
      },
      {
        text: "Use it as a chance to define the relationship",
        traits: { communication: 8, commitment: 7, dateStyle: 7 },
        explanation: "You take initiative in relationships",
      },
      {
        text: "Skip it to avoid awkwardness",
        traits: { socialStyle: 4, communication: 4, emotionalReadiness: 5 },
        explanation: "You avoid potentially uncomfortable situations",
      },
      {
        text: "Ask someone else as friends",
        traits: { socialStyle: 7, flexibility: 8, dateStyle: 6 },
        explanation: "You're adaptable in social situations",
      },
    ],
  },

  // HOLIDAY TRADITIONS (3 questions)
  {
    id: "holiday_1",
    text: "Spring break is coming up. Your new relationship is tested by...",
    icon: createIcon(Plane, "w-6 h-6 text-orange-500"),
    category: "lifestyle",
    answers: [
      {
        text: "Different travel plans with friends",
        traits: { independence: 8, commitment: 5, socialStyle: 7 },
        explanation: "You maintain independence in relationships",
      },
      {
        text: "Trying to coordinate trips together",
        traits: { commitment: 8, communication: 7, flexibility: 6 },
        explanation: "You value shared experiences",
      },
      {
        text: "Staying on campus to save money",
        traits: { independence: 7, dateStyle: 5, career: 7 },
        explanation: "You make practical decisions",
      },
      {
        text: "Long-distance for a week",
        traits: { commitment: 7, communication: 8, independence: 6 },
        explanation: "You're confident in relationship stability",
      },
    ],
  },

  // SOCIAL MEDIA ETIQUETTE (3 questions)
  {
    id: "social_media_2",
    text: "Your partner tags you in an unflattering photo. You...",
    icon: createIcon(Camera, "w-6 h-6 text-red-500"),
    category: "communication",
    answers: [
      {
        text: "Privately ask them to remove it",
        traits: { communication: 8, independence: 6, socialStyle: 5 },
        explanation: "You handle issues directly but privately",
      },
      {
        text: "Laugh it off and leave it up",
        traits: { flexibility: 8, emotionalReadiness: 7, socialStyle: 7 },
        explanation: "You don't take yourself too seriously",
      },
      {
        text: "Untag yourself immediately",
        traits: { independence: 7, communication: 4, socialStyle: 5 },
        explanation: "You're protective of your image",
      },
      {
        text: "Post an unflattering one of them",
        traits: { communication: 4, emotionalReadiness: 4, flexibility: 4 },
        explanation: "You might benefit from more mature communication",
      },
    ],
  },

  // Would you like me to continue with more questions to reach 50+? I can add:
  // - FINANCIAL PLANNING
  // - FRIEND GROUP DYNAMICS
  // - CAMPUS ACTIVITIES
  // - RELATIONSHIP MILESTONES
  // And more...
];

// Enhanced random question selection to ensure better trait coverage
export function getRandomQuestions(count: number): Question[] {
  const shuffled = [...questionBank].sort(() => 0.5 - Math.random());

  // Define core categories we want to ensure are covered
  const coreCategories = [
    "social",
    "career",
    "communication",
    "commitment",
    "lifestyle",
  ];
  const selected: Question[] = [];

  // First, ensure we have at least one question from each core category
  coreCategories.forEach((category) => {
    const questionFromCategory = shuffled.find(
      (q) => q.category === category && !selected.includes(q)
    );
    if (questionFromCategory) {
      selected.push(questionFromCategory);
    }
  });

  // Then add questions that ensure coverage of all traits
  const traits = [
    "socialStyle",
    "emotionalReadiness",
    "dateStyle",
    "commitment",
    "communication",
    "independence",
    "career",
    "flexibility",
  ];

  traits.forEach((trait) => {
    if (selected.length < count) {
      const questionForTrait = shuffled.find(
        (q) =>
          !selected.includes(q) &&
          Object.keys(q.answers[0].traits).includes(trait)
      );
      if (questionForTrait) {
        selected.push(questionForTrait);
      }
    }
  });

  // Fill remaining slots with random questions
  while (selected.length < count) {
    const nextQuestion = shuffled.find((q) => !selected.includes(q));
    if (nextQuestion) {
      selected.push(nextQuestion);
    } else {
      break;
    }
  }

  return selected;
}
