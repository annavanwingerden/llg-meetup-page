import { Countdown } from "@/components/countdown"
import { EventDetails } from "@/components/event-details"
import { Header } from "@/components/header"
import { Updates } from "@/components/updates"
import  Weather  from "@/components/weather"
import { WhatsAppBanner } from "@/components/whatsapp-banner"

export default function Home() {
  return (

    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-sky-100 dark:from-slate-900 dark:to-slate-800">
      <Header />
      <main className="container mx-auto px-4 py-8">
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
                title="International Women's Day Meetup!"
                description="Join us for our bi-monthly longboarding session. All skill levels welcome!"
                location="Albert Memorial, Hyde Park"
                date="2025-03-08T14:00:00"
              />
            </div>
          </div>
        </div>
          <div className="space-y-8 self-start">
            <Countdown targetDate="2025-03-08T14:00:00" /> 
            <Weather />
          </div>
        </div>

        <div className="mt-12">
          <Updates />
        </div>

        <div className="mt-12">
          <WhatsAppBanner
            text="Join our WhatsApp group to connect with other longboards and organise informal skates near you!"
            link="https://chat.whatsapp.com/IpWJsmoPARVL4ADYgu1MXF"
          />
        </div>
      </main>
    </div>
  )
}

