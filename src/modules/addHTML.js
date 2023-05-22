const divContent = document.querySelector('.content')

export function addHTML(tagName, content) {
    var element = document.createElement(tagName);
    element.innerHTML = content;
    divContent.appendChild(element);
}