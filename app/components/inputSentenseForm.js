import {
  StyleSheet,
  View,
  TextInput,
  Text,
  TouchableOpacity,
} from "react-native";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function InputSentenseForm({ pressCancel, pressConfirm }) {
  const [wordEmpty, setWordEmpty] = useState(false);
  const [koreanEmpty, setKoreanEmpty] = useState(false);
  const [sentenseEmpty, setSentenseEmpty] = useState(false);
  const [word, setWord] = useState("");
  const [korean, setKorean] = useState("");
  const [sentense, setSentense] = useState("");
  const [dataArr, setDataArr] = useState([]);

  const checkEmpty = () => {
    if (word === "" || korean === "" || sentense === "") {
      setWordEmpty(word === "");
      setKoreanEmpty(korean === "");
      setSentenseEmpty(sentense === "");
      return true;
    } else {
      return false;
    }
  };

  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem("@sentudy_Key", jsonValue);
    } catch (e) {
      // saving error
    }
  };

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("@sentudy_Key").then(
        (response) => {
          return response;
        }
      );
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      // error reading value
    }
  };

  const pressNextBtn = () => {
    if (checkEmpty()) {
      const timeoutId = setTimeout(() => {
        setWordEmpty(false);
        setKoreanEmpty(false)
        setSentenseEmpty(false)
      }, 2000);
      return () => clearTimeout(timeoutId);
    } else {
      let dataFromState = dataArr;
      let data = { word, korean, sentense };
      dataFromState.push(data);
      setDataArr(dataFromState);
      setWord("");
      setKorean("");
      setSentense("");
    }
  };

  const pressCancelBtn = () => {
    setDataArr([]);
    pressCancel();
  };

  const pressConfirmBtn = async () => {
    if (checkEmpty()) {
      const timeoutId = setTimeout(() => {
        setWordEmpty(false);
        setKoreanEmpty(false)
        setSentenseEmpty(false)
      }, 2000);
      return () => clearTimeout(timeoutId);
    } else {
      let dataFromStorage = await getData();
      if (dataFromStorage === null) {
        storeData(dataArr);
      } else {
        dataFromStorage.push(dataArr);
        storeData(dataFromStorage);
      }
      setDataArr([]);
      pressConfirm();
    }
   
  };

  return (
    <View style={styles.inputBox}>
      <View style={[styles.vertical, { justifyContent: "space-between" }]}>
        <TouchableOpacity onPress={pressCancelBtn}>
          <Ionicons name="md-return-up-back-outline" size={40} color="black" />
        </TouchableOpacity>
        <Text>NEW!</Text>
        <TouchableOpacity onPress={pressConfirmBtn}>
          <Ionicons name="checkmark-done-outline" size={40} color="black" />
        </TouchableOpacity>
      </View>
      <View style={[styles.vertical, { justifyContent: "space-around" }]}>
        <TextInput
          onChangeText={(e) => {
            setWord(e);
          }}
          style={wordEmpty && styles.emptyInput}
          value={word}
          placeholder="단어를 입력하세요"
        />
        <TextInput
          onChangeText={(e) => {
            setKorean(e);
          }}
          style={koreanEmpty && styles.emptyInput}
          value={korean}
          placeholder="뜻을 입력하세요"
        />
      </View>
      <TextInput
        onChangeText={(e) => {
          setSentense(e);
        }}
        value={sentense}
        style={[
          // styles.inputText,
          { width: 220, maxHeight: 90 },
          sentenseEmpty && styles.emptyInput,
        ]}
        placeholder="예문을 입력하세요"
        multiline
      />
      <TouchableOpacity onPress={pressNextBtn}>
        <MaterialCommunityIcons
          name="arrow-right-circle-outline"
          size={40}
          color="black"
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  inputBox: {
    width: 300,
    height: 400,
    backgroundColor: "white",
    padding: 10,
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 20,
    backgroundColor: "#c9b39f",
  },
  vertical: {
    width: 280,
    flexDirection: "row",
    alignItems: "center",
  },
  inputText: {
    width: 220,
    maxHeight: 90,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: "white",
  },
  emptyInput: {
    // borderColor: "red",
    // borderWidth: 1,
    backgroundColor: "orange"
  },
});
