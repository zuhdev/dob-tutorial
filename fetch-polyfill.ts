if (typeof globalThis !== "undefined" && typeof globalThis.fetch === "function") {
  const nativeFetch = globalThis.fetch;
  const safeFetch = (...args: Parameters<typeof fetch>) => nativeFetch.apply(globalThis, args);
  (globalThis as any).fetch = safeFetch;
  if (typeof window !== "undefined") {
    (window as any).fetch = safeFetch;
  }
}
