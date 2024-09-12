'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
import EmojiGrid from './emoji-grid'

export default function EmojiGenerator() {
  const [prompt, setPrompt] = useState('')
  const [emojis, setEmojis] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/generate-emoji', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      })

      if (!response.ok) {
        throw new Error('Failed to generate emojis')
      }

      const data = await response.json()
      setEmojis(Array.isArray(data.emojis) ? data.emojis : [])
    } catch (err) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter a prompt for emoji generation"
          className="w-full"
        />
        <Button 
          type="submit" 
          disabled={isLoading || prompt.trim() === ''} 
          className="w-full"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : (
            'Generate Emojis'
          )}
        </Button>
      </form>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <span className="block sm:inline">{error}</span>
        </div>
      )}
      {emojis.length > 0 && <EmojiGrid emojis={emojis} />}
      {!isLoading && emojis.length === 0 && (
        <div className="text-center text-gray-500 italic">
          No emojis generated yet. Enter a prompt and click generate!
        </div>
      )}
    </div>
  )
}