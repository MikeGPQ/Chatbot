import {GoogleGenAI} from '@google/genai';

export async function getResponse(input) {
  const ai = new GoogleGenAI({
    apiKey: import.meta.env.VITE_API_KEY,
  });
  const config = {
    systemInstruction: [
        {
          text: `"You are an assistant for a coffee shop. You can only answer questions about our menu, store hours, and location. If a user asks about anything else, respond with 'I'm sorry, I can only help with questions about our coffee shop.' The menu items are: [cofee for $2 and cupcakes for $5]. The hours are 7 AM to 8 PM. Our location is 123 Main Street."`,
        }
    ],
  };
  const model = 'gemini-2.0-flash';
  const contents = [
    {
      role: 'user',
      parts: [
        {
          text: input,
        },
      ],
    },
  ];

  const response = await ai.models.generateContentStream({
    model,
    config,
    contents,
  });
  let fullResponse = '';
  for await (const chunk of response) {
    fullResponse += chunk.text;
  }
  return fullResponse;
}
