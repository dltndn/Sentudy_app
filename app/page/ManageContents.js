import { StyleSheet, View, Pressable, Text, ScrollView } from "react-native";
import MainLogo from "../components/MainLogo";
import { roundData } from "../roundMockData";

// 배열
const mockData = roundData;

export default function ManageContents() {
  return (
    <View style={styles.container}>
      <MainLogo style={styles.mainLogo} />
      <ScrollView style={styles.mainContents}>
        <Pressable style={styles.roundBtn}>
          <Text style={styles.btnText}>1</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  mainLogo: {
    width: 200, // 로고 이미지의 너비
    height: 50, // 로고 이미지의 높이
    resizeMode: "contain", // 이미지를 화면에 맞게 조정
  },
  mainContents: {
        paddingTop: 60
  },
  roundBtn: {
    width: 60,
    height: 60,
    borderRadius: 60,
    backgroundColor: "#e07e41",
    justifyContent: "center", // 수직 방향 가운데 정렬
    alignItems: "center", // 수평 방향 가운데 정렬
  },
  btnText: {
    color: "#fff",
    fontSize: 35,
    fontWeight: "bold",
  },
});
