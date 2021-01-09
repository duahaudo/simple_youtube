import {StyleSheet} from 'react-native';
import {
  color_primary,
  primaryFontSize,
  color_white,
  padVal,
  titleHeight,
} from '../../style';

export default StyleSheet.create({
  headerWrapper: {
    backgroundColor: color_primary,
    color: color_white,
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end',
    // marginTop: 10
  },
  titleText: {
    color: color_white,
    fontSize: primaryFontSize,
    fontWeight: '500',
  },
  logoWrapper: {
    left: padVal,
    // top: 5,
    position: 'absolute',
  },
  logo: {
    width: 30,
    height: 30,
    borderRadius: 30,
  },
  textWrapper: {
    flex: 1,
    // marginLeft: mVal
    alignItems: 'center',
    justifyContent: 'center',
    // paddingTop: 5,
    height: titleHeight,
  },
  searchWrapper: {
    right: 0,
    position: 'absolute',
    padding: 12,
    paddingRight: padVal * 2,
    // backgroundColor: "#000"
  },
  icon: {
    color: color_white,
  },
});