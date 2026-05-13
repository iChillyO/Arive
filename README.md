# Stack by Aivre

A next-generation AI desktop operating environment. Multi-agent workspace with real-time previews, voice conversations, unified workflows, and a beautiful customizable interface.

## Tech Stack

- **Framework:** Next.js 14 + TypeScript
- **UI:** TailwindCSS, Framer Motion, Radix UI, shadcn/ui
- **State:** Zustand (persisted)
- **AI:** Vercel AI SDK with multi-provider support (OpenAI, Anthropic, Google)
- **Auth:** NextAuth.js v5 (Google OAuth, Credentials)
- **Database:** Prisma + PostgreSQL
- **Desktop:** Electron/Tauri ready architecture

## Features

### Landing Page
- Cinematic animated hero with parallax effects
- 11 sections showcasing all platform capabilities
- Liquid glass design system with frosted panels

### Workspace
- macOS-inspired desktop environment
- Collapsible sidebar with agent navigation
- Browser-like tab system with persistent sessions
- Dock with spring animations
- Wallpaper-aware adaptive UI

### AI Agents
- Streaming chat with model selection (GPT-4o, Claude, Gemini)
- Real-time message streaming via Vercel AI SDK
- Copy, regenerate, stop generation
- File attachment and voice mode buttons

### Widgets
- Clock (12h/24h toggle)
- Timer (circular progress, custom input)
- Notes (add/remove/list)
- Image (upload/display)
- Spotify (OAuth scaffold, playback controls)
- Add/remove/resize widget grid

### Voice Mode
- Floating persistent call widget
- Minimized compact pill mode
- Mute/speaker/end controls
- Voice model selection
- Real-time waveform visualization

### Settings
- Theme (dark/light)
- 8 accent colors with live CSS variable updates
- 6 wallpaper presets + custom upload
- AI model preferences
- Voice settings
- Spotify connection
- Account profile
- Notifications
- Performance toggles

## Getting Started

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env

# Generate Prisma client
npm run db:generate

# Push database schema
npm run db:push

# Run development server
npm run dev
```

## Project Structure

```
src/
  app/
    page.tsx              # Landing page
    auth/                 # Login & Register
    workspace/            # Main workspace
      page.tsx            # Dashboard
      chat/               # AI Chat
      voice/              # Voice mode
      widgets/            # Widget grid
      settings/           # Settings panel
    api/
      auth/               # NextAuth route
      chat/               # AI streaming endpoint
  components/
    ui/                   # Reusable UI components
    landing/              # Landing page sections
    workspace/            # Shell components
    widgets/              # Widget components
  stores/                 # Zustand stores
  lib/                    # Utilities
prisma/
  schema.prisma           # Database schema
```

## Design System

- **Liquid Glass UI** with frosted translucent panels
- **Calm grayscale** palette with customizable accent colors
- **Apple-like easing** curves for all animations
- **No emojis** - only Lucide icons with monochrome styling

## License

Proprietary - Aivre
