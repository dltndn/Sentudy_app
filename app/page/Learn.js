import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import MainLogo from "../components/MainLogo";
import BottomBar from "../components/BottomBar";
import { useState, useEffect } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function Learn({ index, data }) {
  const sentenseAmount = data.length + 1;
  const [sentenseNum, setSentenseNum] = useState(0);
  const [currentData, setCurrentData] = useState(data[sentenseNum]);
  const [isKorean, setIsKorean] = useState(false);

  const showDataLogic = (index) => {
    let currentIndex = index + 1;
    if (currentIndex === sentenseAmount) {
      setSentenseNum(0);
      setCurrentData(data[0]);
      setIsKorean(false)
    } else {
      setSentenseNum(currentIndex);
      setCurrentData(data[sentenseNum]);
      setIsKorean(false)
    }
  };

  const switchKorean = () => {
    if (isKorean === true) {
      setIsKorean(false);
    } else {
      setIsKorean(true);
    }
  };

  return (
    <View style={styles.container}>
      <MainLogo style={styles.mainLogo} />

      <View style={styles.mainContents}>
        <View style={styles.learnBox}>
          <TouchableOpacity onPress={() => switchKorean()}>
            {isKorean ? (
              <Text>{currentData.korean}</Text>
            ) : (
              <Text>{currentData.word}</Text>
            )}
          </TouchableOpacity>

          <Text>{currentData.sentense}</Text>
          <TouchableOpacity onPress={() => showDataLogic(sentenseNum)}>
            <MaterialCommunityIcons
              name="arrow-right-circle-outline"
              size={40}
              color="black"
            />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.bottom}>
        <BottomBar roundIndex={index} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#363530",
  },
  mainLogo: {
    width: 200, // 로고 이미지의 너비
    height: 150, // 로고 이미지의 높이
    resizeMode: "contain", // 이미지를 화면에 맞게 조정
  },
  mainContents: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#363530",
    height: 646,
  },
  learnBox: {
    width: 300,
    height: 400,
    backgroundColor: "white",
    padding: 10,
    justifyContent: "space-between",
    alignItems: "center"
  },
  bottom: {
    width: 650,
    backgroundColor: "transparent",
  },
});