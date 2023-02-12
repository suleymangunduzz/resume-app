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
