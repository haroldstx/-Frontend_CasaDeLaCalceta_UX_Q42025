export async function getUserProfile() {
  // LUEGO cambiar por fetch real:
  // return fetch("http://tu-api.com/perfil").then(r => r.json());

  return Promise.resolve({
    nombre: "Nicole",
    apellido: "García",
    usuario: "nic47",
    correo: "correo@ejemplo.com",
    telefono: "1234-5678",
    direccion: "Casita"
  });
}
