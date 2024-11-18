import React, { useState, useEffect } from "react";
import UpscaledImage from "./UpscaledImage";
import "./css/ModSelector.css";

function ModSelector({ mods, weaponId, onSelect }) {
  const [modsByType, setModsByType] = useState({});
  const [modTypes, setModTypes] = useState([]);
  const [activeTab, setActiveTab] = useState("");

  // Group mods by type and filter by weapon compatibility
  useEffect(() => {
    const newModsByType = {};
    Object.keys(mods).forEach((modKey) => {
      const mod = mods[modKey];

      // Check if mod is compatible with the selected weapon or available for all weapons
      const isCompatible =
        mod.weapon_mod.weapon_all ||
        (Array.isArray(mod.weapon_mod.weapon_id)
          ? mod.weapon_mod.weapon_id.includes(weaponId)
          : mod.weapon_mod.weapon_id === weaponId);

      if (isCompatible) {
        const modType = mod.weapon_mod.type.toLowerCase();
        if (!newModsByType[modType]) {
          newModsByType[modType] = [];
        }
        newModsByType[modType].push({ ...mod, key: modKey });
      }
    });

    const types = Object.keys(newModsByType);
    setModsByType(newModsByType);
    setModTypes(types);
    setActiveTab(types[0] || ""); // Set initial active tab based on the new mod types
  }, [mods, weaponId]);

  return (
    <div className="mod-selector">
      <h3>Select Mod</h3>

      {/* Tab Navigation */}
      <div className="tabs">
        {modTypes.map((type) => (
          <button
            key={type}
            className={`tab-button ${activeTab === type ? "active" : ""}`}
            onClick={() => setActiveTab(type)}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
      </div>

      {/* Mod Table for Active Tab */}
      {activeTab && modsByType[activeTab] && (
        <div className="mod-table">
          <table>
            <thead>
              <tr>
                <th>Icon</th>
                <th>Name</th>
                <th>Recoil</th>
                <th>Ergonomics</th>
                <th>Damage</th>
                {activeTab === "magazine" && (
                  <>
                    <th>Magazine Size</th>
                    <th>Reload Speed</th>
                  </>
                )}
                {activeTab === "scope" && (
                  <>
                    <th>Extend View</th>
                    <th>Effective Range Multiplier</th>
                  </>
                )}
                {activeTab === "handguard" && <th>Attachments</th>}
                {activeTab === "silencer" && <th>Silencer Sound</th>}
              </tr>
            </thead>
            <tbody>
              {modsByType[activeTab].map((mod) => (
                <tr key={mod.key} onClick={() => onSelect(mod)}>
                  <td>
                    <UpscaledImage
                      src={`/assets/sprites/${mod.basic.sprite_inv}_0.png`}
                      alt={mod.basic.name}
                      className="mod-icon"
                      scale={4}
                    />
                  </td>
                  <td>{mod.basic.name}</td>
                  <td>{mod.weapon_mod.recoil || "-"}</td>
                  <td>{mod.weapon_mod.ergo || "-"}</td>
                  <td>{mod.weapon_mod.damage || "-"}</td>
                  {activeTab === "magazine" && (
                    <>
                      <td>{mod.weapon_mod.magazine_size || "-"}</td>
                      <td>{mod.weapon_mod.reload_speed || "-"}</td>
                    </>
                  )}
                  {activeTab === "scope" && (
                    <>
                      <td>{mod.weapon_mod.scope_extend_view || "-"}</td>
                      <td>{mod.weapon_mod.scope_mult_eff_range || "-"}</td>
                    </>
                  )}
                  {activeTab === "handguard" && (
                    <td>{Object.keys(mod.weapon_mod.handguard || {}).length}</td>
                  )}
                  {activeTab === "silencer" && <td>{mod.weapon_mod.silencer_sound || "-"}</td>}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default ModSelector;
