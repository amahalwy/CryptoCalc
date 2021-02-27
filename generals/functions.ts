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
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
