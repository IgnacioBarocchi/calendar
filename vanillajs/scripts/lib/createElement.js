const createElement = (tagName, options) => {
  const element = document.createElement(tagName);
  const { className } = options;
  if (className) {
    element.classList.add("days-of-week");
  }

  return element;
};
