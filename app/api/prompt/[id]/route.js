import { connectToDB } from "@/lib/utils/database"
import Prompt from '@/models/prompt'
//GET (to read)
export const GET = async (req, { params }) => {

  try {
    await connectToDB()

    const prompt = await Prompt.findById(params.id).populate('creator')

    if (!prompt) {
      return new Response('Prompt not found', { status: 404 })
    }

    return new Response(JSON.stringify(prompt), { status: 200 })

  } catch (err) {
    console.log("Failed to fetch a prompt", err)
    return new Response("Failed to fetch a prompt", { status: 500 })
  }
}
//PATCH (to update)
export const PATCH = async (req, { params }) => {
  const { prompt, tag } = await req.json()

  console.log("*** PARAMS ID:", params.id);
  try {
    await connectToDB()

    const existingPrompt = await Prompt.findById(params.id)

    if (!existingPrompt) {
      return new Response('Prompt not found', { status: 404 })
    }

    existingPrompt.prompt = prompt
    existingPrompt.tag = tag

    await existingPrompt.save()

    return new Response(JSON.stringify(existingPrompt), { status: 200 })

  } catch (err) {
    console.log(err)
    return new Response("Failed to update a prompt", { status: 500 })
  }
}
//DELETE (to remove)
export const DELETE = async (req, { params }) => {
  try {
    await connectToDB()

    await Prompt.findByIdAndDelete(params.id)

    return new Response(`Prompt by id: ${params.id} is removed`, { status: 200 })

  } catch (err) {
    console.log("", err)
    return new Response("Failed to remove a prompt", { status: 500 })
  }
}
