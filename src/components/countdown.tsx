"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface CountdownProps {
  targetDate: string
}

export function Countdown({ targetDate }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const target = new Date(targetDate).getTime()

    const calculateTimeLeft = () => {
      const now = new Date().getTime()
      const difference = target - now

      if (difference <= 0) {
        return {
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        }
      }

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000),
      }
    }

    setTimeLeft(calculateTimeLeft())

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    return () => clearInterval(timer)
  }, [targetDate])

  return (
    <Card className="border-none shadow-lg">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl">Countdown to Next Event</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-4 gap-2 text-center">
          <div className="flex flex-col">
            <div className="text-3xl font-bold text-sky-600 dark:text-sky-400">{timeLeft.days}</div>
            <div className="text-xs uppercase text-muted-foreground">Days</div>
          </div>
          <div className="flex flex-col">
            <div className="text-3xl font-bold text-sky-600 dark:text-sky-400">{timeLeft.hours}</div>
            <div className="text-xs uppercase text-muted-foreground">Hours</div>
          </div>
          <div className="flex flex-col">
            <div className="text-3xl font-bold text-sky-600 dark:text-sky-400">{timeLeft.minutes}</div>
            <div className="text-xs uppercase text-muted-foreground">Minutes</div>
          </div>
          <div className="flex flex-col">
            <div className="text-3xl font-bold text-sky-600 dark:text-sky-400">{timeLeft.seconds}</div>
            <div className="text-xs uppercase text-muted-foreground">Seconds</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

