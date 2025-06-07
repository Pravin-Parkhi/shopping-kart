import {
  createTheme,
  responsiveFontSizes,
  type PaletteOptions,
  type Theme,
} from '@mui/material/styles';

const otherColors = {
  positive: '#008448',
  negative: '#DE1836',
  grey3: '#656565',
  extraColor1: '#7A89FF',
  extraColor2: '#F3F4FF',
  extraColor3: '#304ffe1a',
};

const textPrimary = '#18181C';
const textSecondary = '#909192';

const palette: PaletteOptions = {
  primary: {
    light: '#f25c30',
    main: '#C73B0E',
    dark: '#8e280a',
    contrastText: '#fff',
  },
  secondary: {
    light: '#FFF27C',
    main: '#FFC14B',
    dark: '#F2833A',
  },
  text: {
    primary: textPrimary,
    secondary: textSecondary,
  },
  background: {
    default: '#F0F2F4',
  },
};

const buildTheme = (palettePatch = {}): Theme => {
  const newPalette = {
    ...palette,
    ...palettePatch,
  };

  return responsiveFontSizes(
    createTheme({
      palette: newPalette,
      typography: {
        fontFamily: '"Red Hat Text", sans-serif',
      },
    })
  );
};

export default buildTheme;

export { otherColors };
