import { View, Image, TouchableOpacity, Text } from "react-native";

import { Button } from "@/componnets/button"
import { Input } from "@/componnets/input";
import { Filter } from "@/componnets/filter";
import { FilterStatus } from "@/types/filter-status";

import { styles } from "./styles"
import { Item } from "@/componnets/item";

const FILTER_STATUS: FilterStatus[] = [FilterStatus.PENDING, FilterStatus.DONE]

export default function Home() {
  return (
    <View style={styles.container}>
      <Image source={require("@/assets/logo.png")} style={styles.logo}></Image>

      <View style={styles.form}>
        <Input placeholder="What do you need to buy?"></Input>
        <Button title="Add"></Button>
      </View>

      <View style={styles.content}>
        <View style={styles.header}>
          {
            FILTER_STATUS.map((status) =>
              <Filter key={status} status={status} isActive={true} ></Filter>
            )
          }
          <TouchableOpacity style={styles.clearButton} activeOpacity={0.8}>
            <Text style={styles.clearText}>Clear</Text>
          </TouchableOpacity>
        </View>

        <Item
          data={{ status: FilterStatus.DONE, description: "Coffe" }}
          onRemove={() => {}}
          onStatus={() => {}}
        ></Item>
      </View>
    </View>
  );
}


