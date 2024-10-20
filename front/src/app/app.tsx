import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Navbar } from '@/components/navbar'
import { Home } from '@/app/pages/Home.tsx'
import { CreateEvent } from '@/app/pages/CreateEvent.tsx'
import { Event } from '@/app/pages/Event.tsx'
import { ThemeProvider } from '@/contexts/theme-context'
import { Toaster } from '@/components/ui/toaster'
import { EventProvider } from '../contexts/event-context.tsx'
import { NotFound } from './pages/NotFound.tsx'
import { About } from './pages/About.tsx'
import { MemberProvider } from '@/contexts/member-context.tsx'

export function App() {
  return (
    <>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <EventProvider>
          <MemberProvider>
            <Router>
              <Navbar />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/event" element={<CreateEvent />} />
                <Route path="/event/:id" element={<Event />} />
                <Route path="/about" element={<About />} />
                <Route path="/404" element={<NotFound />} />
                <Route path="*" element={<Home />} />
              </Routes>
            </Router>
            <Toaster />
          </MemberProvider>
        </EventProvider>
      </ThemeProvider>
    </>
  )
}
