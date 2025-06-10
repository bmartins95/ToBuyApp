import { View, Image, TouchableOpacity, Text, FlatList, Alert } from "react-native";
import { useState } from "react"

import { Button } from "@/componnets/button"
import { Input } from "@/componnets/input";
import { Filter } from "@/componnets/filter";
import { FilterStatus } from "@/types/filter-status";

import { styles } from "./styles"
import { Item } from "@/componnets/item";

const FILTER_STATUS: FilterStatus[] = [FilterStatus.PENDING, FilterStatus.DONE]

export default function Home() {
  const [filter, setFilter] = useState(FilterStatus.PENDING)
  const [description, setDescription] = useState("")
  const [items, setItems] = useState<any>([])

  function handleAdd() {
    if (!description.trim()) {
      return Alert.alert("Add", "Please, inform item description.")
    }

    const newItem = {
      id: Math.random().toString(36).substring(2),
      description,
      status: FilterStatus.PENDING,
    }

    setItems((prevState) => [...prevState, newItem])
  }

  return (
    <View style={styles.container}>
      <Image source={require("@/assets/logo.png")} style={styles.logo}></Image>

      <View style={styles.form}>
        <Input
          placeholder="What do you need to buy?"
          onChangeText={setDescription}
        ></Input>
        <Button
          title="Add"
          onPress={handleAdd}
        ></Button>
      </View>

      <View style={styles.content}>
        <View style={styles.header}>
          {
            FILTER_STATUS.map((status) =>
              <Filter
                key={status}
                status={status}
                isActive={status === filter}
                onPress={() => setFilter(status)}
              ></Filter>
            )
          }
          <TouchableOpacity style={styles.clearButton}>
            <Text style={styles.clearText}>Clear</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={items}
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


