'use client'

import { Heart, Download } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

interface EmojiGridProps {
  emojis: string[]
}

export default function EmojiGrid({ emojis }: EmojiGridProps) {
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
            <Button size="sm" variant="ghost">
              <Heart className="w-4 h-4" />
            </Button>
            <Button size="sm" variant="ghost">
              <Download className="w-4 h-4" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}