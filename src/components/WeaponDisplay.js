import React, { useState, useEffect } from "react";
import { loadWeaponData, loadModData } from "../utils/dataLoader";
import ModSelector from "./ModSelector";

function WeaponDisplay() {
  const [weapon, setWeapon] = useState(null);
  const [mods, setMods] = useState(null);
  const [selectedMods, setSelectedMods] = useState({});

  useEffect(() => {
    async function fetchData() {
      const weaponData = await loadWeaponData();
      const modData = await loadModData();
      setWeapon(weaponData.data.aa12); // For example, displaying the aa12 weapon
      setMods(modData.data);
    }
    fetchData();
  }, []);

  // Handles selection of a mod from the ModSelector
  const handleSelectMod = (mod) => {
    setSelectedMods((prev) => ({
      ...prev,
      [mod.weapon_mod.type]: mod,
    }));
  };

  // Renders mods on the weapon at their specified positions
  const renderMods = () => {
    return Object.keys(weapon.weapon.mods).map((modKey) => {
      const mod = weapon.weapon.mods[modKey];
      const selectedMod = selectedMods[modKey] || mods[mod.default_id];

      return (
        <img
          key={modKey}
          src={`/assets/sprites/${selectedMod.basic.sprite_ingame}.png`}
          alt={selectedMod.basic.name}
          style={{
            position: "absolute",
            left: `${mod.x}px`,
            top: `${mod.y}px`,
          }}
        />
      );
    });
  };

  if (!weapon || !mods) return <p>Loading...</p>;

  return (
    <div>
      <h1>Weapon Builder</h1>
      <ModSelector mods={mods} onSelect={handleSelectMod} />
      <div style={{ position: "relative", width: 200, height: 200 }}>
        {/* Display weapon base image */}
        <img
          src={`/assets/sprites/${weapon.basic.sprite_ingame}.png`}
          alt={weapon.basic.name}
          style={{ position: "absolute", top: 0, left: 0 }}
        />
        {/* Render selected mods */}
        {renderMods()}
      </div>
    </div>
  );
}

export default WeaponDisplay;
