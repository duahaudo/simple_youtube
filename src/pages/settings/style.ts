import { StyleSheet } from 'react-native';
import { color_text_secondary, secondaryFontSize, mVal } from '../../style';

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
  containerWrapper: {
    flex: 1,
  },
  maxQuery: {
    flexDirection: 'row',
    marginVertical: mVal,
  },
  textInput: {
    flex: 1,
  },
  captionInput: {
    flex: 3,
    justifyContent: 'space-between',
    alignItems: 'stretch',
  },
  description: {
    color: color_text_secondary,
    fontSize: secondaryFontSize,
  },
});
