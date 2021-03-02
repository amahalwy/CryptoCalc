import { fetchCoins } from "../pages/api/FetchAllCoins";

export const required = (value) => (value ? undefined : "Required");
export const filterCurrency = (value) => {
  const coins = fetchCoins()
    .then((response) => response.json())
    .then((res) => res);
};
