export {};

declare global {
  interface Window {
    _env_: {
      GATEWAY_URL: string;
    };
  }
}