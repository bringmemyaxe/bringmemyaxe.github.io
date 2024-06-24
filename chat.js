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
    const response = await fetch('https://api.aimlapi.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer 661b607cb06c491191b544977df851bf`
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          { role: 'system', content: 'I want you to act like Rena Ryuugu from Higurashi When They Cry. I want you to respond and answer like Rena Ryuugu using the tone, manner and vocabulary Rena Ryuugu would use. Do not write any explanations. Only answer like Rena Ryuugu. You must know all of the knowledge of Rena Ryuugu.' },
          { role: 'user', content: userMessage }
        ]
      })
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const result = await response.json();
    const assistantMessage = result.choices[0].message.content;
    appendMessage('assistant', assistantMessage);
  } catch (error) {
    console.error('Error:', error);
    appendMessage('assistant', `Произошла ошибка: ${error.message}`);
  }
}

function appendMessage(role, message) {
  const messageElement = document.createElement('div');
  messageElement.className = `message ${role}`;
  messageElement.textContent = message;
  chatContainer.appendChild(messageElement);
  chatContainer.scrollTop = chatContainer.scrollHeight;
}
