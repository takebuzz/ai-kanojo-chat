import React, { useState } from 'react';

export default function Chat({ settings }) {
  const [messages, setMessages] = useState([{ role: 'system', content: `あなたは${settings.personality}な彼女としてふるまいます。` }]);
  const [input, setInput] = useState('');

  const sendMessage = async () => {
    const newMessages = [...messages, { role: 'user', content: input }];
    setMessages(newMessages);
    setInput('');

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: newMessages
      })
    });

    const data = await response.json();
    const aiMessage = data.choices[0].message;
    setMessages([...newMessages, aiMessage]);
  };

  return (
    <div>
      <h2>{settings.name}ちゃんとのチャット</h2>
      <div style={{ border: '1px solid #ccc', padding: '10px', height: '300px', overflowY: 'scroll' }}>
        {messages.slice(1).map((msg, idx) => (
          <div key={idx}><strong>{msg.role === 'user' ? 'あなた' : settings.name}：</strong>{msg.content}</div>
        ))}
      </div>
      <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="メッセージを入力..." />
      <button onClick={sendMessage}>送信</button>
    </div>
  );
}
