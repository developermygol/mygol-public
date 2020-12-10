import { createGlobalStyle } from 'styled-components';
import { loadExternalFont } from './components/helpers/Theme';
import { getUploadRoot } from './components/helpers/Utils';

const GlobalStyle = createGlobalStyle`
  ${props => {
    if (!Object.keys(props.theme).length > 0) return null;

    const { bgColor, bgImageUrl, fontName, fontUrl, color1, color2, color3 } = props.theme;

    const fontNameString = fontName ? `font-family: ${fontName} !important;` : '';

    if (fontUrl) loadExternalFont(fontUrl);

    const color1String = color1 ? `color: ${color1} !important;` : '';
    const backGroundColor1String = color1 ? `background-color: ${color1} !important;` : '';
    const borderColor1String = color1 ? `border-color: ${color1} !important;` : '';

    const color2String = color2 ? `color: ${color2} !important;` : '';
    const borderColor2String = color2 ? `border-color: ${color2} !important;` : '';

    const color3String = color3 ? `color: ${color3} !important;` : '';
    const borderColor3String = color3 ? `border-color: ${color3} !important;` : '';

    const bgColorString = bgColor ? `background-color: ${bgColor} !important;` : '';
    const colorBgColorString = bgColor ? `color: ${bgColor} !important;` : '';
    const bgImageUrlString = bgImageUrl
      ? `background-image: url(${`${getUploadRoot()}/${bgImageUrl}`}) !important;`
      : bgColor
      ? 'none !important'
      : '';

    return `
      body {
        ${bgColorString}
        ${bgImageUrlString}
        ${color3String}
      }
      body, input, select, textarea, button {
        ${fontNameString}
      }
      .RawContent {
        ${color3String}
      }
      a {
        ${color1String}
      }
      .Content h2 {
        ${color1String}
      }
      .Color1 {
        ${color1String}
        ${borderColor1String}
      }
      .Color1Border {
        ${borderColor1String}
      }
      .Color1Inverse {
        ${colorBgColorString}
        ${backGroundColor1String}
        ${borderColor1String}
      }
      .Color2 {
        ${color2String}
        ${borderColor2String}
      }
      .Color3 {
        ${color3String}
        ${borderColor3String}
      }
    `;
  }}
    
`;

export const initialTheme = {
  bgColor: '#5D5D81',
  color1: '#E7A016',
  color2: '#FFFFFF',
  color3: '#FFFFFF',
  fontName: 'Open Sans',
  fontUrl: '',
  bgImageUrl: 'public1/back2.jpg',
};

export default GlobalStyle;
