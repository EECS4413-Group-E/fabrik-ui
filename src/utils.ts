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

type CardType = 'Visa' | 'Mastercard' | 'Amex' | 'Unknown';

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

export const detectCardType = (num: string): CardType => {
  if (/^4/.test(num)) return 'Visa';
  if (/^5[1-5]|^2[2-7]/.test(num)) return 'Mastercard';
  if (/^3/.test(num)) return 'Amex';
  return 'Unknown';
};

export const validateLuhn = (num: string): boolean => {
  let sum = 0;
  let shouldDouble = false;

  for (let i = num.length - 1; i >= 0; i--) {
    let digit = parseInt(num.charAt(i), 10);

    if (shouldDouble) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }

    sum += digit;
    shouldDouble = !shouldDouble;
  }

  return sum % 10 === 0;
};

export const formatCardNumber = (value: string): { formatted: string; type: CardType } => {
  const raw = value.replace(/\D/g, '');
  const type = detectCardType(raw);
  const maxLength = type === 'Amex' ? 15 : 16;
  const trimmed = raw.substring(0, maxLength);

  if (type === 'Amex') {
    const match = trimmed.match(/^(\d{1,4})(\d{0,6})(\d{0,5})$/);
    if (!match) return { formatted: trimmed, type };
    return {
      formatted: [match[1], match[2], match[3]].filter(Boolean).join(' '),
      type,
    };
  }

  return {
    formatted: trimmed.match(/.{1,4}/g)?.join(' ') || '',
    type,
  };
};

export const formatExpiryDate = (value: string): string => {
  // Remove all non-digits
  const raw = value.replace(/\D/g, '');
  const trimmed = raw.substring(0, 4);

  // Only add the slash when we have more than 2 digits (3 or 4)
  if (trimmed.length > 2) {
    let month = trimmed.substring(0, 2);
    const year = trimmed.substring(2);

    // Enforce valid month bounds [01 - 12]
    const monthNum = parseInt(month, 10);
    if (monthNum > 12) month = '12';
    if (monthNum === 0) month = '01';

    return `${month}/${year}`;
  }

  // Return just the numbers (1 or 2 digits) without a slash
  return trimmed;
};
