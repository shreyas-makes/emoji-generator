# Emoji Generator

This project is a Next.js application that generates emojis from text input using models from Replicate.

## Project Overview

The Emoji Generator allows users to input text prompts and generate corresponding emojis using the Replicate API. It features a user-friendly interface with a form for prompt submission, a loading animation during emoji generation, and a grid display of the generated emojis.

## Key Features

- Text-to-emoji generation using Replicate's API
- User-friendly form for prompt submission
- Loading animation during emoji generation
- Grid display of generated emojis
- Hover options to like or download emojis

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   Create a `.env.local` file in the root directory and add your Replicate API token:
   ```
   REPLICATE_API_TOKEN=your_api_token_here
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```
5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Tech Stack

- Next.js: Frontend framework
- Shadcn: UI components
- Lucide: Icons
- Supabase: Database
- Replicate: AI model for emoji generation
- Clerk: Authentication

## Project Structure

- `/app`: Contains the main pages of the application
- `/components`: Houses reusable React components
- `/lib`: Utility functions and shared code

## Learn More

To learn more about the technologies used in this project, check out the following resources:

- [Next.js Documentation](https://nextjs.org/docs)
- [Replicate API Documentation](https://replicate.com/docs)
- [Shadcn UI Documentation](https://ui.shadcn.com/)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
