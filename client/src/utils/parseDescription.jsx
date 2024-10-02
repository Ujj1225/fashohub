const parseDescription = (description) => {
  const lines = description.split("\n");
  const elements = [];

  lines.forEach((line, index) => {
    if (line.startsWith("#")) {
      elements.push(
        <div key={index} className="text-sm font-bold mt-3">
          {line.substring(1).trim().toUpperCase()}
        </div>
      );
    } else if (line.startsWith("-")) {
      elements.push(
        <ul key={index} className="list-disc px-6 font-light">
          <li>{line.substring(2).trim()}</li>
        </ul>
      );
    } else {
      elements.push(
        <p key={index} className="text-base font-light">
          {line}
        </p>
      );
    }
  });

  return elements;
};
export default parseDescription;
