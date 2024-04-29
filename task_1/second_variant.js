import { translations } from "./data.js";
import { encoded } from "./data.js";

function isNumeric(value) {
  return !isNaN(parseFloat(value)) && isFinite(value);
}

export const toDecodeDecorator = () => {
  const uniqIds = new Set();
  const exceptions = { groupId: 1, service: 1, formatSize: 1, ca: 1 };
  // функция возвращает расшифрованное значения ключа
  return function (propertyName, data) {
    if (!data[propertyName]) {
      return "нет данных";
    }
    const id = data[propertyName];

    if (isNumeric(id)) {
      uniqIds.add(String(id));
      console.log(uniqIds);
    }

    if (
      propertyName.endsWith("Id") &&
      translations[id] !== undefined &&
      !exceptions[propertyName]
    ) {
      return translations[id];
    }

    return data[propertyName];
  };
};

const toDecode = toDecodeDecorator();

for (const obj of encoded) {
  for (const key in obj) {
    console.log(toDecode(key, obj));
  }
}
