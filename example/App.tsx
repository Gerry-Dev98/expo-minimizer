import * as ExpoMinimizer from 'expo-minimizer';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';
import { useEffect, useState } from 'react';

export default function App() {
  const [canMinimize, setCanMinimize] = useState(false);
  const [isBackground, setIsBackground] = useState(false);

  useEffect(() => {
    // Check capabilities
    ExpoMinimizer.canMinimize().then(setCanMinimize);
    setIsBackground(ExpoMinimizer.isAppInBackground());

    // Listen to app state changes
    const subscription = ExpoMinimizer.addAppStateListener((event) => {
      console.log('App state changed:', event);
      setIsBackground(event.state !== 'active');
    });

    return () => subscription.remove();
  }, []);

  const handleSmartGoBack = async () => {
    // Smart go back with fallback to a specific DApp
    await ExpoMinimizer.smartGoBack('com.coinbase.wallet');
  };

  const handleGoBackToBrowser = async () => {
    // Try to go back to default browser
    const success = await ExpoMinimizer.goBackToApp('com.android.chrome');
    if (!success) {
      await ExpoMinimizer.minimizeToHome();
    }
  };

  const handleOpenAppSettings = async () => {
    await ExpoMinimizer.openAppSettings();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Expo Minimizer Example</Text>
      
      <Text>Can Minimize: {canMinimize ? 'Yes' : 'No'}</Text>
      <Text>Is Background: {isBackground ? 'Yes' : 'No'}</Text>
      
      <Button title="Smart Go Back" onPress={handleSmartGoBack} />
      <Button title="Go Back to Browser" onPress={handleGoBackToBrowser} />
      <Button title="Open Settings" onPress={handleOpenAppSettings} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  spacer: {
    height: 20,
  },
});