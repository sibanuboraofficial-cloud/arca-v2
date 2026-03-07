import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import StatsAndProof from "@/components/StatsAndProof";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import GrainOverlay from "@/components/GrainOverlay";
import CropMarks from "@/components/CropMarks";

export default function Home() {
  return (
    <>
      <CustomCursor />
      <GrainOverlay />
      <CropMarks />
      <Navbar />
      <main>
        <Hero />
        <HowItWorks />
        <StatsAndProof />
      </main>
      <Footer />
    </>
  );
}
