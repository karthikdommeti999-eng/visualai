import { SpeedInsights } from '@vercel/speed-insights/react';
import './App.css'

function App() {
  return (
    <div className="container">
      <header>
        <h1>Visual AI</h1>
        <p>Welcome to your application</p>
      </header>
      <main>
        <section>
          <h2>Getting Started</h2>
          <p>This application is configured with Vercel Speed Insights for performance monitoring.</p>
        </section>
      </main>
      <footer>
        <p>&copy; 2024 Visual AI. All rights reserved.</p>
      </footer>
      <SpeedInsights />
    </div>
  )
}

export default App
