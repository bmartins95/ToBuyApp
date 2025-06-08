import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "#d0d2d8",
        paddingTop: 62,
    },
    logo: {
        height: 34,
        width: 134,
    },
    form: {
        width: "100%",
        paddingHorizontal: 16,
        gap: 7,
        marginTop: 42
    },
    content: {
        flex: 1,
        width: "100%",
        backgroundColor: "#FFFFFF",
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        paddingTop: 32,
        padding: 24,
        marginTop: 24,
    },
    header: {
        width: "100%",
        flexDirection: "row",
        gap: 12,
        borderBottomWidth: 1,
        borderBottomColor: "#e4e6ec",
        paddingBottom: 12,
    },
    clearButton: {
        marginLeft: "auto",
    },
    clearText: {
        fontSize: 12,
        fontWeight: 600,
        color: "#828282"
    }
});