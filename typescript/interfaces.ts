export interface User {
  id: string;
  name: string;
  otp: string;
}

export interface Coin {
  id: number;
  quantity: number;
  name: string;
  listId: string;
}

export interface List {
  id: string;
  userId: string;
  active: boolean;
  startDate: string;
  endDate: string;
  owner: User;
  coins: Coin[];
  total: number;
}

export interface ListCoinProps {
  coin: object | any;
  form: any;
  watchlist: [];
  setWatchlist: (w) => void;
}

export interface SearchFormProps {
  setCoin: (coin: any[]) => void;
}

export interface WatchlistProps {
  watchlist: [];
  total: number;
  calculatingTotal: boolean;
  setTotal: (total: number) => void;
  setWatchlist: (list) => void;
  setCalculatingTotal: (value: boolean) => void;
}

export interface SearchCoinProps {
  coin: object | any;
  watchlist: any[];
  setWatchlist: (list) => void;
}

export interface CountdownProps {
  timerComponents: any[];
}

export interface timeleft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export interface TimerComponentProps {
  timeLeft: timeleft;
  interval: string | number;
}

export interface PortfolioCoinProps {
  coin: object | any;
  update: string | number;
  setUpdate: (value: number) => void;
}

export interface PortfolioListProps {
  coins: any[];
}

export interface PortfolioTotalProps {
  coins: any[];
  startingTotal: number;
}

export interface RunningTotalProps {
  total: number;
  calculatingTotal: boolean;
}

export interface SaveListBottomProps {
  data: object | any;
  total: number;
}

export interface SubmitData {
  name: string;
  coins: Coin[];
  active: boolean;
}
