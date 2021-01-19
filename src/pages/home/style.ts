import { mVal, buttonFontSize, padVal, color_primary, color_grey1, color_grey, color_white } from './../../style';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    // backgroundColor: "#DC143C"
  },
  filterView: {
    marginBottom: 10,
    flexGrow: 0,
    flexDirection: "row"
  },
  inputBox: {
    flexGrow: 1,
    paddingRight: padVal
  },
  buttonWrapper: {
    backgroundColor: color_primary,
    borderRadius: 5,
    paddingHorizontal: padVal * 2,
    justifyContent: "center"
  },
  button: {
    paddingTop: 3,
    paddingBottom: 3,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: buttonFontSize,
  },
  loading: {
    color: color_grey1,
  },
  notLoading: {
    color: color_white,
  },
  spinner: {
    marginLeft: mVal,
  }
});
