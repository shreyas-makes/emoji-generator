'use client';

import EmojiGenerator from '@/components/emoji-generator'
import { useEffect } from 'react';
import { useUser } from '@clerk/nextjs';

export default function Home() {
  const { isSignedIn, user } = useUser();

  useEffect(() => {
    if (isSignedIn && user) {
      fetch('/api/user', { method: 'POST' })
        .then(response => response.json())
        .then(data => {
          console.log('User verified/created:', data);
        })
        .catch(error => {
          console.error('Error verifying/creating user:', error);
        });
    }
  }, [isSignedIn, user]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Emoji Generator</h1>
      <EmojiGenerator />
    </div>
  )
}
