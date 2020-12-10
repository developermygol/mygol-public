import hexRgb from 'hex-rgb';

export const getStyleProperty = (theme, objProp) => {
  if (!theme) return null;
  if (theme[objProp]) return null;

  return theme[objProp];
};

export const hexToRGBAString = (hex, opacity = null) => {
  try {
    const rgbaObj = hexRgb(hex);
    rgbaObjToString(rgbaObj, opacity);
  } catch (err) {
    return '#000000';
  }
};

export const rgbaObjToString = (rgbaObj, opacity = null) => {
  const { red, green, blue, alpha } = rgbaObj;
  return `rgba(${red},${green},${blue},${opacity ? opacity : alpha})`;
};

export const loadExternalFont = url => {
  const fileRef = document.createElement('link');
  fileRef.setAttribute('rel', 'stylesheet');
  // fileRef.setAttribute('type', 'text/css');
  fileRef.setAttribute('href', url);

  document.getElementsByTagName('head')[0].appendChild(fileRef);
};
