export default {
  async fetch(request, env, ctx) {
    // Only accept POST requests (Telegram sends updates via POST)
    if (request.method !== "POST") {
      return new Response("Aibeastbot is running. Send messages via Telegram.", {
        status: 200,
      });
    }

    try {
      const update = await request.json();

      // Simple logging (you can see this later in Cloudflare logs)
      console.log("Received update:", JSON.stringify(update));

      // Basic reply example (we will improve this later)
      if (update.message && update.message.text) {
        const chatId = update.message.chat.id;
        const text = update.message.text;

        // For now just echo back
        await fetch(`https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: chatId,
            text: `You said: ${text}\n\n(AI video generation coming soon)`,
          }),
        });
      }

      return new Response("OK");
    } catch (err) {
      console.error("Error:", err);
      return new Response("Error", { status: 500 });
    }
  },
};
