interface JWTHeader {
  alg: string;
  typ?: string;
  [key: string]: unknown;
}

interface JWTPayload {
  sub?: string;
  email?: string;
  role?: string;
  iat?: number;
  exp?: number;
}

interface DecodedJWT<T = JWTPayload> {
  header: JWTHeader;
  payload: T;
  signature: string;
}

export function parseJWT<T = JWTPayload>(token: string): DecodedJWT<T> {
  if (typeof token !== 'string') {
    throw new Error('Token must be a string');
  }

  const parts = token.split('.');
  if (parts.length !== 3) {
    throw new Error('Invalid JWT: expected 3 parts (header.payload.signature)');
  }

  const [headerB64, payloadB64, signature] = parts;

  const header = JSON.parse(decodeBase64Url(headerB64)) as JWTHeader;
  const payload = JSON.parse(decodeBase64Url(payloadB64)) as T;

  return { header, payload, signature };
}

function decodeBase64Url(str: string): string {
  // Convert base64url -> base64
  let base64 = str.replace(/-/g, '+').replace(/_/g, '/');

  // Pad with '=' to make length a multiple of 4
  const padLength = base64.length % 4;
  if (padLength) {
    base64 += '='.repeat(4 - padLength);
  }

  return decodeURIComponent(
    atob(base64)
      .split('')
      .map((c) => '%' + c.charCodeAt(0).toString(16).padStart(2, '0'))
      .join(''),
  );
}
