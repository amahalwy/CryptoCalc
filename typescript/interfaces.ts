export interface ListCoinProps {
  coin: any | object;
  form: any;
  watchlist: [];
  setWatchlist: (w) => void;
}

export interface SearchFormProps {
  setCoin: (c) => void;
}

export interface WatchlistProps {
  watchlist: [];
  setTotal: (t) => void;
  setWatchlist: (w) => void;
  setCalculatingTotal: (t) => void;
}
