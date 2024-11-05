// App.js
import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
    const [numbers, setNumbers] = useState([]);

    useEffect(() => {
        async function fetchNumbers() {
            try {
                const response = await fetch('https://oxhgmmkrpl.execute-api.ap-northeast-1.amazonaws.com/prod/randomnumbers');
                const data = await response.json();
                console.log("Fetched data:", data);  // デバッグ用

                // bodyフィールドが文字列として返されているため、JSONにパースする
                const items = JSON.parse(data.body);  
                setNumbers(items);
            } catch (error) {
                console.error("Error fetching random numbers:", error);
                // エラーが発生した場合にダミーデータを設定
                setNumbers([
                    { Timestamp: '2024-11-05T12:00:00Z', RandomValue: 12345 },
                    { Timestamp: '2024-11-05T12:01:00Z', RandomValue: 67890 },
                ]);
            }
        }

        fetchNumbers();
    }, []);

    return (
        <div className="App">
            <h1>生成された乱数</h1>
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
