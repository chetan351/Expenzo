import React from 'react'
import { useState } from 'react'
import API from "../api/axios"

const AiBot = () => {
    const [prompt, setPrompt] = useState("")
    const [aiResponse, setAiResponse] = useState("")

    const askAI = async () => {
    const res = await API.post("/ai", {prompt})

    setAiResponse(res.data.response)
    }
  return (
    <div className="bg-white p-6 rounded-xl shadow-md mt-8">

  <h2 className="text-2xl font-semibold text-emerald-700">
    AI Financial Assistant
  </h2>

  <textarea
    value={prompt}
    onChange={(e) => setPrompt(e.target.value)}
    placeholder="Ask AI about your expenses... For e.g. ---What is my highest expense.---"
    className="w-full border p-3 rounded-lg mt-4"
  />

  <button
    onClick={askAI}
    className="bg-emerald-700 text-white px-6 py-2 rounded-lg mt-4"
  >
    Ask AI
  </button>

  

  {aiResponse?(
      <div className="mt-8 bg-zinc-100 border border-zinc-300 rounded-2xl whitespace-pre-wrap  p-6 text-lg">
        <p>{aiResponse}</p>
      </div>
    ):''}

</div>
  )
}

export default AiBot
