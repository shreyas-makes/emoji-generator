import { NextResponse } from 'next/server'
import Replicate from 'replicate'

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
})

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json()

    const output = await replicate.run(
      "fofr/sdxl-emoji:dee76b5afde21b0f01ed7925f0665b7e879c50ee718c5f78a9d38e04d523cc5e",
      {
        input: {
          prompt: `A TOK emoji of ${prompt}`,
          apply_watermark: false,
          width: 1024,
          height: 1024,
          refine: "no_refiner",
          scheduler: "K_EULER",
          lora_scale: 0.6,
          num_outputs: 1, // Changed from 4 to 1
          guidance_scale: 7.5,
          prompt_strength: 0.8,
          num_inference_steps: 50,
        }
      }
    )

    // Since we're now generating only one image, we need to wrap it in an array
    // to maintain compatibility with the existing frontend code
    return NextResponse.json({ emojis: [output] })
  } catch (error) {
    console.error('Error generating emoji:', error)
    return NextResponse.json({ error: 'Failed to generate emoji' }, { status: 500 })
  }
}