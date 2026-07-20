import OpenAI from "openai";


function getClient() {
    return new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
    });
}

export async function summarize(text: string): Promise<string> {
    const client = getClient();
    const response = await client.responses.create({
        model: "gpt-4.1-mini",
        input: [
            {
                role: "system",
                content: "You are an expert document assistant. Summarize documents clearly and concisely."
            },
            {
                role: "user",
                content: `Summarize the following document:\n\n${text}`
            }
        ]
    });

    return response.output_text;
}