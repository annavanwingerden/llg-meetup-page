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

export function Updates() {
  const [updates, setUpdates] = useState<Update[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchUpdates = async () => {
      try {
        // In a real implementation, you would fetch from the SheetsDB API
        // For this example, we'll use mock data
        const mockUpdates: Update[] = [
          {
            id: "1",
            message:
              "This weekend's meetup will include a beginner's workshop! If you're new to longboarding, come 30 minutes early for some basic tips and tricks.",
            author: "Mike (Organizer)",
            timestamp: "2025-03-01T15:30:00",
          },
          {
            id: "2",
            message: "Weather looks perfect for Saturday! Don't forget to bring water and sunscreen.",
            author: "Sarah (Organizer)",
            timestamp: "2025-03-02T10:15:00",
          },
          {
            id: "3",
            message: "We'll be taking a group photo at noon, so wear your crew merch if you have it!",
            author: "Mike (Organizer)",
            timestamp: "2025-03-03T09:45:00",
          },
        ]

        setUpdates(mockUpdates)
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

