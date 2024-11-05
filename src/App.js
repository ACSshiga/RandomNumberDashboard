// App.js
import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
    const [numbers, setNumbers] = useState([]);
    const [loading, setLoading] = useState(false);

    // DynamoDBから最新の10件のデータを取得する関数
    const fetchNumbers = async () => {
        try {
            const response = await fetch('https://oxhgmmkrpl.execute-api.ap-northeast-1.amazonaws.com/prod/randomnumbers');
            const data = await response.json();
            const items = JSON.parse(data.body);  // APIからのレスポンスをJSONに変換
            setNumbers(items);  // 最新のデータを状態に設定
        } catch (error) {
            console.error("Error fetching random numbers:", error);
        }
    };

    // ボタンを押すと乱数生成リクエストを送信
    const handleGenerateRandomNumber = async () => {
        setLoading(true);
        try {
            await fetch('https://oxhgmmkrpl.execute-api.ap-northeast-1.amazonaws.com/prod/generateRandomNumber', {
                method: 'POST',
            });
            // 乱数が生成された後にデータを取得して画面を更新
            fetchNumbers();
        } catch (error) {
            console.error("Error generating random number:", error);
        } finally {
            setLoading(false);
        }
    };

    // 初期表示でDynamoDBのデータを取得
    useEffect(() => {
        fetchNumbers();
    }, []);

    return (
        <div className="App">
            <h1>生成された乱数（最新10件）</h1>
            <button onClick={handleGenerateRandomNumber} disabled={loading}>
                {loading ? '生成中...' : '乱数を生成'}
            </button>
            <ul>
                {numbers.map((item, index) => (
                    <li key={index}>
                        Timestamp: {item.Timestamp}, Value: {parseFloat(item.RandomValue)}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;