// App.js
import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
    const [numbers, setNumbers] = useState([]);
    const [loading, setLoading] = useState(false);

    const apiEndpoint = 'https://<api-id>.execute-api.<リージョン>.amazonaws.com/prod/generate';

    const handleGenerateRandomNumber = async () => {
        setLoading(true);
        try {
            const response = await fetch(apiEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                console.log('Random number generation triggered successfully.');
            } else {
                console.error('Failed to trigger random number generation.');
            }
        } catch (error) {
            console.error('Error:', error);
        }
        setLoading(false);
    };

    return (
        <div className="App">
            <h1>生成された乱数（最新10件）</h1>
            <button onClick={handleGenerateRandomNumber} disabled={loading}>
                {loading ? "生成中..." : "乱数を生成"}
            </button>
            {/* 最新10件のデータを表示する */}
        </div>
    );
}

export default App;
