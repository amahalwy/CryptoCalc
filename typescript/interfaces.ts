export interface ListCoinProps {
  coin: any | object;
  form: any;
  watchlist: [];
  setWatchlist: (w) => void;
}

export interface SearchFormProps {
  setCoin: (c) => void;
}
