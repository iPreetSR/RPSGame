import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import PlayScreen from './src/PlayScreen';
import * as Updates from "expo-updates";

export default function App() {

  const [play, setPlay] = useState(false);
  const [updateChecking, setUpdateChecking] = useState(false);

  // React.useEffect(() => {
  //   reactToUpdates();
  // }, []);

  // const reactToUpdates = async () => {
  //   Updates.addListener((event) => {
  //     if (event.type === Updates.UpdateEventType.UPDATE_AVAILABLE) {
  //       alert("An update is available. Restart ypur app to see it.");
  //       // Updates.reloadAsync();
  //     }
  //   });
  // };

  const triggerUpdateCheck = async () => {
    try {
      const update = await Updates.checkForUpdateAsync();
      if(update.isAvailable) {
        await Updates.fetchUpdateAsync();
        // alert("An update is available. Restart your app to see it.");
        await Updates.reloadAsync();
      } else {
        alert("No update is available");
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    play ? (
      <PlayScreen/>
    ) : (
      <View style={styles.container}>
        <Text style={styles.header}>Rock Paper Scissors</Text>
        <Text style={{ fontSize:70 }}>✊ ✋ ✌️</Text>
        <View style={styles.button}>
          <Button onPress={() => setPlay(true)} title='Play'/>
          <Button
          title="Check for Updates"
          activity={updateChecking}
          onPress={async () => {
            setUpdateChecking(true);
            await triggerUpdateCheck();
            setUpdateChecking(false);
          }}
        />
        </View>
        <StatusBar style="auto" />
      </View>
    )
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontSize: 28,
    marginBottom: 30,
  },
  button: {
    width: 240,
    marginTop: 50,
  }
});
