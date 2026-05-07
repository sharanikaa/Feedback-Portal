import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [reason, setReason] = useState("");
  
  const task = {
    prompt: "Write a short tagline for a new AI startup.",
    resA: "Empowering the future with intelligent data solutions.",
    resB: "Smart AI for a smarter tomorrow. Bridging the gap today."
  };

  const submitVote = (winner) => {
    // Connects to your server.js running on port 5000
    axios.post('http://localhost:5000/api/submit-vote', {
      prompt: task.prompt,
      responseA: task.resA,
      responseB: task.resB,
      winner: winner,
      reason: reason
    })
    .then(() => {
      alert(`Successfully submitted! You voted for: ${winner}`);
      setReason(""); 
    })
    .catch(err => {
      console.error(err);
      alert("Error: Make sure your terminal running 'node server.js' is still open!");
    });
  };

  return (
    <div style={{ padding: '40px', fontFamily: 'Arial, sans-serif', maxWidth: '800px', margin: '0 auto' }}>
      <header style={{ borderBottom: '2px solid #2563eb', marginBottom: '20px' }}>
        <h1 style={{ color: '#2563eb' }}>Ethara AI Assessment | RLHF Portal</h1>
        <p>Candidate: Software Engineer Round 1</p>
      </header>

      <div style={{ background: '#f1f5f9', padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
        <strong>Prompt:</strong> 
        <p>{task.prompt}</p>
      </div>

      <div style={{ display: 'flex', gap: '20px' }}>
        <div style={cardStyle}>
          <h3>Response A</h3>
          <p>{task.resA}</p>
          <button onClick={() => submitVote('Response A')} style={buttonStyle}>A is Better</button>
        </div>

        <div style={cardStyle}>
          <h3>Response B</h3>
          <p>{task.resB}</p>
          <button onClick={() => submitVote('Response B')} style={buttonStyle}>B is Better</button>
        </div>
      </div>

      <div style={{ marginTop: '30px' }}>
        <textarea 
          style={{ width: '100%', height: '100px', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
          placeholder="Explain your reasoning (optional)..."
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />
        <br />
        <button onClick={() => submitVote('Tie')} style={{ ...buttonStyle, backgroundColor: '#64748b', marginTop: '10px' }}>
          Mark as Tie
        </button>
      </div>
    </div>
  );
}

const cardStyle = { flex: 1, padding: '20px', border: '1px solid #e2e8f0', borderRadius: '10px', textAlign: 'center', backgroundColor: '#fff' };
const buttonStyle = { backgroundColor: '#2563eb', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' };

export default App;