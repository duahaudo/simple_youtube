import {StyleSheet} from 'react-native';
import {color_primary, color_white, padVal} from '../../style';

export default StyleSheet.create({
  container: {
    // backgroundColor: color_black,
    flex: 1,
  },
  webViewContainer: {
    flex: 1,
  },
  playerContainer: {
    backgroundColor: color_white,
    flex: 1,
  },
  webView: {
    height: 250,
  },
  title: {
    backgroundColor: color_primary,
    paddingVertical: 10,
    paddingHorizontal: 20,
    // borderTopStartRadius: 20,
    // borderTopEndRadius: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  closeText: {
    color: '#fff',
  },
  titleText: {
    flex: 0.8,
  },
  topHeader: {
    marginTop: 25,
    height: 15,
    width: '85%',
    alignSelf: 'center',
    // backgroundColor: color_red1,
    // borderTopStartRadius: 25,
    // borderTopEndRadius: 25,
  },
  description: {
    padding: padVal,
  },
});
