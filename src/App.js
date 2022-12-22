import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import Coin from "./Coin";

function App() {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
      )
      .then((res) => {
        setCoins(res.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const filteredCoins = coins.filter((coin) =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="coin-app">
      <div className="coin-search">
        <h11 className="coin-text">Search a currency</h11>
        <form>
          <input
            type="text"
            placeholder="Search"
            className="coin-inpu"
            onChange={handleChange}
          />
        </form>
      </div>
      {filteredCoins.map(
        ({
          id,
          name,
          image,
          symbol,
          market_cap,
          current_price,
          price_change_percentage_24h,
          total_volume,
        }) => {
          return (
            <Coin
              key={id}
              name={name}
              image={image}
              symbol={symbol}
              marketcap={market_cap}
              price={current_price}
              priceChange={price_change_percentage_24h}
              volume={total_volume}
            />
          );
        }
      )}
    </div>
  );
}

export default App;
