import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ManageContents from "./page/ManageContents";
import Learn from "./page/Learn";
import { useState } from "react";
import { roundData } from "./roundMockData";

// 배열
const mockData = roundData;

export default function App() {
  const [currentRound, setCurrentRound] = useState();
  const [showLearn, setShowLearn] = useState(true);

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <StatusBar style="auto" />
        {showLearn ? (
          <Learn index={1} data={mockData[0]} />
        ) : (
          <ManageContents dataList={mockData} />
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
  },
});
