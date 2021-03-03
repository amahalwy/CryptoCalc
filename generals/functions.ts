import { fetchPrice } from "../pages/api/FetchPrice";

export const renderMarketChange = (coin) => {
  const val = coin.market_data.price_change_24h.toFixed(2);
  return val > 0 ? `+${numberWithCommas(val)}` : `${numberWithCommas(val)}`;
};

export const renderChangeColor = (coin) => {
  return coin.market_data.price_change_24h > 0 ? "green" : "red";
};

export const findInList = (watchlist, coin) => {
  return watchlist.find((item) => item.id === coin.id);
};

export const numberWithCommas = (x) => {
  if (x >= 1) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  } else {
    return x;
  }
};

export const getTimeRemaining = (endtime) => {
  const total = Date.parse(endtime) - Date.parse(new Date());
  const seconds = Math.floor((total / 1000) % 60);
  const minutes = Math.floor((total / 1000 / 60) % 60);
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
  const days = Math.floor(total / (1000 * 60 * 60 * 24));

  return {
    days,
    hours,
    minutes,
    seconds,
  };
};

export const initializePrices = (coins: any[]) => {
  const clone = [];
  coins.map(async (coin, i) => {
    await fetchPrice(coin.name.toLowerCase()).then((res) => clone.push(res));
  });
  return clone;
};
