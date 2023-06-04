import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ManageContents from "./page/ManageContents";
import Learn from "./page/Learn";
import { useEffect, useState } from "react";
import { roundData } from "./roundMockData";
import * as NavigationBar from 'expo-navigation-bar';
import * as base64 from "base-64";
import * as utf8 from 'utf8';

// 배열
const mockData = roundData;

const SERVER_URL = process.env.REACT_APP_SERVER_URL

// to do
// 학습 완료여부 표시 기능 - local storage에 학습 완료 회차 번호 저장
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

  const hashTest = () => {
    const sentence = `함수의 상위 스코프를 결정하는 방식으로,
  함수를 어디서 선언하였는지에 따라 상위 스코프를 결정하는 것이다.`
    
  const bytes = utf8.encode(sentence);
  const encoded = base64.encode(bytes);
  console.log("encoded: " + encoded);
  console.log("len: " + encoded.length)

  const bytesR = base64.decode(encoded);
  const text = utf8.decode(bytesR);
  console.log("text: " + text);
  console.log("text len: " + text.length)

  }

  useEffect(async () => {
    // const result = await getDataFromServer()
    hashTest()
    // console.log(result)
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

