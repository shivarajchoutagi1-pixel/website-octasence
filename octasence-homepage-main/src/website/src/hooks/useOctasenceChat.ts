/**
 * Client helper for the OctaSence assistant. Calls the Next.js route proxy so the
 * VectorShift API key stays on the server.
 */
export async function sendOctasenceChatMessage(message: string): Promise<{
  reply: string;
}> {
  const trimmed = message.trim();
  if (!trimmed) {
    throw new Error('Message is empty.');
  }

  const response = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message: trimmed }),
  });

  const data = (await response.json().catch(() => ({}))) as {
    reply?: string;
    error?: string;
  };

  if (!response.ok) {
    throw new Error(data.error || `Chat request failed (${response.status})`);
  }

  return {
    reply:
      data.reply ??
      "I'm sorry, I couldn't generate a response. Please try again.",
  };
}
