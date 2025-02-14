# DateMatch

![DateMatch Preview](public/og.png)

DateMatch is a personality-driven dating platform designed specifically for university students. By analyzing personality traits and compatibility factors, we help students find meaningful connections based on who they truly are.

## 🌟 Features

- **Personality Analysis**: In-depth assessment of 8 key relationship traits
- **Visual Insights**: Beautiful radar charts showing personality dimensions
- **Shareable Results**: Easy-to-share personality cards for social media
- **Smart Matching**: Compatibility suggestions based on personality traits
- **Modern UI/UX**: Responsive design with smooth animations

## 🚀 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Charts**: Recharts
- **UI Components**: Radix UI
- **Icons**: Lucide Icons
- **Database**: Supabase
- **Deployment**: Vercel

## 🛠️ Development

### Prerequisites

- Node.js 18+ 
- npm or pnpm
- Supabase account for database

### Getting Started

1. Clone the repository
```
git clone https://github.com/yourusername/datematch.git
cd datematch
```

2. Install dependencies
```
npm install
```

3. Set up environment variables
Create a `.env.local` file in the root directory:
```
env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Generate favicons and icons
```
npm run generate-favicon
```

5. Start the development server
```
npm run dev
```

The app will be available at `http://localhost:3000`

### Project Structure
```
datematch/
├── app/ # Next.js app directory
│ ├── api/ # API routes
│ ├── components/ # Shared components
│ ├── data/ # Data models and types
│ └── [routes]/ # App routes
├── public/ # Static assets
├── scripts/ # Build scripts
└── components/ # UI components
```


## 🎨 Design System

- **Colors**: Pink (#ec4899) to Purple (#8b5cf6) gradient theme
- **Typography**: Inter font family
- **Components**: Custom UI components built with Radix UI
- **Animations**: Page transitions and micro-interactions

## 🔗 Links

- Website: [datematch.lol](https://datematch.lol)
- Creator: [@imalexwang](https://twitter.com/imalexwang)

---

Built with ❤️ for university students
