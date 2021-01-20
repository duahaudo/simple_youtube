import React from 'react';
import styles from './style';
import { defaultStyle } from '../../style';
import { View, Text, TextInput, Keyboard } from 'react-native';
import { SettingContext, asyncStorageKey_setting } from '../../constant';
import { useState } from 'react';
import { IContextSetting, ISetting } from '../../interface';
import { IAsyncStorageItem, useSaveItem } from '../../hooks/useAsyncStorage';
import { TouchableWithoutFeedback } from 'react-native';

export default () => {
  const setting = React.useContext(SettingContext) as IContextSetting;

  const [asyncStorageItem, setAsyncStorageItem] = useState<IAsyncStorageItem>({
    key: asyncStorageKey_setting,
  });
  // hook to save data
  useSaveItem(asyncStorageItem);

  const saveSetting = React.useCallback((newSetting: ISetting) => {
    setting.setSetting({ ...newSetting });
    // save to storage
    setAsyncStorageItem({
      ...asyncStorageItem,
      data: { ...newSetting },
    });
  }, []);

  return (
    <TouchableWithoutFeedback
      onPress={Keyboard.dismiss}
      accessible={false}
      style={styles.containerWrapper}>
      <View style={styles.container}>
        <View style={styles.maxQuery}>
          <View style={[styles.captionInput]}>
            <Text style={[defaultStyle.textCaption]}>Number of videos display</Text>
            <Text style={styles.description}>(0 ~ 99)</Text>
          </View>
          <TextInput
            blurOnSubmit={true}
            style={[defaultStyle.textInput, styles.textInput]}
            maxLength={2}
            keyboardType="number-pad"
            value={setting.setting.maxResults.toString()}
            onChangeText={(val: string) =>
              saveSetting({ ...setting.setting, maxResults: Number(val) !== NaN ? Number(val) : 0 })
            }
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};
