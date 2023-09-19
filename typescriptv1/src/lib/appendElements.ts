export default (children, parent) => {
  children.map((c) => parent.appendChild(c));
  return parent;
};
