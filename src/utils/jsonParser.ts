export default function jsonParser(str: string) {
  try {
    return JSON.parse(str);
  } catch (e) {
    return {};
  }
}
