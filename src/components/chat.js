// Chat.js
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
import React, { useState } from 'react';

export default function Chat({ settings }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;
    const newMessages = [...messages, { role: 'user', content: input }];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    // API呼び出し（OpenAI API連携を前提）
    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            { role: 'system', content: `${settings.name}は${settings.personality}なAI彼女です。ユーザーと恋人のように会話します。見た目は${settings.appearance}です。` },
            ...newMessages
          ]
        })
      });
      const data = await response.json();
      const aiReply = data.choices?.[0]?.message?.content || 'ごめん、よくわからなかった💦';
      setMessages([...newMessages, { role: 'assistant', content: aiReply }]);
    } catch (err) {
      setMessages([...newMessages, { role: 'assistant', content: 'エラーが起きたよ💦' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>{settings.name}（{settings.personality}）とのチャット💬</h2>
      <div style={{ height: '300px', overflowY: 'auto', border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
        {messages.map((msg, i) => (
          <div key={i} style={{ margin: '5px 0', textAlign: msg.role === 'user' ? 'right' : 'left' }}>
            <b>{msg.role === 'user' ? 'あなた' : settings.name}：</b> {msg.content}
          </div>
        ))}
        {loading && <div>{settings.name}が考え中…</div>}
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="メッセージを入力..."
        style={{ width: '70%' }}
      />
      <button onClick={handleSend} style={{ marginLeft: '10px' }}>送信</button>
    </div>
  );
}
