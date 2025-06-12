import { View, Image, TouchableOpacity, Text, FlatList, Alert } from "react-native";
import { useState, useEffect } from "react"

import { Button } from "@/componnets/button"
import { Input } from "@/componnets/input";
import { Filter } from "@/componnets/filter";
import { FilterStatus } from "@/types/filter-status";
import { Item } from "@/componnets/item";
import { itemsStorage, ItemStorage } from "@/storage/item-storage";

import { styles } from "./styles"

const FILTER_STATUS: FilterStatus[] = [FilterStatus.PENDING, FilterStatus.DONE]

export default function Home() {
  const [filter, setFilter] = useState(FilterStatus.PENDING)
  const [description, setDescription] = useState("")
  const [items, setItems] = useState<ItemStorage[]>([])

  async function handleAdd() {
    if (!description.trim()) {
      return Alert.alert("Add", "Please, inform item description.")
    }

    const newItem = {
      id: Math.random().toString(36).substring(2),
      description,
      status: FilterStatus.PENDING,
    }

    await itemsStorage.add(newItem)
    await updateItemsByStatus()

    setDescription("")
    setFilter(FilterStatus.PENDING)
  }

  async function handleRemove(id: string) {
    try {
      await itemsStorage.remove(id)
      await updateItemsByStatus()
    }
    catch (error) {
      return Alert.alert("Remove", "Failed to remove item.")
    }
  }

  function handleClear() {
    Alert.alert("Clear", "Are you sure you want to remove all items?", [
      { text: "Yes", onPress: () => onClear() },
      { text: "No", style: "cancel" },
    ])
  }

  async function handleChangeStatus(id: string) {
    try {
      const item = await itemsStorage.getById(id)
      item.status = item.status === FilterStatus.PENDING ? FilterStatus.DONE : FilterStatus.PENDING
      await itemsStorage.update(item)
      await updateItemsByStatus()
    }
    catch (error) {
      return Alert.alert("Change Status", "Failed to change item status.")
    }
  }

  async function onClear() {
    try {
      await itemsStorage.clear()
      await updateItemsByStatus()
    }
    catch (error) {
      return Alert.alert("Clear", "Failed to clear items.")
    }
  }

  async function updateItemsByStatus() {
    try {
      const response = await itemsStorage.getByStatus(filter)
      setItems(response)
    }
    catch (error) {
      Alert.alert("Error", "Error while getting items.")
    }
  }

  useEffect(() => {
    updateItemsByStatus()
  }, [filter])

  return (
    <View style={styles.container}>
      <Image source={require("@/assets/logo.png")} style={styles.logo}></Image>

      <View style={styles.form}>
        <Input
          placeholder="What do you need to buy?"
          onChangeText={setDescription}
          value={description}
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
          <TouchableOpacity style={styles.clearButton} onPress={handleClear}>
            <Text style={styles.clearText}>Clear</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={items}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Item
              data={item}
              onRemove={() => { handleRemove(item.id) }}
              onStatus={() => { handleChangeStatus(item.id) }}
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


