const chat = document.getElementById("chat");
const input = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");

sendBtn.addEventListener("click", () => {
  const question = input.value.trim();
  if (!question) return;

  addMessage(question, "user");
  input.value = "";

  addMessage("Thinking...", "bot", true);

  chrome.runtime.sendMessage(
    {
      type: "ASK_AI",
      question
    },
    (response) => {
      removeLoading();
      if (response?.answer) {
        addMessage(response.answer, "bot");
      } else {
        addMessage("Failed to get response", "bot");
      }
    }
  );
});

function addMessage(text, type, loading = false) {
  const div = document.createElement("div");
  div.className = `message ${type}`;
  div.innerText = text;
  if (loading) div.id = "loading";
  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
}

function removeLoading() {
  const loading = document.getElementById("loading");
  if (loading) loading.remove();
}
