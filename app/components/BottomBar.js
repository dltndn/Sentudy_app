import {
  StyleSheet,
  View,
  Pressable,
  Text,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";

export default function BottomBar({ roundIndex, isLearn, leftBtnClick }) {
  return (
    <View>
      {isLearn ? (
        <View style={styles.bottom}>
          <MenuBtn onClick={leftBtnClick}/>
          <RightBtn index={roundIndex} />
        </View>
      ) : (
        <View style={styles.bottom}>
          <ProfileBtn onClick={leftBtnClick}/>
          <RightBtn index={roundIndex} />
        </View>
      )}
    </View>
  );
}

function MenuBtn({onClick}) {
  return (
    <TouchableOpacity onPress={onClick} style={styles.menuBtn}>
      <Ionicons name="menu" size={40} color="black" />
    </TouchableOpacity>
  );
}

function ProfileBtn({onClick}) {
  return (
    <TouchableOpacity onPress={onClick} style={styles.menuBtn}>
      <Ionicons name="ios-person" size={24} color="black" />
    </TouchableOpacity>
  );
}

function RightBtn({ index }) {
  return (
    <Pressable style={styles.roundBtn}>
      <Text style={styles.btnText}>{index}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  menuBtn: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: "#f0ecc5",
    justifyContent: "center", // 수직 방향 가운데 정렬
    alignItems: "center", // 수평 방향 가운데 정렬
    margin: 11,
  },
  roundBtn: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: "#e07e41",
    justifyContent: "center", // 수직 방향 가운데 정렬
    alignItems: "center", // 수평 방향 가운데 정렬
    margin: 11,
  },
  btnText: {
    color: "#fff",
    fontSize: 35,
    fontWeight: "bold",
  },
  bottom: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "transparent",
  },
});
