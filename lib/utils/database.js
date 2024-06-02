import mongoose from 'mongoose'

let isConnected = false

export const connectToDB = async () => {
  mongoose.set('strictQuery', true)

  console.log("CONNECT TO DB FUNCTION");
  console.log(process.env.MONGODB_URI);

  if (isConnected) {
    console.log('MongoDB is already connected')
    return
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: 'promptify' 
    })

    isConnected = true

    console.log('MongoDB connected', isConnected)

  } catch (err) {
    console.log('Something went wrong with mongodb connecting!', err)
  }

}