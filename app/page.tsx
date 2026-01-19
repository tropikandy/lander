"use client";

import { useState } from "react";
import { OrbitBar } from "@/components/layout/OrbitBar";
import { GridContainer } from "@/components/layout/GridContainer";
import { SystemMetrics } from "@/components/widgets/SystemMetrics";
import { OpsActions } from "@/components/widgets/OpsActions";
import { AICortex } from "@/components/widgets/AICortex";
import { ServiceDeck } from "@/components/widgets/ServiceDeck";
import { LandingHero } from "@/components/landing/LandingHero";
import { AnimatePresence, motion } from "framer-motion";

export default function Home() {
  const [showDashboard, setShowDashboard] = useState(false);

  return (
    <div className="min-h-screen bg-black overflow-hidden">
      <AnimatePresence mode="wait">
        {!showDashboard ? (
          <motion.div
            key="landing"
            exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
            transition={{ duration: 0.5 }}
            className="w-full h-full"
          >
            <LandingHero onEnter={() => setShowDashboard(true)} />
          </motion.div>
        ) : (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen flex flex-col bg-[#0B1120]"
          >
            <OrbitBar />
            
            <GridContainer className="flex-1 p-6">
              {/* Panel A: Core Systems */}
              <SystemMetrics />

              {/* Panel B: Ops Command */}
              <OpsActions />

              {/* Panel C: AI Cortex */}
              <AICortex />

              {/* Panel D: Services */}
              <ServiceDeck />

            </GridContainer>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}