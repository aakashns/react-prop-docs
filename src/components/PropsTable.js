import React from "react";
import parsePropTypes from "../util/parsePropTypes";

const show = x => {
  if (x === undefined || x === null) {
    return "";
  } else if (typeof x === "function") {
    return "func";
  } else {
    return JSON.stringify(x);
  }
};

const PropsTable = ({ component }) => {
  const parsed = parsePropTypes(component);
  return (
    <table className="table table-striped table-bordered">
      <thead>
        <tr>
          <th>Prop Name</th>
          <th>Prop type</th>
          <th>Required</th>
          <th>Default Value</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        {Object.keys(parsed).map(p => (
          <tr key={p}>
            <td>
              <code>{p}</code>
            </td>
            <td>
              <code>{parsed[p].type.name}</code>
            </td>
            <td>{parsed[p].required ? "Yes" : "No"}</td>
            <td>
              <code>{show((parsed[p].defaultValue || {}).value)}</code>
            </td>
            <td>{parsed[p].description}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default PropsTable;
