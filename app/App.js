import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ManageContents from "./page/ManageContents";
import Learn from "./page/Learn";
import { useEffect, useState } from "react";
import { roundData } from "./roundMockData";
import * as NavigationBar from 'expo-navigation-bar';

// 배열
const mockData = roundData;

const SERVER_URL = process.env.REACT_APP_SERVER_URL

// to do
// 학습 완료여부 표시 기능
// 첫 화면 마지막 데이터 출력
// 플레이스홀더 깨짐 해결

export default function App() {
  const [currentRound, setCurrentRound] = useState(0);
  const [showLearn, setShowLearn] = useState(true);

  const handleRoundPress = (index) => {
    setCurrentRound(index);
    setShowLearn(true)
  };

  NavigationBar.setBackgroundColorAsync("#f0ecc5");
  NavigationBar.setButtonStyleAsync("dark");

  const getDataFromServer = async () => {
    try {
      const response = await fetch(
        `${SERVER_URL}/test`,
      );
      const json = await response.json();      
      return json;
    } catch (error) {
      console.log("error")
      console.error(error);
    }
  };

  useEffect(async () => {
    const result = await getDataFromServer()
    console.log(result)
  }, [])

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
      <View><Text>test</Text></View>
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

