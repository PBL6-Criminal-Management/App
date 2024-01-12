import React, { useState, useContext, useEffect } from "react";
import {
    StyleSheet,
    View,
    Image,
    TouchableOpacity,
    Dimensions,
    Modal,
    TouchableWithoutFeedback,
} from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeTab from "../HomeTab/index";
import Criminal from "../Criminal/index";
import Case from "../Case/index";
import Profile from "../Profile/index";
import { CustomText } from "./CustomText";
import FaceDetectTab from "../FaceDetectTab/index";
import { AuthContext } from "../../Context/AuthContext.js";
import { API_URL, scale } from "../../Utils/constants";
// import { HubConnectionBuilder, LogLevel } from '@aspnet/signalr';
import { HubConnectionBuilder } from "@microsoft/signalr";
import { setupURLPolyfill } from "react-native-url-polyfill";
import Notification from "../Notification/Notification.js";

setupURLPolyfill();

const Tab = createBottomTabNavigator();
const { width, height } = Dimensions.get("window");

const BottomTab = ({ navigation }) => {
    const [isWarningShow, SetIsWarningShow] = useState(false);
    const [isNavBarShow, SetIsNavBarShow] = useState(true);
    const [isNotify, SetIsNotify] = useState(false);
    const { logout, userInfo, refreshToken } = useContext(AuthContext);
    useEffect(() => {
        const connection = new HubConnectionBuilder()
            .withUrl(API_URL + "notification?userId=" + userInfo.userId)
            .build();

        connection.start();

        connection.on("ReceiveNotification", (message) => {
            SetIsNotify(true);
        });
        return () => {
            connection.stop();
        };
    }, [isNotify]);
    return (
        <View
            style={{
                position: "relative",
            }}
        >
            {isNavBarShow && (
                <>
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate("Notification", {
                                notify: isNotify,
                            });
                            SetIsNotify(false);
                        }}
                        style={styles.btnNotify}
                    >
                        {!isNotify ? (
                            <Image
                                style={{
                                    height: 25,
                                    width: 25,
                                }}
                                source={require("../../Public/bell.png")}
                            />
                        ) : (
                            <Image
                                style={{
                                    height: 25,
                                    width: 25,
                                }}
                                source={require("../../Public/bell-notify.png")}
                            />
                        )}
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => SetIsWarningShow(true)}
                        style={styles.btnLogout}
                    >
                        <Image
                            style={{
                                height: 25,
                                width: 25,
                            }}
                            source={require("../../Public/logout.png")}
                        />
                    </TouchableOpacity>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={isWarningShow}
                        onRequestClose={() => {
                            SetIsWarningShow(!isWarningShow);
                        }}
                    >
                        <TouchableWithoutFeedback
                            onPressOut={() => SetIsWarningShow(false)}
                        >
                            <View style={styles.modalContainer}>
                                <TouchableWithoutFeedback>
                                    <View style={styles.modalView}>
                                        <View style={styles.modalHead}>
                                            <TouchableOpacity
                                                style={styles.iconCancel}
                                                onPress={() =>
                                                    SetIsWarningShow(false)
                                                }
                                            >
                                                <Image
                                                    source={require("../../Public/darkCancel.png")}
                                                />
                                            </TouchableOpacity>
                                            <CustomText
                                                style={styles.modalTitle}
                                            >
                                                Cảnh báo
                                            </CustomText>
                                        </View>
                                        <View style={styles.modalContent}>
                                            <CustomText
                                                style={{
                                                    fontSize: 14 * scale,
                                                    width: 270,
                                                }}
                                            >
                                                Bạn có chắc chắn muốn đăng xuất
                                                không?
                                            </CustomText>
                                        </View>
                                        <View
                                            style={{
                                                flexDirection: "row",
                                                gap: 20,
                                            }}
                                        >
                                            <TouchableOpacity
                                                onPress={() => {
                                                    SetIsWarningShow(false);
                                                    logout();
                                                }}
                                                style={styles.btnConfirm}
                                            >
                                                <CustomText
                                                    style={{
                                                        color: "white",
                                                        fontFamily:
                                                            "Be Vietnam bold",
                                                    }}
                                                >
                                                    Đăng xuất
                                                </CustomText>
                                            </TouchableOpacity>
                                            <TouchableOpacity
                                                onPress={() =>
                                                    SetIsWarningShow(false)
                                                }
                                                style={styles.btnCancel}
                                            >
                                                <CustomText
                                                    style={{
                                                        color: "#4F4F4F",
                                                        fontFamily:
                                                            "Be Vietnam bold",
                                                    }}
                                                >
                                                    Huỷ
                                                </CustomText>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </TouchableWithoutFeedback>
                            </View>
                        </TouchableWithoutFeedback>
                    </Modal>
                </>
            )}
            <View
                style={{
                    width,
                    height: "100%",
                }}
            >
                <Tab.Navigator
                    screenOptions={{
                        headerShown: false,
                        tabBarShowLabel: false,
                        tabBarStyle: {
                            position: "absolute",
                            elevation: 0,
                            backgroundColor: "#1E1E1E",
                            borderTopLeftRadius: 10,
                            borderTopRightRadius: 10,
                            height: 96,
                            ...styles.shadow,
                        },
                    }}
                >
                    <Tab.Screen
                        name="Home"
                        component={HomeTab}
                        options={{
                            tabBarIcon: ({ focused }) => (
                                <View
                                    style={{
                                        alignItems: "center",
                                        justifyContent: "center",
                                        top: 3,
                                    }}
                                >
                                    <Image
                                        source={require("../../Public/home.png")}
                                        resizeMode="contain"
                                        style={{
                                            width: 25,
                                            height: 25,
                                            tintColor: focused
                                                ? "#386BF6"
                                                : "white",
                                        }}
                                    />
                                    <CustomText
                                        style={{
                                            color: focused
                                                ? "#386BF6"
                                                : "white",
                                            fontSize: 12 * scale,
                                        }}
                                    >
                                        Trang chủ
                                    </CustomText>
                                </View>
                            ),
                        }}
                    />
                    <Tab.Screen
                        name="Notification"
                        component={Notification}
                        options={{ tabBarButton: () => null }}
                    />
                    <Tab.Screen
                        name="Criminals"
                        component={Criminal}
                        options={{
                            tabBarIcon: ({ focused }) => (
                                <View
                                    style={{
                                        alignItems: "center",
                                        justifyContent: "center",
                                        top: 3,
                                    }}
                                >
                                    <Image
                                        source={require("../../Public/criminal.png")}
                                        resizeMode="contain"
                                        style={{
                                            width: 25,
                                            height: 25,
                                            tintColor: focused
                                                ? "#386BF6"
                                                : "white",
                                        }}
                                    />
                                    <CustomText
                                        style={{
                                            color: focused
                                                ? "#386BF6"
                                                : "white",
                                            fontSize: 12 * scale,
                                        }}
                                    >
                                        Tội phạm
                                    </CustomText>
                                </View>
                            ),
                        }}
                    />
                    <Tab.Screen
                        name="FaceDetectTab"
                        options={{
                            tabBarIcon: () => (
                                <Image
                                    source={require("../../Public/AI.png")}
                                    resizeMode="contain"
                                    style={{
                                        width: 78,
                                        height: 78,
                                    }}
                                />
                            ),
                            tabBarButton: (props) => (
                                <TouchableOpacity
                                    style={{
                                        top: -20,
                                        justifyContent: "center",
                                        alignItems: "center",
                                        // ...styles.shadow
                                    }}
                                    onPress={props.onPress}
                                >
                                    <View
                                        style={{
                                            width: 100,
                                            height: 100,
                                            borderRadius: 100,
                                            backgroundColor: "#1E1E1E",
                                        }}
                                    >
                                        {props.children}
                                    </View>
                                </TouchableOpacity>
                            ),
                            tabBarStyle: { display: "none" },
                        }}
                    >
                        {() => (
                            <FaceDetectTab SetIsNavBarShow={SetIsNavBarShow} />
                        )}
                    </Tab.Screen>
                    <Tab.Screen
                        name="Case"
                        component={Case}
                        options={{
                            tabBarIcon: ({ focused }) => (
                                <View
                                    style={{
                                        alignItems: "center",
                                        justifyContent: "center",
                                        top: 3,
                                    }}
                                >
                                    <Image
                                        source={require("../../Public/case.png")}
                                        resizeMode="stretch"
                                        style={{
                                            width: 25,
                                            height: 25,
                                            tintColor: focused
                                                ? "#386BF6"
                                                : "white",
                                        }}
                                    />
                                    <CustomText
                                        style={{
                                            color: focused
                                                ? "#386BF6"
                                                : "white",
                                            fontSize: 12 * scale,
                                        }}
                                    >
                                        Vụ án
                                    </CustomText>
                                </View>
                            ),
                        }}
                    />
                    <Tab.Screen
                        name="Profile"
                        component={Profile}
                        options={{
                            tabBarIcon: ({ focused }) => (
                                <View
                                    style={{
                                        alignItems: "center",
                                        justifyContent: "center",
                                        top: 3,
                                    }}
                                >
                                    <Image
                                        source={require("../../Public/profile.png")}
                                        resizeMode="contain"
                                        style={{
                                            width: 25,
                                            height: 25,
                                            tintColor: focused
                                                ? "#386BF6"
                                                : "white",
                                        }}
                                    />
                                    <CustomText
                                        style={{
                                            color: focused
                                                ? "#386BF6"
                                                : "white",
                                            fontSize: 12 * scale,
                                        }}
                                    >
                                        Cá nhân
                                    </CustomText>
                                </View>
                            ),
                        }}
                    />
                </Tab.Navigator>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    shadow: {
        shadowColor: "#7F5DF0",
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
        elevation: 5,
    },
    btnLogout: {
        position: "absolute",
        right: 20,
        top: 50,
        paddingBottom: 15,
        paddingLeft: 10,
        zIndex: 1,
    },
    btnNotify: {
        position: "absolute",
        right: 60,
        top: 50,
        paddingBottom: 15,
        paddingLeft: 10,
        zIndex: 1,
    },
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    modalView: {
        alignItems: "center",
        backgroundColor: "white",
        borderRadius: 10,
        paddingVertical: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: 310,
    },
    modalHead: {
        flexDirection: "row",
        width: "100%",
        justifyContent: "center",
    },
    iconCancel: {
        position: "absolute",
        left: 10,
        padding: 5,
    },
    modalTitle: {
        fontSize: 15 * scale,
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center",
        fontSize: 15 * scale,
    },
    modalContent: {
        height: 100,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 15,
    },
    btnConfirm: {
        width: 130,
        height: 56,
        backgroundColor: "#FF495F",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 5,
    },
    btnCancel: {
        width: 130,
        height: 56,
        backgroundColor: "#F1F1F1",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 5,
    },
});

export default BottomTab;
