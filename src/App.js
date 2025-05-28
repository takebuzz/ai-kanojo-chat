import React, { useState } from 'react';
import Chat from './components/Chat';
import Settings from './components/Settings';

export default function App() {
  const [settings, setSettings] = useState(null);

  return (
    <div>
      {!settings ? (
        <Settings onSubmit={setSettings} />
      ) : (
        <Chat settings={settings} />
      )}
    </div>
  );
}
