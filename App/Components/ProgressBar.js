import { View, Text, Dimensions, StyleSheet } from 'react-native'
import React from 'react'
import * as Progress from 'react-native-progress';

export default function ProgressBar({progress}) {
  return (
    <View>
      <Progress.Bar
        progress={progress}
        width={Dimensions.get('screen').width * 0.85}
        height={8}
        borderWidth={0} 
        borderRadius={4} 
        style={styles.progressBar}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  progressBar: {
    marginHorizontal: 8, 
  },
});