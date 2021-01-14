import { StyleSheet, Appearance } from 'react-native';

export const color_black = '#000';
export const color_red = '#FF0000';
export const color_red1 = '#FF000090';
export const color_grey = '#aaa';
export const color_grey1 = '#dddddd';
export const color_white = '#fff';
export const color_pink = '#E11584';
export const color_pink1 = '#E1158490';

function shadeColor(color: string, percent: number): string {

  var R = parseInt(color.substring(1, 3), 16);
  var G = parseInt(color.substring(3, 5), 16);
  var B = parseInt(color.substring(5, 7), 16);

  R = parseInt(R * (100 + percent) / 100);
  G = parseInt(G * (100 + percent) / 100);
  B = parseInt(B * (100 + percent) / 100);

  R = (R < 255) ? R : 255;
  G = (G < 255) ? G : 255;
  B = (B < 255) ? B : 255;

  var RR = ((R.toString(16).length == 1) ? "0" + R.toString(16) : R.toString(16));
  var GG = ((G.toString(16).length == 1) ? "0" + G.toString(16) : G.toString(16));
  var BB = ((B.toString(16).length == 1) ? "0" + B.toString(16) : B.toString(16));

  return "#" + RR + GG + BB;
}

const mainColor = 'rgb(111, 187, 83)';
const mainTextColor = '#ffffff';

// export const color_primary = Appearance.getColorScheme() === "light" ? 'rgb(242,241,247)' : color_black;
// export const color_secondary = Appearance.getColorScheme() === "light" ? color_white : 'rgb(34,34,35)';
export const color_primary = mainColor
export const color_secondary = color_white

// export const text_primary = Appearance.getColorScheme() === "dark" ? color_white : color_black;
// export const text_secondary = Appearance.getColorScheme() === "dark" ? color_grey1 : color_grey;

export const text_primary = shadeColor(mainTextColor, 0)
export const text_secondary = shadeColor(mainTextColor, -40)
export const text_iconMenu = shadeColor(mainTextColor, -20)

export const dockHeight = 60;
export const titleHeight = 50;
export const statusBarHeight = 10;
export const iconSize = 22;

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
    // backgroundColor: color_secondary,
    color: color_black
  },
  textCaption: {
    // marginVertical: 10
    // color: text_primary
  },
});
