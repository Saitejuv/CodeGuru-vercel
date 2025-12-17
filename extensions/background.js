chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === "GET_AI_ANSWER") {
    fetch("https://api.generative.ai/v1/complete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer AIzaSyBXlH0LsABX6L7mC3JmWFRBxyaL_EftVuE` // <-- Replace with your Gemini API key
      },
      body: JSON.stringify(request.body)
    })
    .then(res => {
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      return res.json();
    })
    .then(data => {
      if (data.candidates && data.candidates.length > 0) {
        sendResponse({ answer: data.candidates[0].output });
      } else {
        sendResponse({ error: "No output from AI." });
      }
    })
    .catch(err => {
      console.error("Fetch error:", err.message);
      sendResponse({ error: err.message });
    });

    return true; // Keep the message channel open for async response
  }
});

