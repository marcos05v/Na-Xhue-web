import Image from "next/image";
import NavbarWeb from "@/components/ui/navbar-web";
import HeroSection from "@/components/ui/Herosection";
import Benefits from "@/components/ui/Benefits";
import Footer from "@/components/ui/Footer";
import HowItWorks from "@/components/ui/Howitworks";
import CTASection from "@/components/ui/Ctasection";


export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <NavbarWeb />
      <HeroSection />
      <HowItWorks />
      <Benefits />
      <CTASection />
      <Footer />
    </main>
  );
}
