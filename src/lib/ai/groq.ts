export async function generateLearningPath(topic: string) {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    throw new Error("GROQ_API_KEY is not set");
  }

  const prompt = `Generate a learning roadmap for someone who wants to: "${topic}".
Return a structured JSON object with the following schema:
{
  "title": "A catchy title for the path",
  "description": "A brief overview of what the user will achieve",
  "total_hours": "Estimated total hours (e.g., '42h')",
  "modules": [
    {
      "title": "Module name",
      "description": "Short module description",
      "videos": [
        {
          "title": "Specific tutorial title that would exist on YouTube",
          "duration": "MM:SS",
          "level": "Beginner | Intermediate | Advanced",
          "channel": "Probable YouTube channel name"
        }
      ]
    }
  ]
}
Return ONLY the JSON object. No extra text.`;

  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content: "You are a senior education architect and curriculum designer. You output strictly valid JSON.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      response_format: { type: "json_object" },
      temperature: 0.7,
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    console.error("Groq API error:", errorBody);
    throw new Error(`Groq API failed: ${response.statusText}`);
  }

  const result = await response.json();
  const content = result.choices[0]?.message?.content;
  if (!content) {
    throw new Error("No content returned from Groq");
  }

  return JSON.parse(content);
}
