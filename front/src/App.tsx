import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Navbar } from '@/components/navbar'
import { Home } from '@/pages/Home'
import { Event } from '@/pages/Event'
import { ThemeProvider } from '@/contexts/theme-context'
import { Toaster } from '@/components/ui/toaster'
import { NotFound } from './pages/NotFound'

export default function App() {
  return (
    <>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/event" element={<Event />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
        <Toaster />
      </ThemeProvider>
    </>
  )
}
