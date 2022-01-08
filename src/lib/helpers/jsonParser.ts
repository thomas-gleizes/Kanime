export default function (str: string) {
  try {
    return JSON.parse(str);
  } catch (e) {
    return {};
  }
}
