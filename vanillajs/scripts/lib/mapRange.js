export default function mapRange(start, end, callback) {
  return [...Array(end).keys()]
    .filter((value) => end >= value && start <= value)
    .map(callback);
}
