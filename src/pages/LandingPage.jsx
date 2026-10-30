import NavBar from "../components/landingPage/NavBar";
import Hero from "../components/landingPage/Hero";
import ProblemAndFeatures from "../components/landingPage/ProblemAndFeatures";
import CTASection from "../components/landingPage/CTASection";
import Footer from "../components/landingPage/Footer";

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