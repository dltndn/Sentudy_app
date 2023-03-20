import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from "react-native";
import { BlurView } from "expo-blur";
import MainLogo from "../components/MainLogo";
import InputSentenseForm from "../components/inputSentenseForm";
import BottomBar from "../components/BottomBar";
import { useState } from "react";

export default function ManageContents({ dataList, onRoundPress }) {
  const [showInputForm, setShowInputForm] = useState(false);
  const handleRoundPress = (index) => {
    onRoundPress(index);
  };

  return (
    <View style={styles.container}>
      <MainLogo style={styles.mainLogo} />

      <ScrollView contentContainerStyle={styles.mainContents} style={{flex: 1,}}>
        {dataList.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleRoundPress(index)}
            style={roundStyles("#e07e41").roundBtn}
          >
            <Text style={roundStyles("#e07e41").btnText}>{index + 1}</Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity style={roundStyles("#d0b5e8").roundBtn} onPress={() => setShowInputForm(true)}>
          <Text style={roundStyles("#d0b5e8").btnText}>+</Text>
        </TouchableOpacity>
      </ScrollView>

      <View style={styles.bottomContainer}>
        <View style={styles.bottomBlurContainer}>
          <BlurView
            intensity={0}
            tint="dark"
            style={StyleSheet.absoluteFill}
          />
        </View>
        <View style={styles.bottom}>
          <BottomBar
            roundIndex={"??"}
            isLearn={false}
            leftBtnClick={() => console.log("test")}
          />
        </View>
      </View>

      {showInputForm && (
        <View style={styles.blurContainer}>
          <BlurView
            intensity={100}
            tint="dark"
            style={StyleSheet.absoluteFill}
          />
          <InputSentenseForm pressCancel={() => {setShowInputForm(false)}} pressConfirm={() => {setShowInputForm(false)}}/>
        </View>
      )}
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
    paddingTop: 60,
    paddingBottom: 60,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-start",
    backgroundColor: "#363530",
    width: 650,
  },
  bottomContainer: {
    width: 650,
    position: "absolute",
    bottom: 0,
  },
  bottomBlurContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 70,
  },

  bottom: {
    width: 650,
  },
  blurContainer: {
    ...StyleSheet.absoluteFill,
    justifyContent: "center",
    alignItems: "center",
  },
});

const roundStyles = (backgroundColor) =>
  StyleSheet.create({
    roundBtn: {
      width: 60,
      height: 60,
      borderRadius: 60,
      backgroundColor: backgroundColor,
      justifyContent: "center", // 수직 방향 가운데 정렬
      alignItems: "center", // 수평 방향 가운데 정렬
      margin: 20,

    },
    btnText: {
      color: "#fff",
      fontSize: 35,
      fontWeight: "bold",
    },
  });
