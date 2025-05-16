import { useEvent } from 'expo';
import { useVideoPlayer, VideoView } from 'expo-video';
import { StyleSheet, View, Button } from 'react-native';
import { useEffect } from 'react';
import { useIsFocused } from '@react-navigation/native';

const videoSource = 'https://xd1ouduyqwjgcvbu.public.blob.vercel-storage.com/QuintinoFernandes_KairosNews-srhAzYtFUjhdBRWLhtR0PBIerH2yvn.mp4'

export default function VideoScreen() {
  const player = useVideoPlayer(videoSource, player => {
    player.loop = true;
    player.play();
  });

  const { isPlaying } = useEvent(player, 'playingChange', { isPlaying: player.playing });
  const isFocused = useIsFocused();

  useEffect(() => {
    if (!isFocused && player) {
      player.pause();
    }
  }, [isFocused, player]);

  return (
    <View style={styles.contentContainer}>
      <VideoView style={styles.video} player={player} allowsFullscreen allowsPictureInPicture />
      <View style={styles.controlsContainer}>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 50,
  },
  video: {
    width: '60%',
  },
  controlsContainer: {
    padding: 10,
  },
});