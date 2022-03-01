export default function jsonParser<T = any>(str: string): T | {} {
  try {
    return JSON.parse(str);
  } catch (e) {
    return {};
  }
}
