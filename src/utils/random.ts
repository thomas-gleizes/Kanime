export default function random(min: number, max: number) {
  return Math.floor(Math.random() * (max + 1 - min) + min)
}
