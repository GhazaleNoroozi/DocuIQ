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

export async function answerQuestion(text: string, question: string): Promise<string> {
    const client = getClient();
    const response = await client.responses.create({
        model: "gpt-4.1-mini",
        input: [
            {
                role: "system",
                content: "You're an AI assistant. Only answer using the document below. If the answer is not in the document, respond with 'I couldn't find that information.'"
            },
            {
                role: "user",
                content: `Based on the following document, answer the question:\n\nDocument:\n${text}\n\nQuestion: ${question}`
            }
        ]
    });

    return response.output_text;
}