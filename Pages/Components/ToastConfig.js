import React from "react";
import { View, Text, Pressable, StyleSheet, Dimensions } from "react-native";

// BaseToast styles
const HEIGHT = 60;
const WIDTH = "90%";
const BORDER_RADIUS = 5;

const styles = StyleSheet.create({
    base: {
        flexDirection: "row",
        // height: HEIGHT,
        width: WIDTH,
        borderRadius: BORDER_RADIUS,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.1,
        shadowRadius: BORDER_RADIUS,
        elevation: 2,
        backgroundColor: "#FFF",
    },
    leadingBorder: {
        borderLeftWidth: 5,
        borderLeftColor: "#D8D8D8",
    },
    contentContainer: {
        paddingHorizontal: 20,
        flex: 1,
        justifyContent: "center",
        alignItems: "flex-start",
    },
    text1: {
        fontSize: 12,
        fontWeight: "bold",
        marginBottom: 2,
        color: "#000",
        width: "100%",
    },
    text2: {
        fontSize: 10,
        color: "#979797",
        width: "100%",
    },
});

const CustomBaseToast = ({ text1, text2, onPress, color }) => {
    const screenWidth = Dimensions.get("window").width;
    const height1 =
        text1 != undefined && text1 != null
            ? 40 + Math.ceil((text1.length * 8.2) / screenWidth) * 12
            : 0;
    const height2 =
        text2 != undefined && text2 != null
            ? 40 + Math.ceil((text2.length * 8.2) / screenWidth) * 12
            : 0;
    return (
        <Pressable
            onPress={onPress}
            style={[
                styles.base,
                styles.leadingBorder,
                {
                    height: height1 + height2,
                    borderLeftColor: color,
                },
            ]}
        >
            <View style={styles.contentContainer}>
                {text1 && <Text style={styles.text1}>{text1}</Text>}
                {text2 && <Text style={styles.text2}>{text2}</Text>}
            </View>
        </Pressable>
    );
};

export const toastConfig = {
    success: (props) => <CustomBaseToast {...props} color={"#69C779"} />,
    info: (props) => <CustomBaseToast {...props} color={"#87CEFA"} />,
    error: (props) => <CustomBaseToast {...props} color={"#FE6301"} />,
};
