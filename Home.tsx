import Navigation from '../sections/Navigation'
import Hero from '../sections/Hero'
import TrustedBy from '../sections/TrustedBy'
import Services from '../sections/Services'
import Divider from '../sections/Divider'
import Process from '../sections/Process'
import About from '../sections/About'
import Contact from '../sections/Contact'
import Footer from '../sections/Footer'

export default function Home() {
  return (
    <>
      <Navigation />
      <Hero />
      <TrustedBy />
      <Services />
      <Divider />
      <Process />
      <About />
      <Contact />
      <Footer />
    </>
  )
}
