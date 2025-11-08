import Header from "../components/Header";
import Hero from "../components/Hero";
import Services from "../components/Services";
import Footer from "../components/Footer";

export default function HomePage() {
  return (
    <main>
      <Header />
      <Hero />
      <Services />
      <PortfolioGrid />
      <Footer />
    </main>
  );
}
