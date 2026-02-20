export interface Supporter {
  name: string;
  message?: string;
  coffees: number;
  date: string;
}

// Manual list for now. When ready, swap to a server-side BMC API fetch
// (GET https://developers.buymeacoffee.com/api/v1/supporters)
// without changing the UI — just replace this array with the API response.
export const SUPPORTERS: Supporter[] = [
  {
    name: "Carl",
    coffees: 1,
    date: "2026-02-19",
    message: "Well Done",
  },
];

export function getTotalCoffees(): number {
  return SUPPORTERS.reduce((sum, s) => sum + s.coffees, 0);
}
