import { useNavigation } from "@react-navigation/native";
import {View, Text, Image, StyleSheet, Button, Pressable} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

function Header()
{

  const nav = useNavigation();
  return (
    <View style={Styles.headerContainer}>
      <SafeAreaView>
        <Pressable onPress={() => nav.navigate("Home")} style={Styles.navBar}>
          <Image style={Styles.image} source={require("../assets/logo.png")}/>
          <Text style={Styles.text}>BUDGETLY</Text> 
        </Pressable>
      </SafeAreaView>
    </View>
  )
}

const Styles = StyleSheet.create({
  headerContainer: {
    width: "100%"
  },

  image: {
    height: 120,
    width: 120
  },

  text: {
    fontSize: 36,
    textAlign: "center",
    color: "#F7F7F7"
  },

  navBar: {
    height: 150,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1c1c1e"
  }
})

export { Header };