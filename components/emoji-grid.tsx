'use client'

import { useState } from 'react'
import { Heart, Download } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface EmojiGridProps {
  emojis: string[]
}

export default function EmojiGrid({ emojis }: EmojiGridProps) {
  const [likedEmojis, setLikedEmojis] = useState<Set<number>>(new Set())

  const handleLike = (index: number) => {
    setLikedEmojis((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(index)) {
        newSet.delete(index)
      } else {
        newSet.add(index)
      }
      return newSet
    })
  }

  const handleDownload = (url: string) => {
    // Implement download logic here
    console.log('Downloading:', url)
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {emojis.map((emoji, index) => (
        <div key={index} className="relative group">
          <img src={emoji} alt={`Generated emoji ${index + 1}`} className="w-full h-auto rounded-lg" />
          <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
            <Button
              size="icon"
              variant="ghost"
              onClick={() => handleLike(index)}
              className={likedEmojis.has(index) ? 'text-red-500' : 'text-white'}
            >
              <Heart />
            </Button>
            <Button size="icon" variant="ghost" onClick={() => handleDownload(emoji)}>
              <Download />
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}