import { fetchCoins } from "../pages/api/FetchAllCoins";
export const required = (value: string) => (value ? undefined : "Required");
