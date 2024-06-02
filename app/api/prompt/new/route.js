import { connectToDB } from "@/lib/utils/database"
import Prompt from '@/models/prompt'

export const POST = async (req, res) => {
  const { userId, prompt, tag } = await req.json()

  try {
    await connectToDB()
    const newPrompt = new Prompt({
      creator: userId,
      prompt,
      tag
    })

    await newPrompt.save()

    return new Response(JSON.stringify(newPrompt), { status: 201 })

  } catch (err) {
    console.log(err)
    return new Response("Failed to create a new prompt", { status: 500 })
  }
}

//Dokładnie tak! W Next.js, gdy używasz metody json() na obiekcie Request, nie musisz bezpośrednio wskazywać pola body. Metoda json() sama zajmuje się parsowaniem ciała żądania.
// Jak to działa
// Kiedy wywołujesz req.json(), Next.js korzysta z funkcjonalności Fetch API, aby automatycznie odczytać ciało żądania i sparsować je jako JSON. To znaczy, że req.json() odczytuje cały strumień danych z ciała żądania, parsuje go i zwraca wynik jako obiekt JavaScript.

//Next.js jest frameworkiem do tworzenia aplikacji React z możliwością renderowania po stronie serwera (SSR) i statycznego generowania stron (SSG). W Next.js, od wersji 13 i nowszych, często stosuje się nową funkcjonalność do obsługi API, gdzie korzysta się z tzw. Route Handlers.
// const express = require('express');
// const app = express();

// // Konfiguracja middleware do parsowania JSON
// app.use(express.json());

// app.post('/api', (req, res) => {
//   const { userId, prompt, tag } = req.body;
//   // dalsze przetwarzanie
// });

//W Next.js req.body nie jest automatycznie parsowane, jak ma to miejsce w Express.js przy użyciu middleware body-parser lub express.json().

//W Express.js używasz middleware express.json() do automatycznego parsowania ciała żądania. Dzięki temu req.body jest dostępne bez dodatkowych operacji:

// Tak, w Next.js metoda req.json():

//     Odczytuje całe ciało żądania.
//     Parsuje zawartość ciała żądania jako JSON.
//     Zwraca sparsowane dane jako obiekt JavaScript.

// Dzięki temu proces parsowania jest uproszczony i zautomatyzowany, co ułatwia pracę z danymi przesyłanymi w żądaniach HTTP.

// Nowe API routes w app directory w Next.js 13+ wymagają użycia klasy Response do zwracania odpowiedzi. Klasyczne podejście z res.status().json() nie działa w tym kontekście. Zastosowanie powyższego przykładu powinno rozwiązać problem błędu res.status is not a function.