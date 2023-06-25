// TODO: what is this file :D ? Refactor these parts, make it more understandable.
function getLink(curr) {
  return curr.includes('.com')
    ? `<a href="https://${curr}" target="blank">${curr}</a>`
    : curr;
}

export default function Text({ children }) {
  let __html = children
    .split(' ')
    .reduce((prev, curr) => prev + ' ' + getLink(curr), '');

  return <p dangerouslySetInnerHTML={{ __html }} />;
}
