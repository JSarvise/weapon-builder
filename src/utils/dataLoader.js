export async function loadWeaponData() {
  //Import weapons.json file
  const response = await fetch("/data/JSON/weapon.json");
  return response.json();
}

export async function loadModData() {
  const response = await fetch("/data/JSON/w_mod.json");
  return response.json();
}
