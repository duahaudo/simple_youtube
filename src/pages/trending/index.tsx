import React from 'react';
import styles from './style';
import { View, Text, ActivityIndicator } from 'react-native';
import { FormContext } from '../../constant';
// import { defaultStyle } from '../../style';

import Videos from '../../components/videos';

import useFindTrending from '../../hooks/useFindTrending';

export default () => {
  // @ts-ignore
  const context = React.useContext(FormContext) as {
    showReload: boolean;
    setShowReload: any;
  };

  const [needReload, setNeedReload] = React.useState(false);
  const [loading, trendingVideos] = useFindTrending(needReload);
  const videos = React.useMemo(() => {
    if (!loading && trendingVideos && trendingVideos.success) {
      return trendingVideos.data;
    }
    return [];
  }, [loading, trendingVideos]);

  React.useEffect(() => {
    // console.log('context.showReload', context.showReload);

    if (!context.showReload && videos) {
      context.setShowReload(false);
      setNeedReload(false);
    }
  }, [videos, context.showReload]);

  return (
    <View style={styles.container}>
      {/* {loading && <ActivityIndicator size="small" animating={!!loading} style={styles.spiner} />} */}
      <Videos
        options={videos}
        showFavourite
        refreshingIndicator={!!loading}
        onRefresh={() => {
          setNeedReload(true);
        }}
      />
    </View>
  );
};
