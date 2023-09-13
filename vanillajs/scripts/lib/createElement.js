const createElement = (tagName, options) => {
  const element = document.createElement(tagName);
  const { className, innerHTML } = options || {};
  if (innerHTML) {
    element.innerHTML = innerHTML.trim();
  }

  if (className) {
    element.classList.add(className);
  }

  return element;
};

const createElement2 = (html) => {
  const node = new DOMParser().parseFromString(html, "text/html").body
    .firstElementChild;
  return node;
};
