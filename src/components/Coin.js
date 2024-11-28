import { useEffect, useState } from "react";

function Coin() {
    const [loading, setLoading] = useState(true);
    const [coins, setCoins] = useState([]);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchData = async () => { 
            try { const response = await fetch('https://api.coinpaprika.com/v1/tickers'); 
                if (!response.ok) { 
                    throw new Error('Network response was not ok'); 
                } 
                const result = await response.json(); 
                setCoins(result); 
            } catch (error) { 
                //alert('test');
                setError(error); 
                setLoading(true);
            } finally { 
                setLoading(false); 
            }
        };
        fetchData();
    },[]);
    return (
        <div>
            <h1>The Coins!!!{loading ? "" : `(${coins.length})`}</h1>
            {loading ? <strong>Loading...</strong> : 
                <select>
                    {coins.map((coin) => <option>{coin.name} ({coin.symbol}) : ${coin.quotes.USD.price}</option>)}    
                </select>
            }
            {error ? <strong>ERROR!!!</strong> : null}
        </div>
    );
}

export default Coin;