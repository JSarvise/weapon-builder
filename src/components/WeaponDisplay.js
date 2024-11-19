import React, { useState, useEffect } from "react";
import { loadWeaponData, loadModData } from "../utils/dataLoader";
import ModSelector from "./ModSelector";
import UpscaledImage from "./UpscaledImage"; // Import the new component
import "./css/WeaponDisplay.css";

function WeaponDisplay() {
  const [weapons, setWeapons] = useState([]);
  const [weaponTypes, setWeaponTypes] = useState([]);
  const [selectedType, setSelectedType] = useState("");
  const [selectedWeapon, setSelectedWeapon] = useState(null);
  const [mods, setMods] = useState(null);
  const [selectedMods, setSelectedMods] = useState({});

  useEffect(() => {
    async function fetchData() {
      const weaponData = await loadWeaponData();
      const modData = await loadModData();

      const weaponsByType = {};
      Object.keys(weaponData.data).forEach((key) => {
        const weapon = weaponData.data[key];
        const type = weapon.weapon?.type || "other";

        if (!weaponsByType[type]) {
          weaponsByType[type] = [];
        }

        if (weapon.weapon) {
          weaponsByType[type].push({ id: key, ...weapon });
        }
      });

      setWeapons(weaponsByType);
      setWeaponTypes(Object.keys(weaponsByType));
      setMods(modData.data);
    }
    fetchData();
  }, []);

  const handleTypeSelect = (event) => {
    setSelectedType(event.target.value);
    setSelectedWeapon(null);
  };

  const handleWeaponClick = (weapon) => {
    setSelectedWeapon(weapon);
    setSelectedMods({});
  };

  const handleSelectMod = (mod) => {
    const modType = mod.weapon_mod.type;
    setSelectedMods((prev) => ({
      ...prev,
      [modType]: prev[modType] ? null : mod,
    }));
  };

  if (!weaponTypes.length || !mods) return <p>Loading...</p>;

  return (
    <div className="weapon-builder">
      <h1>Weapon Builder</h1>

      {/* Weapon Type Selector */}
      <div>
        <label>Select Weapon Type:</label>
        <select onChange={handleTypeSelect} value={selectedType}>
          <option value="" disabled>
            Select a type
          </option>
          {weaponTypes.map((type) => (
            <option key={type} value={type}>
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {/* Weapon Sprite Grid */}
      {selectedType && (
        <div className="weapon-grid">
          {weapons[selectedType].map((weapon) => (
            <div
              key={weapon.id}
              className={`weapon-option ${selectedWeapon?.id === weapon.id ? "selected" : ""}`}
              onClick={() => handleWeaponClick(weapon)}
            >
              <UpscaledImage
                src={`assets/sprites/${weapon.basic.sprite_ingame}_0.png`}
                alt={weapon.basic.name}
                scale={4} // Adjust the scale factor as needed
                className="sprite"
              />
              <p>{weapon.basic.name}</p>
            </div>
          ))}
        </div>
      )}

      {/* Weapon Container for Building */}
      {selectedWeapon && (
        <div className="weapon-container">
          {/* Display base weapon image */}
          <UpscaledImage
            src={`assets/sprites/${selectedWeapon.basic.sprite_ingame}_0.png`}
            alt={selectedWeapon.basic.name}
            scale={4}
            className="base-sprite"
          />
          {/* Render selected mods */}
          {Object.keys(selectedWeapon.weapon.mods).map((modKey) => {
            const modPosition = selectedWeapon.weapon.mods[modKey];
            const selectedMod = selectedMods[modKey];

            return selectedMod ? (
              <UpscaledImage
                key={modKey}
                src={`assets/sprites/${selectedMod.basic.sprite_ingame}.png`}
                alt={selectedMod.basic.name}
                scale={4}
                className="mod-sprite"
                style={{
                  position: "absolute",
                  left: `${modPosition.x}px`,
                  top: `${modPosition.y}px`,
                }}
              />
            ) : null;
          })}
        </div>
      )}

      {/* Mod Selector */}
      {selectedWeapon && (
        <ModSelector mods={mods} weaponId={selectedWeapon.id} onSelect={handleSelectMod} />
      )}
    </div>
  );
}

export default WeaponDisplay;
