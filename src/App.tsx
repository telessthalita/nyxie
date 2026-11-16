import { useCallback, useEffect, useState } from 'react'
import { Featured, Hero, Marquee, MobileMenu, Navbar, TrailerModal } from './sections/Top'
import { Character, Gameplay, Poses, Skins, Story } from './sections/Middle'
import { Editions, Faq, FinalCta, Footer, Hub, Worlds } from './sections/Bottom'
import { Soundtrack } from './components/Soundtrack'
import { BeatPulse } from './audio/BeatPulse'
import { setupWake } from './wake'

export default function App() {
  const [menu, setMenu] = useState(false)
  const [trailer, setTrailer] = useState(false)
  const closeMenu = useCallback(() => setMenu(false), [])
  const closeTrailer = useCallback(() => setTrailer(false), [])
  const openTrailer = useCallback(() => setTrailer(true), [])
  useEffect(() => setupWake(), [])

  return (
    <>
      <Navbar onMenu={() => setMenu(true)} />
      <main>
        <Hero onTrailer={openTrailer} />
        <Marquee />
        <Featured />
        <Story />
        <Character />
        <Skins />
        <Poses />
        <Gameplay />
        <Worlds />
        <Hub />
        <Editions />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
      <MobileMenu open={menu} onClose={closeMenu} onTrailer={openTrailer} />
      <TrailerModal open={trailer} onClose={closeTrailer} />
      <Soundtrack />
      <BeatPulse />
    </>
  )
}
