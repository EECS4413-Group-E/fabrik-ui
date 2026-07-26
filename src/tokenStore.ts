type Listener = (token: string | null) => void;

let currentToken: string | null = null;
const listeners = new Set<Listener>();

export const tokenStore = {
  peek: () => currentToken,
  set: (token: string | null) => {
    currentToken = token;
    listeners.forEach((l) => l(token));
  },
  subscribe: (listener: Listener) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },
};
