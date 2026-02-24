import useRegistrationFlow from './hooks/useRegistrationFlow'
import DesktopGate from './components/DesktopGate'
import Header from './components/Header'
import Hero from './components/Hero'
import Benefits from './components/Benefits'
import EventsCarousel from './components/EventsCarousel'
import Topics from './components/Topics'
import Testimonials from './components/Testimonials'
import CtaSection from './components/CtaSection'
import Footer from './components/Footer'
import RegistrationModal from './components/RegistrationModal'

const isMobile = /Android|iPhone|iPad|iPod|webOS|BlackBerry|IEMobile|Opera Mini/i.test(
  navigator.userAgent
)

export default function App() {
  const flow = useRegistrationFlow()

  if (!isMobile) return <DesktopGate />

  return (
    <>
      <Header />
      <Hero />
      <Benefits />
      <EventsCarousel />
      <Topics onCtaClick={(topics) => flow.openModal(topics)} />
      <Testimonials />
      <CtaSection onCtaClick={() => flow.openModal()} />
      <Footer />
      <RegistrationModal {...flow} />
    </>
  )
}
