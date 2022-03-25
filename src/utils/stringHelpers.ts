export function trim(str: string): string {
  return str.replace(/^\s+|\s+$/g, '');
}

export function trimStart(str: string): string {
  return str.replace(/^\s+/, '');
}

export function trimEnd(str: string): string {
  return str.replace(/\s+$/, '');
}

export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function camelCase(str: string): string {
  return str
    .replace(/\s(.)/g, function ($1) {
      return $1.toUpperCase();
    })
    .replace(/\s/g, '');
}
