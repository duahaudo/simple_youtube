import { StyleSheet, Appearance } from 'react-native';

export const color_black = '#000';
export const color_red = '#FF0000';
export const color_red1 = '#FF000090';
export const color_grey = '#aaa';
export const color_grey1 = '#ddd';
export const color_white = '#fff';
export const color_pink = '#E11584';
export const color_pink1 = '#E1158490';

export const color_primary = Appearance.getColorScheme() === "light" ? 'rgb(242,241,247)' : color_black;
export const color_secondary = Appearance.getColorScheme() === "light" ? color_white : 'rgb(34,34,35)';

export const text_primary = Appearance.getColorScheme() === "dark" ? color_white : color_black;
export const text_secondary = Appearance.getColorScheme() === "dark" ? color_grey1 : color_grey;

export const dockHeight = 60;
export const titleHeight = 50;
export const statusBarHeight = 10;

export const padVal = 10;
export const mVal = 10;

export const bigGreyFontSize = 20;
export const buttonFontSize = 18;
export const primaryFontSize = 16;
export const secondaryFontSize = 14;

export const defaultStyle = StyleSheet.create({
  noResultWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  noResultText: {
    color: color_grey,
    fontSize: bigGreyFontSize,
    fontWeight: 'bold',
    display: 'none',
  },
  textInput: {
    height: 40,
    padding: 10,
    borderWidth: 1,
    borderColor: color_grey,
    borderRadius: 5,
    backgroundColor: Appearance.getColorScheme() === "light" ? color_white : 'rgb(37,31,41)',
    color: Appearance.getColorScheme() === "light" ? color_black : color_white,
  },
  textCaption: {
    // marginVertical: 10
    color: Appearance.getColorScheme() === "light" ? text_primary : text_secondary
  },
});
