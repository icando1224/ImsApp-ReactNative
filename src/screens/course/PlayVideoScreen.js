import React from 'react'
import { View, Text } from 'react-native'
import { Vimeo } from 'react-native-vimeo-iframe'

const PlayVideoScreen = () => {
  return (
    <View style={{ flex: 1 }}>
      <Vimeo
        videoId={'375445745'}
        onReady={() => console.log('Video is ready')}
        onPlay={() => console.log('Video is playing')}
        onPlayProgress={(data) => console.log('Video progress data:', data)}
        onFinish={() => console.log('Video is finished')}
        loop={true}
        autoPlay={false}
        controls={false}
        speed={false}
      />
    </View>
  )
}

export default PlayVideoScreen
