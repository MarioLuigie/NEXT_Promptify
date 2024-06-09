import { connectToDB } from "@/lib/utils/database"
import Prompt from '@/models/prompt'

export const GET = async (req) => {
  try {
    console.log("Connecting to DB!!!")
    await connectToDB()

    console.log("Fetching prompts!!!")
    const prompts = await Prompt.find({}).populate('creator')

    console.log('Fetched prompts!!!:', prompts)

    return new Response(JSON.stringify(prompts), {
      status: 200, headers: {
        'Cache-Control': 'no-store'
      }
    })
  } catch (err) {
    console.log(err)
    return new Response("Failed to fetch all prompts", { status: 500 })
  }
}