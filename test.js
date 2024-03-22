import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, FlatList } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
          <Text>Welcome to the FE Deal Chasers Project!</Text>
          <Text>Welcome!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const test = () => {
    console.log("hello world")
    
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'red',
    alignItems: 'left',
    justifyContent: 'center',
  },
});