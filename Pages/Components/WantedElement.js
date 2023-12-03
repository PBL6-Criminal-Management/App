import React from "react";
import { View, StyleSheet, Image } from "react-native";

import { CustomText } from "../Components/CustomText.js";
import { TouchableOpacity } from "react-native-gesture-handler";
import { wantedType } from "../../Utils/constants.js";

const WantedElement = (props) => {
    const colorList = {
        0: "#FBC778",
        1: "#FC0808",
        2: "#63036C",
    };
    const BASE_PATH = "../../Public/";

    return (
        <TouchableOpacity
            style={[
                styles.container,
                { borderTopColor: colorList[props.item.wantedType] },
            ]}
            onPress={props.onPress}
        >
            <CustomText
                style={[
                    styles.wantedType,
                    { backgroundColor: colorList[props.item.wantedType] },
                ]}
            >
                {wantedType[props.item.wantedType]}
            </CustomText>
            <View style={styles.body}>
                <Image
                    style={styles.image}
                    source={{ uri: props.item.avatar }}
                />
                <View style={styles.textContainer}>
                    <CustomText
                        style={{
                            fontFamily: "Be Vietnam bold",
                            color: "black",
                        }}
                    >
                        {props.item.name}
                    </CustomText>

                    <View style={styles.content}>
                        <CustomText>
                            Năm sinh: {props.item.yearOfBirth}
                        </CustomText>
                        <CustomText>
                            Tội danh truy nã: {props.item.charge}
                        </CustomText>
                        <CustomText>
                            Đặc điểm: {props.item.characteristics}
                        </CustomText>
                        <CustomText>
                            Vũ khí: {props.item.murderWeapon}
                        </CustomText>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 20,
        borderWidth: 1,
        // borderStyle: 'dashed',
        borderRadius: 17,
        borderColor: "#8F9FBF",
        borderTopWidth: 4,
        padding: 8,
    },
    wantedType: {
        position: "absolute",
        top: 10,
        right: 10,
        borderRadius: 5,
        color: "white",
        padding: 5,
        overflow: "hidden",
    },
    body: {
        flex: 1,
        flexDirection: "row",
    },
    image: {
        width: 90,
        height: 90,
        borderWidth: 1,
        borderRadius: 100,
        alignSelf: "center",
        resizeMode: "stretch",
    },
    textContainer: {
        flex: 1,
    },
    content: {
        paddingLeft: 20,
    },
    foot: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        height: 50,
    },
});

export default WantedElement;
