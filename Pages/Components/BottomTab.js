import React from "react";
import {
    StyleSheet,
    View,
    Image,
    TouchableOpacity,
    Dimensions,
} from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeTab from "../HomeTab/index";
import Criminal from "../Criminal/index";
import Case from "../Case/index";
import Profile from "../Profile/index";
import { CustomText } from "./CustomText";
import FaceDetectTab from "../FaceDetectTab/index";
import { scale } from "../../Utils/constants";

const Tab = createBottomTabNavigator();
const { width, height } = Dimensions.get("window");

const BottomTab = ({ navigation }) => {
    return (
        <View
            style={{
                width,
                height,
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
                                        color: focused ? "#386BF6" : "white",
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
                                        color: focused ? "#386BF6" : "white",
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
                    component={FaceDetectTab}
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
                />
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
                                        color: focused ? "#386BF6" : "white",
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
                                        color: focused ? "#386BF6" : "white",
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
});

export default BottomTab;
