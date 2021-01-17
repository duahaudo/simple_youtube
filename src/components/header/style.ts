import { StyleSheet } from 'react-native';
import {
  color_primary,
  primaryFontSize,
  color_secondary,
  padVal,
  titleHeight,
  color_text_primary
} from '../../style';

export default StyleSheet.create({
  headerWrapper: {
    // backgroundColor: color_primary
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end',
    // backgroundColor: color_secondary
  },
  titleText: {
    color: color_text_primary,
    fontSize: primaryFontSize * 1.2,
    fontWeight: '500',
  },
  logoWrapper: {
    left: padVal,
    // top: 5,
    position: 'absolute',
  },
  logo: {
    width: 40,
    height: 40,
    borderRadius: 40,
  },
  textWrapper: {
    flex: 1,
    // marginLeft: mVal
    alignItems: 'center',
    justifyContent: 'center',
    // paddingTop: 5,
    height: titleHeight,
    // backgroundColor: color_primary
  },
  searchWrapper: {
    right: 0,
    position: 'absolute',
    padding: 12,
    paddingRight: padVal * 2,
    // backgroundColor: "#000"
  },
  icon: {
    color: color_text_primary,
  },
});
