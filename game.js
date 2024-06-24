const { OpenAI } = require('openai');

const api = new OpenAI({
  baseURL: 'https://api.aimlapi.com',
  apiKey: '661b607cb06c491191b544977df851bf',
});

const chatContainer = document.getElementById('chat-container');
const inputField = document.getElementById('input-field');
const sendButton = document.getElementById('send-button');

sendButton.addEventListener('click', sendMessage);
inputField.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    sendMessage();
  }
});

async function sendMessage() {
  const userMessage = inputField.value.trim();
  if (!userMessage) return;

  appendMessage('user', userMessage);
  inputField.value = '';

  try {
    const result = await api.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: 'You are an AI assistant who knows everything.',
        },
        {
          role: 'user',
          content: userMessage,
        },
      ],
    });

    const aiMessage = result.choices[0].message.content;
    appendMessage('assistant', aiMessage);
  } catch (error) {
    console.error('Error:', error);
    appendMessage('assistant', 'Sorry, something went wrong. Please try again.');
  }
}

function appendMessage(role, message) {
  const messageElement = document.createElement('div');
  messageElement.classList.add('message', role);
  messageElement.textContent = message;
  chatContainer.appendChild(messageElement);
  chatContainer.scrollTop = chatContainer.scrollHeight;
}
