export default function jsonParser<T = any>(str: string): T | null {
  try {
    return JSON.parse(str)
  } catch (e) {
    return null
  }
}
