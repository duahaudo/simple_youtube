import {StyleSheet} from 'react-native';

export const color_primary = '#E11584';
export const color_secondary = '#E1158490';
export const color_red = '#FF0000';
export const color_red1 = '#FF000090';
export const color_grey = '#aaa';
export const color_grey1 = '#aaa';
export const color_white = '#fff';
export const color_black = '#000';

export const dockHeight = 50;
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
  },
  textCaption: {
    // marginVertical: 10
  },
});
