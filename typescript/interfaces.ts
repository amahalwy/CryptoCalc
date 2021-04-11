import { FormApi } from "final-form";

// Types
export interface User {
  id: string;
  name: string;
  otp?: string;
}
export interface Coin {
  id: string;
  quantity: number;
  name: string;
  listId: string;
  image?: {
    thumb?: string;
    small?: string;
    large?: string;
  };
  market_data?: {
    current_price?: {
      usd?: number;
    };
    atl: {
      usd?: number;
    };
    low_24h: {
      usd?: number;
    };
    high_24h: {
      usd?: number;
    };
    ath: {
      usd?: number;
    };
  };
}
export interface List {
  id: string;
  userId: string;
  active: boolean;
  startDate: string;
  endDate: string;
  total: number;
  currentTotal?: number;
  endTotal?: number;
  owner?: User;
  coins?: Coin[];
  percentChange?: number;
}

export interface ListCoinProps {
  coin: Coin;
  form: FormApi<any, Partial<any>>;
  watchlist: Coin[];
  setWatchlist: (coins: Coin[]) => void;
}
export interface LeaderBoardsProps {
  topLists: List[];
}
export interface LeaderBoardItemProps {
  list: List;
  pos: number;
  activeItem: number;
  setActiveItem: (pos: number) => any;
}
export interface DrawerProps {
  list: List;
}
export interface SearchFormProps {
  setCoin: (coin: any[]) => void;
}
export interface WatchlistProps {
  watchlist: Coin[];
  total: number;
  calculatingTotal: boolean;
  setTotal: (total: number) => void;
  setWatchlist: (coins: Coin[]) => void;
  setCalculatingTotal: (value: boolean) => void;
}
export interface SearchCoinProps {
  coin: Coin;
  watchlist: Coin[];
  setWatchlist: (list: Coin[]) => any;
}
export interface CountdownProps {
  timerComponents: any[];
}
export interface Timeleft {
  total: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}
export interface TimerComponentProps {
  timeLeft: Timeleft;
  interval: string | number;
}

export interface SearchProps {
  data: object | any;
  pristine: boolean;
  form: object | any;
}
interface StatusReponse {
  status?: number;
  id?: string;
  userId?: string;
  active?: boolean;
  startDate?: string;
  endDate?: string;
  total?: number;
  currentTotal?: number;
  endTotal?: number;
  name?: string;
  otp?: string;
  coins?: Coin[];
  percentChange?: number;
}
export interface ShowStatusProps {
  state: {
    loading?: boolean;
    error?: Error;
    value?: StatusReponse;
    code?: string;
    status?: number;
  };
}
export interface PortfolioCoinProps {
  coin: object | any;
  update: string | number;
  setUpdate: (value: number) => void;
}
export interface PortfolioListProps {
  active: boolean;
  coins: Coin[];
}
export interface PortfolioTotalProps {
  list: any;
  active: boolean;
  coins: Coin[];
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
export interface FeatureProps {
  title: string;
  desc: string;
  desc2: string;
  onClick: () => void;
}

// Context
export interface Context {
  loading?: boolean;
  setLoading?: (loading: boolean) => any;
}
