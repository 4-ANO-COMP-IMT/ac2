import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Navbar } from '@/components/navbar'
import { Home } from '@/pages/Home'
import { CreateEvent } from '@/pages/CreateEvent'
import { Event } from '@/pages/Event'
import { ThemeProvider } from '@/contexts/theme-context'
import { Toaster } from '@/components/ui/toaster'

export default function App() {
  return (
    <>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/event" element={<CreateEvent />} />
            <Route path="/event/:id" element={<Event />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </Router>
        <Toaster />
      </ThemeProvider>
    </>
  )
}
