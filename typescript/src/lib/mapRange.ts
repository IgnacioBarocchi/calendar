export default function mapRange(
  start: number,
  end: number,
  callback: (value: number) => void,
): any[] {
  return [...Array(end).keys()]
    .filter((value) => end >= value && start <= value)
    .map(callback);
}
