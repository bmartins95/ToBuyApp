import { View, Image } from "react-native";

import { Button } from "@/componnets/button"

import { styles } from "./styles"

export default function Home() {
  return (
    <View style={styles.container}>
      <Image source={require("@/assets/logo.png")} style={styles.logo}></Image>
      <Button title="Add"></Button>
    </View>
  );
}


