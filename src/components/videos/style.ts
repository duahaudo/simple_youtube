import { StyleSheet, Appearance } from 'react-native';
import {
  color_black,
  color_white,
  color_primary,
  color_secondary,
  color_grey1,
  color_grey,
  dockHeight,
  padVal,
  mVal,
  secondaryFontSize,
  primaryFontSize,
} from '../../style';

export default StyleSheet.create({
  itemWrapper: {
    flexDirection: 'row',
    backgroundColor: color_primary,
    marginTop: mVal,
    paddingLeft: padVal,
    borderRadius: mVal
  },
  thumbnailWrapper: {
    flex: 0.3,
    padding: padVal,
    paddingLeft: 0,
    // backgroundColor: color_secondary,
  },
  thumbnail: {
    backgroundColor: color_primary,
    opacity: 0.8,
    flex: 1,
  },
  optionItems: {
    // backgroundColor: 'red',
    flex: 1,
    marginRight: -1 * padVal,
    paddingRight: padVal,
  },
  optionItem: {
    // backgroundColor: 'red',
    flex: 0.7,
    paddingTop: padVal,
    paddingBottom: padVal,
    // borderBottomColor: color_grey1,
    // borderBottomWidth: 1,
    // backgroundColor: color_primary
  },
  noBorder: {
    borderBottomWidth: 0,
  },
  optionItemText: {
    fontSize: primaryFontSize,
    color: Appearance.getColorScheme() === "light" ? color_black : color_white
  },
  optionDescription: {
    marginTop: mVal,
    fontSize: secondaryFontSize,
    color: color_grey,
    maxHeight: 50,
  },
  modalWrapper: {
    flex: 1,
  },
  dockWrapper: {
    height: dockHeight,
  },
  videoTitleWrapper: {
    flexDirection: "row",
    flex: 1
  },
  videoTitle: {
    flex: 1,
    flexGrow: 1
  },
  videoFavourite: {
    width: 50,
    alignItems: "center",
    justifyContent: "center"
  }
});
