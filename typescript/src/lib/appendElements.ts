export default (children: HTMLElement[], parent: HTMLElement) => {
  children.map((c) => parent.appendChild(c));
  return parent;
};
