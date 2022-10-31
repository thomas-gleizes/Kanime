export default function timeout(callback: () => any, time: number = 1000): () => void {
  return () => setTimeout(callback, time)
}
