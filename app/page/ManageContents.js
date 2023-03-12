import { StyleSheet, View, Pressable, Text, TouchableOpacity } from "react-native";
import MainLogo from "../components/MainLogo";
import BottomBar from "../components/BottomBar";


export default function ManageContents({dataList, onRoundPress}) {
    const handleRoundPress = (index) => {
        onRoundPress(index);
      };
    
  return (
    <View style={styles.container}>
      <MainLogo style={styles.mainLogo} />

      <View style={styles.mainContents}>
        {dataList.map((item, index) => (
          <TouchableOpacity key={index} onPress={() => handleRoundPress(index)} style={roundStyles("#e07e41").roundBtn}>
            <Text style={roundStyles("#e07e41").btnText}>{index + 1}</Text>
          </TouchableOpacity>
        ))}
        <Pressable style={roundStyles("#d0b5e8").roundBtn}>
            <Text style={roundStyles("#d0b5e8").btnText}>+</Text>
          </Pressable>
      </View>

      <View style={styles.bottom}>
        <BottomBar roundIndex={"??"} isLearn={false} leftBtnClick={()=>console.log("test")}/>
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
    paddingTop: 60,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    backgroundColor: "#363530",
    height: 646,
  },
  bottom: {
    width: 650,
    backgroundColor: 'transparent'
  },
});

const roundStyles = (backgroundColor) => StyleSheet.create({
    roundBtn: {
        width: 60,
        height: 60,
        borderRadius: 60,
        backgroundColor: backgroundColor,
        justifyContent: "center", // 수직 방향 가운데 정렬
        alignItems: "center", // 수평 방향 가운데 정렬
        margin: 11,
      },
      btnText: {
        color: "#fff",
        fontSize: 35,
        fontWeight: "bold",
      },
})