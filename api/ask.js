export default async function handler(req, res) {
  try {
    const body = req.body;

    const response = await fetch("https://api.generative.ai/v1/complete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.API_KEY}`
      },
      body: JSON.stringify(body)
    });

    res.setHeader("Access-Control-Allow-Origin", "*");
    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.status(500).json({ error: err.message });
  }
}
