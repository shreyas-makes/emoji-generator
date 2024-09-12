'use client'

import { useState } from 'react'
import { Heart, Download } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

interface EmojiGridProps {
  emojis: string[]
}

export default function EmojiGrid({ emojis }: EmojiGridProps) {
  const [likedEmojis, setLikedEmojis] = useState<{ [key: string]: boolean }>({})

  const handleLike = (emojiUrl: string) => {
    setLikedEmojis(prev => ({
      ...prev,
      [emojiUrl]: !prev[emojiUrl]
    }))
  }

  const handleDownload = async (emojiUrl: string, index: number) => {
    try {
      const response = await fetch(emojiUrl)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `emoji-${index + 1}.png`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } catch (error) {
      console.error('Error downloading emoji:', error)
    }
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {emojis.map((emoji, index) => (
        <div key={index} className="relative group aspect-square">
          <Image
            src={emoji}
            alt={`Generated emoji ${index + 1}`}
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            className="rounded-lg object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
            <Button size="sm" variant="ghost" onClick={() => handleLike(emoji)}>
              <Heart className={`w-4 h-4 ${likedEmojis[emoji] ? 'fill-red-500 text-red-500' : 'text-white'}`} />
            </Button>
            <Button size="sm" variant="ghost" onClick={() => handleDownload(emoji, index)}>
              <Download className="w-4 h-4 text-white" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}