import { Exception } from 'exceptions';

export const getDomainName = (email: string): string => {
  try {
    return email.split('@')[1] as string;
  } catch (e) {
    throw new Exception('Invalid email');
  }
};

export const isValid = (email: string): boolean => {
  try {
    const domain = getDomainName(email);
    return (
      email.includes('@') &&
      email.includes('.') &&
      domain.length > 2 &&
      domain.length < 50 &&
      domain.includes('.')
    );
  } catch (e) {
    return false;
  }
};

export const removeDot = (email: string): string => {
  if (!isValid(email)) throw new Exception('Invalid email');

  const [body, domain] = email.split('@') as [string, string];
  return `${body.toLowerCase().replaceAll(/\./g, '')}@${domain}`;
};
