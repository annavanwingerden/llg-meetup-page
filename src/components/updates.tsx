"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { formatDistanceToNow } from "@/lib/utils"

interface Update {
  id: string
  message: string
  author: string
  timestamp: string
}

interface SheetDBResponse {
  id: string
  message: string
  author: string
  timestamp: string
}

function parseSheetDBTimestamp(timestamp: string): string {
  const [datePart, timePart] = timestamp.split(' ')
  const [day, month, year] = datePart.split('/')
  const [hours, minutes] = timePart.split('.')
  return `${year}-${month}-${day}T${hours}:${minutes}:00`
}

export function Updates() {
  const [updates, setUpdates] = useState<Update[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchUpdates = async () => {
      try {
        const response = await fetch('https://sheetdb.io/api/v1/igj17q77h1wad')
        if (!response.ok) {
          throw new Error('Failed to fetch updates')
        }
        const data = await response.json() as SheetDBResponse[]
        
        const formattedUpdates: Update[] = data.map((item) => ({
          id: item.id,
          message: item.message,
          author: item.author,
          timestamp: parseSheetDBTimestamp(item.timestamp)
        }))

        setUpdates(formattedUpdates)
        setLoading(false)
      } catch (err) {
        setError("Failed to load updates")
        console.error("Failed to load updates", err)
        setLoading(false)
      }
    }

    fetchUpdates()
  }, [])

  return (
    <Card className="border-none shadow-lg">
      <CardHeader>
        <CardTitle>Updates from Organizers</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sky-600"></div>
          </div>
        ) : error ? (
          <div className="text-center text-red-500">{error}</div>
        ) : (
          <div className="space-y-4">
            {updates.map((update) => (
              <div key={update.id} className="border-l-4 border-sky-500 pl-4 py-2">
                <p className="mb-2">{update.message}</p>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>{update.author}</span>
                  <span>{formatDistanceToNow(update.timestamp)}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

