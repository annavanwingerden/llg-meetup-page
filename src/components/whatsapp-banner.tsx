import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { MessageSquare } from "lucide-react"
import Link from "next/link"

interface WhatsAppBannerProps {
  text: string
  link: string
}

export function WhatsAppBanner({ text, link }: WhatsAppBannerProps) {
  return (
    <Card className="border-none shadow-lg bg-gradient-to-r from-green-500 to-emerald-600 text-white">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center">
            <MessageSquare className="h-8 w-8 mr-4" />
            <p className="font-medium">{text}</p>
          </div>
          <Link href={link} target="_blank" rel="noopener noreferrer">
            <Button className="bg-white text-green-600 hover:bg-gray-100">Join WhatsApp Group</Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}

