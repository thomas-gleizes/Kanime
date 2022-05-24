export const getDomainName = (email: string): string => {
  return email.split('@')[1];
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
  const [body, domain] = email.split('@');
  return `${body.toLowerCase().replaceAll(/\./g, '')}@${domain}`;
};
