import { View, Image } from "react-native";

import { Button } from "@/componnets/button"
import { Input } from "@/componnets/input";
import { Filter } from "@/componnets/filter";
import { FilterStatus } from "@/types/filter-status";

import { styles } from "./styles"

export default function Home() {
  return (
    <View style={styles.container}>
      <Image source={require("@/assets/logo.png")} style={styles.logo}></Image>

      <View style={styles.form}>
        <Input placeholder="What do you need to buy?"></Input>
        <Button title="Add"></Button>
      </View>

      <View style={styles.content}>
          <Filter status={FilterStatus.DONE} isActive={true} ></Filter>
          <Filter status={FilterStatus.PENDING} isActive={true} ></Filter>
      </View>
    </View>
  );
}


