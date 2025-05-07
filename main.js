import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: 'not-needed', // Rate limit is 10 RPM
  baseURL: 'https://v1.vasarai.net/v1',
});

async function main() {
  try {
    const stream = await openai.chat.completions.create({
      model: 'gpt-4.1-2025-04-14',
      messages: [
        { role: 'system', content: 'You are a helpful assistant.' },
        { role: 'user', content: 'write me a story about India in 2000 words long' }
      ],
      temperature: 0.7,
      max_tokens: 12000,
      stream: true,
    });
    
    let fullResponse = '';
    for await (const chunk of stream) {
      const content = chunk.choices[0]?.delta?.content || '';
      process.stdout.write(content);
      fullResponse += content;
    }

    console.log('\n');
  } catch {
    console.error('Error in API call');
    process.exit(1);
  }
}

main();
