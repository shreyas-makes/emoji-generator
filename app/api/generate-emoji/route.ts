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
          prompt,
          apply_watermark: false,
          width: 1024,
          height: 1024,
          refine: "no_refiner",
          scheduler: "K_EULER",
          lora_scale: 0.6,
          num_outputs: 4,
          guidance_scale: 7.5,
          prompt_strength: 0.8,
          num_inference_steps: 50,
        }
      }
    )

    return NextResponse.json({ emojis: output })
  } catch (error) {
    console.error('Error generating emojis:', error)
    return NextResponse.json({ error: 'Failed to generate emojis' }, { status: 500 })
  }
}