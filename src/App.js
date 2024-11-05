// App.js
import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
    const [numbers, setNumbers] = useState([]);
    const [loading, setLoading] = useState(false);

    const generateApiEndpoint = 'https://ngob51gzc5.execute-api.ap-northeast-1.amazonaws.com/prod';
    const fetchApiEndpoint = 'https://oxhgmmkrpl.execute-api.ap-northeast-1.amazonaws.com/prod';    

    // 乱数生成のリクエストをAPIに送信する
    const handleGenerateRandomNumber = async () => {
        setLoading(true);
        try {
            const response = await fetch(generateApiEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                console.log('Random number generation triggered successfully.');
                // 新しいデータを取得
                fetchLatestNumbers();
            } else {
                console.error('Failed to trigger random number generation.');
            }
        } catch (error) {
            console.error('Error:', error);
        }
        setLoading(false);
    };

    // 最新の10件のデータを取得する関数
    const fetchLatestNumbers = async () => {
        try {
            const response = await fetch(fetchApiEndpoint);
            if (response.ok) {
                const data = await response.json();
                setNumbers(data); // データを状態に保存
            } else {
                console.error('Failed to fetch random numbers.');
            }
        } catch (error) {
            console.error('Error fetching random numbers:', error);
        }
    };

    // 初回レンダリング時に最新の10件を取得
    useEffect(() => {
        fetchLatestNumbers();
    }, []);

    return (
        <div className="App">
            <h1>生成された乱数（最新10件）</h1>
            <button onClick={handleGenerateRandomNumber} disabled={loading}>
                {loading ? "生成中..." : "乱数を生成"}
            </button>
            <ul>
                {numbers.map((item, index) => (
                    <li key={index}>Timestamp: {item.Timestamp}, Value: {item.RandomValue}</li>
                ))}
            </ul>
        </div>
    );
}

export default App;
