import { useNavigation } from "@react-navigation/native";
import {View, Text, Image, StyleSheet, Button, Pressable} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

function Footer() {
  const nav = useNavigation();
  return (
    <View style={Styles.footerContainer}>
      <SafeAreaView style={Styles.navBar}>
        <Pressable onPress={() => nav.navigate("Analytics")}style={Styles.item}>
          <Image style={Styles.images} source={require("../assets/pie-chart-fill 1.png")} />
          <Text style={Styles.text}>ANALYTICS</Text>
        </Pressable>

        <Pressable onPress={() => nav.navigate("Home")} style={Styles.item}>
          <Image style={Styles.images} source={require("../assets/house 1.png")} />
          <Text style={Styles.text}>HOME</Text>
        </Pressable>

        <Pressable onPress={() => nav.navigate("Settings")} style={Styles.item}>
          <Image style={Styles.images} source={require("../assets/Vector.png")} />
          <Text style={Styles.text}>SETTINGS</Text>
        </Pressable>
      </SafeAreaView>
    </View>
  );
}

const Styles = StyleSheet.create({
  footerContainer: {
    width: "100%",
    position: "absolute",
    bottom: 0,
  },

  navBar: {
    height: 100,
    width: "100%",
    flexDirection: "row",
    backgroundColor: "#1c1c1e",
    justifyContent: "space-around",
    alignItems: "center",
  },

  item: {
    alignItems: "center",
  },

  images: {
    height: 36,
    width: 36,
  },

  text: {
    fontSize: 12,
    color: "#F7F7F7",
  },
});

export { Footer };