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
        className="h-48 relative"
        style={{
          backgroundImage: 'url("/llg-header.png")',
          backgroundSize: 'cover',
          backgroundPosition: '50% 59%',
        }}
      >
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="absolute bottom-4 left-4 right-4">
          <h2 className="text-2xl font-bold text-white">{title}</h2>
        </div>
      </div>
      <CardContent className="p-6">
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