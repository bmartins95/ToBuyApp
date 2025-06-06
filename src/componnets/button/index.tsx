import { TouchableOpacity, TouchableOpacityProps, Text } from "react-native";

import { styles } from "./styles"

type Props = TouchableOpacityProps & {
    title: string
}

export function Button({ title, activeOpacity = 0.8, ...rest }: Props) {
    return (
        <TouchableOpacity style={styles.container} activeOpacity={activeOpacity} {...rest}>
            <Text style={styles.title}>{title}</Text>
        </TouchableOpacity>
    )
}