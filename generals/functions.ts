import { fetchCoin } from "../util/coins/fetchCoin";
import { Coin } from "../typescript/interfaces";

export const renderMarketChange = (coin: Coin) => {
  const val = Number(coin.market_data.price_change_24h.toFixed(2));
  return val > 0 ? `+${numberWithCommas(val)}` : `${numberWithCommas(val)}`;
};

export const renderChangeColor = (coin: Coin) => {
  return coin.market_data.price_change_24h > 0 ? "green" : "red";
};

export const renderChangePercent = (value: number) => {
  return value < 0.0 ? "red" : "green";
};

export const findInList = (watchlist: Coin[], coin: Coin) => {
  const result = watchlist.find((item) => item.id === coin.id);
  if (!result) return false;
  return true;
};

export const numberWithCommas = (x: number) => {
  if (!x) return null;
  if (x >= 1) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  } else if (x < 0.99 && x > 0) {
    return x.toFixed(4);
  } else if (x <= 0) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
};

export const getTimeRemaining = (endtime: string) => {
  const total = Date.parse(endtime) - Date.parse(new Date().toString());
  const seconds = Math.floor((total / 1000) % 60);
  const minutes = Math.floor((total / 1000 / 60) % 60);
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
  const days = Math.floor(total / (1000 * 60 * 60 * 24));

  return {
    total,
    days,
    hours,
    minutes,
    seconds,
  };
};

export const initializePrices = async (coins: Coin[]) => {
  const newCoins = coins.map(async (coin) => {
    const tempQuant = coin.quantity;
    return fetchCoin(coin.name.toLowerCase()).then((res: Coin) => {
      res["quantity"] = tempQuant;
      return res;
    });
  });
  return Promise.all(newCoins);
};

export const capitalize = (str: string) => {
  return str
    .split(" ")
    .map((s) => {
      return s.charAt(0).toUpperCase() + s.substr(1);
    })
    .join(" ");
};
