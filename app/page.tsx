import { OrbitBar } from "@/components/layout/OrbitBar";
import { GridContainer } from "@/components/layout/GridContainer";
import { SystemMetrics } from "@/components/widgets/SystemMetrics";
import { OpsActions } from "@/components/widgets/OpsActions";
import { AICortex } from "@/components/widgets/AICortex";
import { ServiceDeck } from "@/components/widgets/ServiceDeck";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <OrbitBar />
      
      <GridContainer className="flex-1">
        {/* Panel A: Core Systems */}
        <SystemMetrics />

        {/* Panel B: Ops Command */}
        <OpsActions />

        {/* Panel C: AI Cortex */}
        <AICortex />

        {/* Panel D: Services */}
        <ServiceDeck />

      </GridContainer>
    </div>
  );
}
