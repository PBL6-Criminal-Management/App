import React, { useEffect, useState } from "react";
import {
    View,
    StyleSheet,
    ScrollView,
    Modal,
    Pressable,
    Image,
} from "react-native";
import ImageViewer from "react-native-image-zoom-viewer";

import { CustomText } from "./CustomText.js";

const InformationFlat = (props) => {
    const [isModalVisible, SetIsModalVisible] = useState(false);
    const [imageIndex, SetImageIndex] = useState(0);
    const [isShow, SetIsShow] = useState(false);

    const convertToArrayOfObjects = (input) => {
        if (Array.isArray(input)) {
            return input;
        } else {
            return [input];
        }
    };

    useEffect(() => {
        if (props.isShow !== null && props.isShow !== undefined)
            SetIsShow(props.isShow);
    }, [props]);

    return (
        isShow &&
        Object.keys(props.listItems).length > 0 && (
            <View
                style={[
                    styles.body,
                    {
                        paddingHorizontal: props.paddingHorizontal
                            ? props.paddingHorizontal
                            : 0,
                        paddingTop:
                            props.firstTopPadding != undefined
                                ? props.firstTopPadding
                                : 0,
                        paddingBottom: 20,
                        borderTopLeftRadius: 5,
                        borderTopRightRadius: 5,
                        marginBottom: 20,
                    },
                ]}
            >
                {convertToArrayOfObjects(props.listItems).map((item, index) => {
                    return (
                        <View
                            key={index}
                            style={{
                                borderRadius: 10,
                                width: "100%",
                                paddingVertical: 10,
                                paddingLeft: 15,
                                borderStyle: "solid",
                                borderWidth: 1,
                                borderColor: "lightgray",
                            }}
                        >
                            {Object.entries(item)
                                .filter(([key, value]) => key != "Id")
                                .map(([key, value], index) => {
                                    return (
                                        <View
                                            key={index}
                                            style={{
                                                flexDirection: "column",
                                                paddingBottom: 10,
                                            }}
                                        >
                                            {(key != "images" ||
                                                (item.images.items != null &&
                                                    item.images.items.length >
                                                        0)) && (
                                                <CustomText
                                                    style={{
                                                        fontFamily:
                                                            "Be Vietnam bold",
                                                        color: "#08354F",
                                                    }}
                                                >
                                                    {key != "images"
                                                        ? key
                                                        : value.title}
                                                    :
                                                </CustomText>
                                            )}
                                            {(key == "Vụ án liên quan" ||
                                                key == "Vụ án") &&
                                            props.navigation != undefined ? (
                                                <View
                                                    style={{
                                                        display: "flex",
                                                        flexDirection: "row",
                                                        gap: 15,
                                                    }}
                                                >
                                                    {value
                                                        .toString()
                                                        .split(",")
                                                        .map((c, id) => {
                                                            return (
                                                                <CustomText
                                                                    key={id}
                                                                    style={{
                                                                        color: "#53B6ED",
                                                                        textDecorationLine:
                                                                            "underline",
                                                                    }}
                                                                    onPress={() => {
                                                                        console.log(
                                                                            "CaseDetail",
                                                                            (params =
                                                                                {
                                                                                    caseId: c,
                                                                                    fromScreen:
                                                                                        props.fromScreen,
                                                                                })
                                                                        );
                                                                        props.navigation.navigate(
                                                                            "CaseDetail",
                                                                            (params =
                                                                                {
                                                                                    caseId: c,
                                                                                    fromScreen:
                                                                                        props.fromScreen,
                                                                                })
                                                                        );
                                                                    }}
                                                                >
                                                                    Vụ án{" "}
                                                                    {id + 1}
                                                                </CustomText>
                                                            );
                                                        })}
                                                </View>
                                            ) : key != "images" ? (
                                                <CustomText style={{}}>
                                                    {value}
                                                </CustomText>
                                            ) : (
                                                item.images.items != null &&
                                                item.images.items.length >
                                                    0 && (
                                                    <>
                                                        <ScrollView
                                                            snapToInterval={200}
                                                            decelerationRate={
                                                                "fast"
                                                            }
                                                            alwaysBounceHorizontal={
                                                                true
                                                            }
                                                            horizontal
                                                            contentContainerStyle={{
                                                                alignItems:
                                                                    "center",
                                                                justifyContent:
                                                                    "center",
                                                            }}
                                                        >
                                                            {value.items.map(
                                                                (
                                                                    image,
                                                                    index
                                                                ) => (
                                                                    <Pressable
                                                                        key={
                                                                            index
                                                                        }
                                                                        onPress={() => {
                                                                            SetImageIndex(
                                                                                index
                                                                            );
                                                                            SetIsModalVisible(
                                                                                true
                                                                            );
                                                                        }}
                                                                    >
                                                                        <Image
                                                                            source={{
                                                                                uri: image.url,
                                                                            }}
                                                                            style={
                                                                                styles.image
                                                                            }
                                                                        />
                                                                    </Pressable>
                                                                )
                                                            )}
                                                        </ScrollView>
                                                        <Modal
                                                            visible={
                                                                isModalVisible
                                                            }
                                                            transparent={true}
                                                            onRequestClose={() => {
                                                                SetIsModalVisible(
                                                                    !isModalVisible
                                                                );
                                                            }}
                                                            onBackdropPress={() =>
                                                                SetIsModalVisible(
                                                                    false
                                                                )
                                                            }
                                                        >
                                                            <ImageViewer
                                                                index={
                                                                    imageIndex
                                                                }
                                                                imageUrls={
                                                                    value.items
                                                                }
                                                                onClick={() =>
                                                                    SetIsModalVisible(
                                                                        false
                                                                    )
                                                                }
                                                                enableSwipeDown={
                                                                    true
                                                                }
                                                                onSwipeDown={() =>
                                                                    SetIsModalVisible(
                                                                        false
                                                                    )
                                                                }
                                                            />
                                                        </Modal>
                                                    </>
                                                )
                                            )}
                                        </View>
                                    );
                                })}
                            {props.hasDetailView && (
                                <View style={{ alignSelf: "center" }}>
                                    <CustomText
                                        style={{
                                            color: "#53B6ED",
                                            textDecorationLine: "underline",
                                        }}
                                        onPress={() => {
                                            console.log(
                                                "CriminalDetail",
                                                (params = {
                                                    criminalId: item.Id,
                                                    fromScreen:
                                                        props.fromScreen,
                                                })
                                            );
                                            props.navigation.navigate(
                                                "CriminalDetail",
                                                (params = {
                                                    criminalId: item.Id,
                                                    fromScreen:
                                                        props.fromScreen,
                                                })
                                            );
                                        }}
                                    >
                                        Xem chi tiết
                                    </CustomText>
                                </View>
                            )}
                        </View>
                    );
                })}
            </View>
        )
    );
};

const styles = StyleSheet.create({
    body: {
        flexDirection: "column",
        width: "100%",
        backgroundColor: "white",
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
        gap: 10,
    },
    image: {
        width: 200,
        height: 200,
        marginRight: 10,
        resizeMode: "contain",
        backgroundColor: "#f2f5ff",
    },
});

export default InformationFlat;
