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

export function kebabCase(str: string): string {
  return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}

export function snakeCase(str: string): string {
  return str.replace(/([a-z])([A-Z])/g, '$1_$2').toLowerCase();
}

export function isEmpty(str: string): boolean {
  return str.length === 0;
}

export function isNotEmpty(str: string): boolean {
  return str.length > 0;
}

export function isBlank(str: string): boolean {
  return str.trim().length === 0;
}

export function isNotBlank(str: string): boolean {
  return str.trim().length > 0;
}

export function isNullOrEmpty(str: string): boolean {
  return str === null || str === '';
}

export function isNullOrBlank(str: string): boolean {
  return str === null || str.trim().length === 0;
}

export function replaceCamelCaseWithSpace(str: string): string {
  return capitalize(
    str
      .replace(/([a-z])([A-Z])/g, '$1 $2')
      .split(' ')
      .map((word) => word.toLowerCase())
      .join(' ')
  );
}
