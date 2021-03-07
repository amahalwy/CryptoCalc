import { Coin } from "./interfaces";

export interface WatchlistProps {
  watchlist: [];
  total: number;
  calculatingTotal: boolean;
  setTotal: (t) => void;
  setWatchlist: (w) => void;
  setCalculatingTotal: (t) => void;
}

export interface SubmitData {
  name: string;
  coins: Coin[];
  active: boolean;
}
