import NavBar from "../components/NavBar";
import Hero from "../components/Hero";
import ProblemAndFeatures from "../components/ProblemAndFeatures";
import CTASection from "../components/CTASection";
import Footer from "../components/Footer";

function LandingPage() {
  return (
    <div className="landingPage">
      <NavBar />

      <main>
        <Hero />
      <ProblemAndFeatures />
      <CTASection />
      </main>
    
      <Footer />
    </div>
  );
}

export default LandingPage;