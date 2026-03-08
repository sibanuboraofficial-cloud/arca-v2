import GrainOverlay from "@/components/GrainOverlay";
import CustomCursor from "@/components/CustomCursor";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";

export default function Home() {
  return (
    <>
      <GrainOverlay />
      <CustomCursor />
      <Navbar />
      <main className="relative z-[1]">
        <Hero />
      </main>
    </>
  );
}
