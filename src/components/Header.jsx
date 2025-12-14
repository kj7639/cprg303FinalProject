import {View, Text, Image, StyleSheet, Button} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

function Header()
{
  return (
    <View style={Styles.headerContainer}>
      <SafeAreaView style={Styles.navBar} >
        <Image style={Styles.image} source={require("../assets/logo.png")}/>
        <Text style={Styles.text}>BUDGETLY</Text> 
      </SafeAreaView>
    </View>
  )
}

const Styles = StyleSheet.create({
  headerContainer: {
    position: "absolute",
    width: "100%",
    top: 0
  
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