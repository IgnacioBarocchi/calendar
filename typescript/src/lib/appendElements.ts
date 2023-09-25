export default (children: HTMLElement[], parent: HTMLElement | Element) => {
  children.map((c) => parent.appendChild(c));
  return parent;
};
