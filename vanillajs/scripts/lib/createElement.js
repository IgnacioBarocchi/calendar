const createElement = (tagName, options) => {
  const element = document.createElement(tagName);
  const { className, innerHTML } = options || {};
  if (innerHTML) {
    element.innerHTML = innerHTML.trim();
    return element;
  }

  if (className) {
    element.classList.add("days-of-week");
  }

  return element;
};

const createElement2 = (html) => {
  // const node = document.createRange().createContextualFragment(html);
  // return node;
  const node = new DOMParser().parseFromString(html, "text/html").body
    .firstElementChild;
  return node;
};
