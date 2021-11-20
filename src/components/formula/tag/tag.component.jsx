import React from "react";

function CustomTag({ title, handleRemove }) {
  return (
    <li>
      <span>{title}</span>{" "}
      <span className="tag-close-icon" onClick={handleRemove}>
        x
      </span>
    </li>
  );
}

export default CustomTag;
