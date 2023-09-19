export default function mapRange(start:number, end:number, callback:()=>void): any[] {
  return [...Array(end).keys()]
    .filter((value) => end >= value && start <= value)
    .map(callback);
}
