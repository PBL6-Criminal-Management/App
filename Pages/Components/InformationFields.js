import React, { useState } from "react";
import {
    View,
    StyleSheet,
    Image,
    Pressable,
    ScrollView,
    Modal,
} from "react-native";
import ImageViewer from "react-native-image-zoom-viewer";

import { CustomText } from "./CustomText.js";

const InformationFields = (props) => {
    const [isDropDown, SetIsDropDown] = useState(true);
    const [isModalVisible, SetIsModalVisible] = useState(false);
    const [imageIndex, SetImageIndex] = useState(0);

    const onHeadPressed = () => {
        SetIsDropDown(!isDropDown);
    };

    return (
        <View style={styles.container}>
            <Pressable onPress={onHeadPressed} style={{ width: "100%" }}>
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        backgroundColor: "#384664",
                        height: 56,
                        padding: 20,
                        borderTopLeftRadius: 5,
                        borderTopRightRadius: 5,
                        borderBottomLeftRadius: !isDropDown ? 5 : 0,
                        borderBottomRightRadius: !isDropDown ? 5 : 0,
                    }}
                >
                    <CustomText
                        style={{
                            fontFamily: "Be Vietnam bold",
                            color: "white",
                            backgroundColor: "#384664",
                            height: 20,
                        }}
                    >
                        {props.title}
                    </CustomText>
                    <Image
                        source={
                            isDropDown
                                ? require("../../Public/upArrow.png")
                                : require("../../Public/downArrow.png")
                        }
                        style={{ tintColor: "white" }}
                    />
                </View>
            </Pressable>
            <View style={styles.body}>
                {Object.keys(props.listItems).map((_, index) => {
                    return (
                        isDropDown && (
                            <View
                                key={index}
                                style={{
                                    flexDirection: "column",
                                    paddingBottom: 20,
                                    paddingTop: index == 0 ? 18 : 0,
                                }}
                            >
                                <CustomText
                                    style={{
                                        fontFamily: "Be Vietnam bold",
                                        color: "#08354F",
                                    }}
                                >
                                    {Object.keys(props.listItems)[index]}:{" "}
                                </CustomText>
                                <CustomText style={{}}>
                                    {Object.values(props.listItems)[index]}
                                </CustomText>
                            </View>
                        )
                    );
                })}
                {props.haveImages && (
                    <View style={{}}>
                        <CustomText
                            style={{
                                fontFamily: "Be Vietnam bold",
                                color: "#08354F",
                            }}
                        >
                            {props.imagesFieldName}
                        </CustomText>
                        <View
                            style={{
                                marginTop: 5,
                                paddingBottom: 20,
                            }}
                        >
                            <ScrollView
                                snapToInterval={200}
                                decelerationRate={"fast"}
                                alwaysBounceHorizontal={true}
                                horizontal
                                contentContainerStyle={{
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            >
                                {props.images.map((image, index) => (
                                    <Pressable
                                        key={index}
                                        onPress={() => {
                                            SetImageIndex(index);
                                            SetIsModalVisible(true);
                                        }}
                                    >
                                        <Image
                                            source={{ uri: image.url }}
                                            style={styles.image}
                                        />
                                    </Pressable>
                                ))}
                            </ScrollView>
                        </View>
                        <Modal
                            visible={isModalVisible}
                            transparent={true}
                            onRequestClose={() => {
                                SetIsModalVisible(!isModalVisible);
                            }}
                            onBackdropPress={() => SetIsModalVisible(false)}
                        >
                            <ImageViewer
                                index={imageIndex}
                                imageUrls={props.images}
                                onClick={() => SetIsModalVisible(false)}
                                enableSwipeDown={true}
                                onSwipeDown={() => SetIsModalVisible(false)}
                            />
                        </Modal>
                    </View>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 10,
    },
    body: {
        flexDirection: "column",
        width: "100%",
        paddingHorizontal: 32,
        backgroundColor: "white",
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
    },
    image: {
        width: 200,
        height: 200,
        marginRight: 10,
        resizeMode: "contain",
    },
});

export default InformationFields;
