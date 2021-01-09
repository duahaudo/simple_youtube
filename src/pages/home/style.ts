import {mVal, buttonFontSize} from './../../style';
import {StyleSheet} from 'react-native';
import {color_primary, color_grey1, color_white} from '../../style';

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    // backgroundColor: "#DC143C"
  },
  filterView: {
    // backgroundColor: 'yellow',
    marginBottom: 10,
    flexGrow: 0,
  },
  buttonWrapper: {
    backgroundColor: color_primary,
    borderRadius: 5,
    marginTop: 10,
    paddingVertical: 5,
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
  },
});
