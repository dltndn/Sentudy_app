import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import MainLogo from "../components/MainLogo";
import BottomBar from "../components/BottomBar";
import { useState, useEffect } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function Learn({ index, data, setShowLearn }) {
  const sentenseAmount = data.length;
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
      setCurrentData(data[currentIndex]);
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
              <Text style={{fontSize: 30}}>{currentData?.korean}</Text>
            ) : (
              <Text style={{fontSize: 30}}>{currentData?.word}</Text>
            )}
          </TouchableOpacity>

          <Text style={{fontSize: 20}}>{currentData?.sentense}</Text>
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
        <BottomBar roundIndex={index} isLearn={true} leftBtnClick={setShowLearn}/>
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
    alignItems: "center",
    borderRadius: 20,
    backgroundColor: "#afb588",
  },
  contentsFont: {
    fontSize: 20
  },
  bottom: {
    width: 650,
    backgroundColor: "transparent",
  },
});
