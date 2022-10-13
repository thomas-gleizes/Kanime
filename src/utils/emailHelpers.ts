import { Exception } from 'exceptions';

export const getDomainName = (email: string): string => {
  if (isValid(email)) return email.split('@')[1] as string;

  throw new Exception('Invalid email');
};

export const isValid = (email: string): boolean => {
  const domain = getDomainName(email);
  return (
    email.includes('@') &&
    email.includes('.') &&
    domain.length > 2 &&
    domain.length < 50 &&
    domain.includes('.')
  );
};

export const removeDot = (email: string): string => {
  if (!isValid(email)) throw new Exception('Invalid email');

  const [body, domain] = email.split('@') as [string, string];
  return `${body.toLowerCase().replaceAll(/\./g, '')}@${domain}`;
};
