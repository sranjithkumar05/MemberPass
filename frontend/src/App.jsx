import BackgroundEffects from './components/BackgroundEffects'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Features from './components/Features'
import HowItWorks from './components/HowItWorks'
import Contact from './components/Contact'
import Footer from './components/Footer'
import './App.css'

function App() {
  return (
    <div className="app-root">
      {/* Background Ambience & Canvas Particles */}
      <BackgroundEffects />

      {/* Navigation Bar */}
      <Navbar />

      {/* Main Sections Content */}
      <main className="main-content">
        <Hero />
        <About />
        <Features />
        <HowItWorks />
        <Contact />
      </main>

      {/* Platform Footer */}
      <Footer />
    </div>
  )
}

export default App
