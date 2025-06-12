import AsyncStorage from "@react-native-async-storage/async-storage";

import { FilterStatus } from "@/types/filter-status";

const ITEMS_STORAGE_KEY = "@tobuy:items"

export type ItemStorage = {
    id: string,
    status: FilterStatus,
    description: string,
}

async function get(): Promise<ItemStorage[]> {
    try {
        const storage = await AsyncStorage.getItem(ITEMS_STORAGE_KEY)
        return storage ? JSON.parse(storage) : []
    }
    catch (error) {
        throw new Error("ITEMS_GET: " + error)
    }
}

async function getByStatus(status: FilterStatus): Promise<ItemStorage[]> {
    const items = await get()
    return items.filter((items) => items.status === status)
}

async function getById(id: string): Promise<ItemStorage> {
    const items = await get()
    const result = items.filter((items) => items.id === id)
    if (result.length === 0) {
        throw new Error(`ITEM_BY_ID: Item with id ${id} not found.`)
    }
    else if (result.length > 1) {
        throw new Error("ITEM_BY_ID: More then one item with same id.")
    }
    else {
        return result[0]
    }
}

async function save(items: ItemStorage[]): Promise<void> {
    try {
        await AsyncStorage.setItem(ITEMS_STORAGE_KEY, JSON.stringify(items))
    }
    catch (error) {
        throw new Error("ITEMS_SAVE: " + error)
    }
}

async function add(newItem: ItemStorage): Promise<ItemStorage[]> {
    const items = await get()
    const updatedItems = [...items, newItem]
    await save(updatedItems)
    return updatedItems
}

async function remove(id: string): Promise<void> {
    const items = await get()
    const updatedItems = items.filter((item) => item.id !== id)
    await save(updatedItems)
}

async function clear(): Promise<void> {
    try {
        await AsyncStorage.removeItem(ITEMS_STORAGE_KEY)
    }
    catch (error) {
        throw new Error("ITEMS_CLEAR: " + error)
    }
}

async function update(itemToUpdate: ItemStorage) {
    const items = await get()
    const updatedItems = items.map((item) =>
        item.id === itemToUpdate.id ? itemToUpdate : item
    )
    await save(updatedItems)
}

export const itemsStorage = {
    get,
    getByStatus,
    getById,
    add,
    remove,
    clear,
    update
}