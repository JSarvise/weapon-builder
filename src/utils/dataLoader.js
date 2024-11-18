export async function loadWeaponData() {
  const response = await fetch("/data/weapons.json");
  return response.json();
}

export async function loadModData() {
  const response = await fetch("/data/w_mod.json");
  return response.json();
}
