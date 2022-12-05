const EColorPalette = {
  APP_BACKGROUND: '#f7f7f7',
  WHITE: '#FFFFFF',
  BLACK: '#000000',
  BLUE: '#3D65AE',
  RED: '#EA4335',
  YELLOW: '#FF920D',
  GREEN_500: '#04AA53',
  GREEN_300: '#81dbab',
  GRAY_900: '#293035',
  GRAY_500: '#657B88',
  GRAY_400: '#7C8E99',
  GRAY_300: '#DADEE0',
}

export const EFontFamily = {
  BLACK: 'InterBlack',
  BOLD: 'InterBold',
  REGULAR: 'InterRegular',
  SEMI_BOLD: 'InterSemiBold',
  MEDIUM: 'InterMedium',
}

export const theme = {
  navigationTheme: {
    dark: false,
    colors: {
      primary: EColorPalette.GREEN_500,
      background: EColorPalette.APP_BACKGROUND,
      card: EColorPalette.WHITE,
      text: EColorPalette.GRAY_900,
      border: EColorPalette.GRAY_50,
      notification: EColorPalette.RED,
    },
  },
  colors: {
    primary: EColorPalette.GREEN_500,
    secondary: EColorPalette.GRAY_900,
    success: EColorPalette.GREEN,
    danger: EColorPalette.RED,
    warning: EColorPalette.GREEN_500,

    appBackground: EColorPalette.APP_BACKGROUND,
    textForeground: EColorPalette.GRAY_900,

    white: EColorPalette.WHITE,
    black: EColorPalette.BLACK,
    blue: EColorPalette.BLUE,
    yellow: EColorPalette.YELLOW,

    green_300: EColorPalette.GREEN_300,
    gray500: EColorPalette.GRAY_500,
    gray400: EColorPalette.GRAY_400,
    gray300: EColorPalette.GRAY_300,
  },
  spacing: {
    appPadding: 14,
    bottomTabHeight: 55,
  },
  textVariants: {
    buttonSemiBold16: {
      fontSize: 16,
      lineHeight: 24,
      fontFamily: EFontFamily.SEMI_BOLD,
    },
    buttonMedium16: {
      fontSize: 16,
      lineHeight: 24,
      fontFamily: EFontFamily.MEDIUM,
    },
    inputSemiBold14: {
      fontSize: 14,
      lineHeight: 22,
      fontFamily: EFontFamily.SEMI_BOLD,
    },
    inputMedium14: {
      fontSize: 14,
      lineHeight: 22,
      fontFamily: EFontFamily.MEDIUM,
    },
    displayBold32: {
      fontSize: 32,
      lineHeight: 40,
      fontFamily: EFontFamily.BOLD,
    },
    displaySemiBold32: {
      fontSize: 32,
      lineHeight: 40,
      fontFamily: EFontFamily.SEMI_BOLD,
    },
    h1SemiBold24: {
      fontSize: 24,
      lineHeight: 32,
      fontFamily: EFontFamily.SEMI_BOLD,
    },
    h1Medium24: {
      fontSize: 24,
      lineHeight: 32,
      fontFamily: EFontFamily.MEDIUM,
    },
    h1Regular24: {
      fontSize: 24,
      lineHeight: 32,
      fontFamily: EFontFamily.REGULAR,
    },
    h2SemiBold20: {
      fontSize: 20,
      lineHeight: 28,
      fontFamily: EFontFamily.SEMI_BOLD,
    },
    h2Medium20: {
      fontSize: 20,
      lineHeight: 28,
      fontFamily: EFontFamily.MEDIUM,
    },
    h2Regular20: {
      fontSize: 20,
      lineHeight: 28,
      fontFamily: EFontFamily.REGULAR,
    },
    h3SemiBold18: {
      fontSize: 18,
      lineHeight: 26,
      fontFamily: EFontFamily.SEMI_BOLD,
    },
    h3Medium18: {
      fontSize: 18,
      lineHeight: 26,
      fontFamily: EFontFamily.MEDIUM,
    },
    h3Regular18: {
      fontSize: 18,
      lineHeight: 26,
      fontFamily: EFontFamily.REGULAR,
    },
    body1SemiBold16: {
      fontSize: 16,
      lineHeight: 24,
      fontFamily: EFontFamily.SEMI_BOLD,
    },
    body1Medium16: {
      fontSize: 16,
      lineHeight: 24,
      fontFamily: EFontFamily.MEDIUM,
    },
    body1Regular16: {
      fontSize: 16,
      lineHeight: 24,
      fontFamily: EFontFamily.REGULAR,
    },
    body2SemiBold14: {
      fontSize: 14,
      lineHeight: 22,
      fontFamily: EFontFamily.SEMI_BOLD,
    },
    body2Medium14: {
      fontSize: 14,
      lineHeight: 22,
      fontFamily: EFontFamily.MEDIUM,
    },
    body2Regular14: {
      fontSize: 14,
      lineHeight: 22,
      fontFamily: EFontFamily.REGULAR,
    },
    body3SemiBold12: {
      fontSize: 12,
      lineHeight: 20,
      fontFamily: EFontFamily.SEMI_BOLD,
    },
    body3Medium12: {
      fontSize: 12,
      lineHeight: 20,
      fontFamily: EFontFamily.MEDIUM,
    },
    body3Regular12: {
      fontSize: 12,
      lineHeight: 20,
      fontFamily: EFontFamily.REGULAR,
    },
    body4SemiBold10: {
      fontSize: 10,
      lineHeight: 16,
      fontFamily: EFontFamily.SEMI_BOLD,
    },
    body4Medium10: {
      fontSize: 10,
      lineHeight: 16,
      fontFamily: EFontFamily.MEDIUM,
    },
    body4Regular10: {
      fontSize: 10,
      lineHeight: 16,
      fontFamily: EFontFamily.REGULAR,
    },
  },
}
