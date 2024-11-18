// Tabs.js
import React, { useState } from "react";
import ModTable from "./ModTable";
import "./ModSelector.css";

const Tabs = ({ modData }) => {
  const modTypes = Object.keys(modData); // e.g., ['Grip', 'Magazine', 'Handguard', etc.]
  const [activeTab, setActiveTab] = useState(modTypes[0]);

  return (
    <div className="tabs-container">
      <div className="tabs">
        {modTypes.map((type) => (
          <button
            key={type}
            className={`tab-button ${activeTab === type ? "active" : ""}`}
            onClick={() => setActiveTab(type)}
          >
            {type}
          </button>
        ))}
      </div>
      <ModTable modItems={modData[activeTab]} />
    </div>
  );
};

export default Tabs;
