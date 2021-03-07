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
  total: number;
  calculatingTotal: boolean;
  setTotal: (t) => void;
  setWatchlist: (w) => void;
  setCalculatingTotal: (t) => void;
}

export interface Coin {
  id: number;
  quantity: number;
  name: string;
  listId: string;
}
