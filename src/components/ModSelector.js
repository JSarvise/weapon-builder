function ModSelector({ mods, onSelect }) {
  return (
    <div>
      <h3>Select Mod</h3>
      <ul>
        {Object.keys(mods).map((modKey) => {
          const mod = mods[modKey];
          if (mod.weapon_mod.weapon_id.includes("aa12")) {
            return (
              <li key={modKey} onClick={() => onSelect(mod)}>
                {mod.basic.name}
              </li>
            );
          }
          return null;
        })}
      </ul>
    </div>
  );
}
