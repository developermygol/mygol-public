import { useSelector } from 'react-redux';

export const useTheme = () => {
  const { themeOrganization, themeTournament } = useSelector(state => state.theme);
  const activeTheme = themeTournament ? themeTournament : themeOrganization;
  //   const { bgColor, bgImageUrl, bgUploadId, fontName, fontUrl, color1, color2, color3 } = activeTheme;

  return activeTheme;
};

export default useTheme;
