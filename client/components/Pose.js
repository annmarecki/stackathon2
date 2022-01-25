import React from "react";

const Pose = (props) => {
  const mostMatched = props.data[0];
  const allLabels = props.data.map((elem) => elem.label);
  const sortedLabels = allLabels.sort((a, b) => a.localeCompare(b));
  return (
    <>
      <ul className="pose">
        {sortedLabels.map((label) => (
          <li key={label}>
            <span>
              <p className="name">{mostMatched.label}</p>
            </span>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Pose;
