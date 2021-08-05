export const decodeTo64 = ({ data, extension }) => {
  let test = `data:${extension};base64,${data}`;
  console.log("TESSDDS", test);
  return test;
};

export const encodeTo64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      resolve(reader.result.split(",")[1]);
    };
    reader.onerror = (error) => reject(error);
  });
};

export const formatString = (str) => {
  return str
    .replace(/(\B)[^ ]*/g, (match) => match.toLowerCase())
    .replace(/^[^ ]/g, (match) => match.toUpperCase());
};

export const getSeason = (date) => {
  const year = new Date(date).getFullYear();
  const season = parseInt(new Date(date).getMonth());

  if (season > 9) {
    return `Fall ${year}`;
  } else if (season > 6) {
    return `Summer ${year}`;
  } else if (season > 3) {
    return `Springs ${year}`;
  } else {
    return `Springs ${year}`;
  }
};

export const objectEquals = (x, y) => {
  if (x === y) return true;
  // if both x and y are null or undefined and exactly the same

  if (!(x instanceof Object) || !(y instanceof Object)) return false;
  // if they are not strictly equal, they both need to be Objects

  if (x.constructor !== y.constructor) return false;
  // they must have the exact same prototype chain, the closest we can do is
  // test there constructor.

  for (var p in x) {
    if (!x.hasOwnProperty(p)) continue;
    // other properties were tested using x.constructor === y.constructor

    if (!y.hasOwnProperty(p)) return false;
    // allows to compare x[ p ] and y[ p ] when set to undefined

    if (x[p] === y[p]) continue;
    // if they have the same strict value or identity then they are equal

    if (typeof x[p] !== "object") return false;
    // Numbers, Strings, Functions, Booleans must be strictly equal

    if (!object_equals(x[p], y[p])) return false;
    // Objects and Arrays must be tested recursively
  }

  for (p in y) if (y.hasOwnProperty(p) && !x.hasOwnProperty(p)) return false;
  // allows x[ p ] to be set to undefined

  return true;
};
