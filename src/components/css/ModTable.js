// ModTable.js
import React from "react";
import "./ModSelector.css";

const ModTable = ({ modItems }) => {
  return (
    <table className="mod-table">
      <thead>
        <tr>
          <th>Icon</th>
          <th>Name</th>
          <th>Recoil</th>
          <th>Ergonomics</th>
          <th>Foregrip</th>
          <th>Attachments</th>
        </tr>
      </thead>
      <tbody>
        {modItems.map((mod) => (
          <tr key={mod.name}>
            <td>
              <img src={`/assets/sprites/${mod.icon}`} alt={mod.name} className="mod-icon" />
            </td>
            <td>{mod.name}</td>
            <td>{mod.recoil || "-"}</td>
            <td>{mod.ergonomics || "-"}</td>
            <td>{mod.foregrip ? "Yes" : "No"}</td>
            <td>{mod.attachments || "-"}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ModTable;
