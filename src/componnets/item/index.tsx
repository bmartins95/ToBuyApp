import { View, Text, TouchableOpacity } from "react-native"
import { Trash2 } from "lucide-react-native"

import { styles } from "./styles"
import { StatusIcon } from "../status-icon"
import { FilterStatus } from "@/types/filter-status"

type ItemData = {
    status: FilterStatus,
    description: string,
}

type Props = {
    data: ItemData,
    onStatus: () => void,
    onRemove: () => void,
}

export function Item({ data, onStatus, onRemove }: Props) {
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={onStatus}>
                <StatusIcon status={data.status}></StatusIcon>
            </TouchableOpacity>
            
            <Text style={styles.description}>
                {data.description}
            </Text>
            
            <TouchableOpacity onPress={onRemove}>
                <Trash2 size={18} color={"#828282"}></Trash2>
            </TouchableOpacity>
        </View>
    )
}