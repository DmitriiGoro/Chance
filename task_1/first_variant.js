import { encoded, translations } from "./data.js";

console.log("Let's rock");
console.log(encoded, translations);

function isNumeric(value) {
  return !isNaN(parseFloat(value)) && isFinite(value);
}

// функция возвращает массив с объектами с расшифрованными ключами
function toDecode(encoded = [], translations = {}) {
  const exceptions = { groupId: 1, service: 1, formatSize: 1, ca: 1 };
  const decodedArray = [];
  const uniqIds = new Set();

  for (const data of encoded) {
    const decoded = {};

    for (const key in data) {
      const keyValue = data[key];

      if (isNumeric(keyValue)) {
        uniqIds.add(String(keyValue));
      }

      if (!keyValue) {
        decoded[key] = "";
        continue;
      }

      if (exceptions[key]) {
        decoded[key] = keyValue;
      } else if (key.endsWith("Id") && translations[keyValue] !== undefined) {
        decoded[key] = translations[keyValue];
      }
    }

    decodedArray.push(decoded);
  }
  console.log(uniqIds);
  return decodedArray;
}

console.log(toDecode(encoded, translations));
