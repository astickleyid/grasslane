import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import TrustStrip from '@/components/TrustStrip';
import Services from '@/components/Services';
import Passion from '@/components/Passion';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <TrustStrip />
      <Services />
      <Passion />
      <Footer />
    </main>
  );
}
