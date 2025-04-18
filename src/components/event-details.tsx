import { Calendar, MapPin } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { formatDate } from "@/lib/utils"

interface EventDetailsProps {
  title: string
  description: string
  location: string
  date: string
}

export function EventDetails({ title, description, location, date }: EventDetailsProps) {
  return (
    <Card className="overflow-hidden border-none shadow-lg">
      <div 
        className="h-120 relative"
        style={{
          backgroundImage: 'url("/llg-event.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center 20%%',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="absolute bottom-4 left-4 right-4">
          <div className="p-2 bg-[#f7f7eb] rounded-lg">
            <h2 className="text-2xl font-bold text-black text-center">{title}</h2>
          </div>
        </div>
      </div>
      <CardContent className="p-6 pt-0">
        <p className="text-muted-foreground mb-4">{description}</p>
        <div className="space-y-2">
          <div className="flex items-center text-sm">
            <Calendar className="mr-2 h-4 w-4 text-sky-600 dark:text-sky-400" />
            <span>{formatDate(date)}</span>
          </div>
          <div className="flex items-center text-sm">
            <MapPin className="mr-2 h-4 w-4 text-sky-600 dark:text-sky-400" />
            <span>{location}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}