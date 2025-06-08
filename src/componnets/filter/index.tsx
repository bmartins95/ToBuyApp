import { TouchableOpacity, TouchableOpacityProps, Text } from "react-native";

import { styles } from "./styles"

import { FilterStatus } from "@/types/filter-status";
import { StatusIcon } from "../status-icon"; 

type Props = TouchableOpacityProps & {
    status: FilterStatus,
    isActive: boolean
}

export function Filter({ status, isActive, ...rest }: Props) {
    return (
        <TouchableOpacity style={[styles.container, { opacity: isActive ? 1 : 0.5 }]} {...rest} >
            <StatusIcon status={status} ></StatusIcon>
            <Text style={styles.title}>
                {status === FilterStatus.DONE ? "Boughts" : "Pending"}
            </Text>
        </TouchableOpacity>
    )
}