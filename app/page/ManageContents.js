import { StyleSheet, View, Pressable, Text } from "react-native";
import MainLogo from "../components/MainLogo";

export default function ManageContents() {
  return (
    <View style={styles.container}>
        <MainLogo style={styles.mainLogo}/>
      
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "#fff",
      },
    mainLogo : {
        width: 200, // 로고 이미지의 너비
        height: 50, // 로고 이미지의 높이
        resizeMode: "contain", // 이미지를 화면에 맞게 조정
    }
})