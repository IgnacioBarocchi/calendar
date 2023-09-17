export default function mapRange(start, end, callback) {
  return [...Array(end + 1).keys()]
    .filter((value) => end >= value && start <= value)
    .map(callback);
}
