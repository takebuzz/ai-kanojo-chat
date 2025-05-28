import React, { useState } from 'react';

export default function Settings({ onSubmit }) {
  const [name, setName] = useState('');
  const [personality, setPersonality] = useState('ギャル系');
  const [appearance, setAppearance] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, personality, appearance });
  };

  return (
    <form onSubmit={handleSubmit} style={{ padding: '20px' }}>
      <h2>AI彼女をカスタムしよう</h2>

      <label>名前：</label>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} required /><br /><br />

      <label>性格：</label>
      <select value={personality} onChange={(e) => setPersonality(e.target.value)}>
        <option>ギャル系</option>
        <option>癒し系</option>
        <option>ツンデレ</option>
        <option>妹系</option>
        <option>姉系</option>
        <option>クール系</option>
        <option>萌え系</option>
        <option>ヤンデレ系</option>
        <option>幼馴染系</option>
        <option>委員長系</option>
        <option>セクシー系</option>
        <option>ボーイッシュ系</option>
        <option>小悪魔系</option>
        <option>厨二病系</option>
      </select><br /><br />

      <label>見た目のイメージ：</label>
      <input type="text" value={appearance} onChange={(e) => setAppearance(e.target.value)} /><br /><br />

      <button type="submit">彼女を生成する</button>
    </form>
  );
}
