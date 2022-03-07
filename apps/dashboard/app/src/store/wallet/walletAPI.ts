// A mock function to mimic making an async request for data
export function fetchWallet() {
  return new Promise<{ data: string }>((resolve) =>
    setTimeout(() => resolve({ data: 'bar' }), 1000)
  );
}
