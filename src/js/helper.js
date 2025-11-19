//////////////////////////////////////////////////////////////////////////////////
//Pequeños helpers como: getJSON() --> fetch con manejo de errores              //
//timeout() --> para abortar si una peticion tarda                              //
//////////////////////////////////////////////////////////////////////////////////

import { TIMEOUT_SEC } from './config.js';

// Si el fetch tarda más de TIMEOUT_SEC segundos, rechaza la promesa
const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(() => reject(new Error(`Request took too long! Timeout after ${s} second`)), s * 1000);
  });
};

// Hace fetch y valida errores
export const getJSON = async function (url) {
  try {
    const fetchPro = fetch(url);
    const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} (${res.status})`);
    return data;
  } catch (err) {
    throw err;
  }
};