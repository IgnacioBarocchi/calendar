export default (html: string): HTMLElement => {
  const node = new DOMParser().parseFromString(html, 'text/html').body
    .firstElementChild as HTMLElement;
  return node;
};
