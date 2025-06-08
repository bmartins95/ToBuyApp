import { View, Image, TouchableOpacity, Text, FlatList } from "react-native";

import { Button } from "@/componnets/button"
import { Input } from "@/componnets/input";
import { Filter } from "@/componnets/filter";
import { FilterStatus } from "@/types/filter-status";

import { styles } from "./styles"
import { Item } from "@/componnets/item";

const FILTER_STATUS: FilterStatus[] = [FilterStatus.PENDING, FilterStatus.DONE]
const ITEMS = [
  {
    id: "1",
    status: FilterStatus.DONE,
    description: "1 kg of coffe",
  },
  {
    id: "2",
    status: FilterStatus.PENDING,
    description: "2 noodles",
  },
  {
    id: "3",
    status: FilterStatus.PENDING,
    description: "1 bread",
  }
]

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
          <TouchableOpacity style={styles.clearButton}>
            <Text style={styles.clearText}>Clear</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={ITEMS}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Item
              data={item}
              onRemove={() => { }}
              onStatus={() => { }}
            ></Item>
          )}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={styles.separator}></View>}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={() => <Text style={styles.empty}>No items here yet.</Text>}
        >
        </FlatList>
      </View>
    </View>
  );
}


