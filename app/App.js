import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ManageContents from "./page/ManageContents";
import Learn from "./page/Learn";
import { useState } from "react";
import { roundData } from "./roundMockData";
import * as NavigationBar from 'expo-navigation-bar';

// 배열
const mockData = roundData;

export default function App() {
  const [currentRound, setCurrentRound] = useState(0);
  const [showLearn, setShowLearn] = useState(true);

  const handleRoundPress = (index) => {
    setCurrentRound(index);
    setShowLearn(true)
  };

  NavigationBar.setBackgroundColorAsync("#f0ecc5");
  NavigationBar.setButtonStyleAsync("dark");

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <StatusBar style="auto"  />
        {showLearn ? (
          <Learn index={currentRound+1} data={mockData[currentRound]} setShowLearn={()=> setShowLearn(false)}/>
        ) : (
          <ManageContents dataList={mockData} onRoundPress={handleRoundPress}/>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  safe: {
    flex: 1,
    backgroundColor: "#363530",
  },
});
