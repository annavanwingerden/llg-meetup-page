import { Countdown } from "@/components/countdown"
import { EventDetails } from "@/components/event-details"
import { Header } from "@/components/header"
import { Updates } from "@/components/updates"
import  Weather  from "@/components/weather"

export default function Home() {
  return (

    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-sky-100 dark:from-slate-900 dark:to-slate-800">
      <Header />
      <main className="container mx-auto px-4 py-8 relative z-0">
      <div className="grid gap-8 md:grid-cols-2">
        <div className="space-y-8 self-start">
          <div className="relative rounded-lg shadow overflow-hidden">
            <div 
              className="absolute inset-0 z-0 opacity-20"
              style={{
                backgroundImage: 'url("/meetup-pic-albert-memorial.jpeg")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />
            <div className="relative z-10 p-6">
              <EventDetails
                title="Our 3rd Birthday Party!"
                description="🎈We are turning 3! 🎈 Join us for a spring group skate and to celebrate how far London Longboard Girls have come in the last three years 🛹🎂☀️"
                location="Albert Memorial, Hyde Park"
                date="2025-04-12T15:00:00"
              />
            </div>
          </div>
        </div>
          <div className="space-y-8 self-start">
            <Countdown targetDate="2025-04-12T15:00:00" /> 
            <Weather />
          </div>
        </div>

        <div className="mt-12">
          <Updates />
        </div>
      </main>
    </div>
  )
}

