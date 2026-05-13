"use client";

import { Navbar } from "@/components/landing/navbar";
import { HeroSection } from "@/components/landing/hero-section";
import { AgentsSection } from "@/components/landing/agents-section";
import { WidgetsSection } from "@/components/landing/widgets-section";
import { VoiceSection } from "@/components/landing/voice-section";
import { WorkspaceSection } from "@/components/landing/workspace-section";
import { SpotifySection } from "@/components/landing/spotify-section";
import { ModelsSection } from "@/components/landing/models-section";
import { FeaturesSection } from "@/components/landing/features-section";
import { ProductivitySection } from "@/components/landing/productivity-section";
import { DownloadSection } from "@/components/landing/download-section";
import { Footer } from "@/components/landing/footer";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-black">
      <Navbar />
      <HeroSection />
      <AgentsSection />
      <WidgetsSection />
      <VoiceSection />
      <WorkspaceSection />
      <SpotifySection />
      <ModelsSection />
      <FeaturesSection />
      <ProductivitySection />
      <DownloadSection />
      <Footer />
    </main>
  );
}
