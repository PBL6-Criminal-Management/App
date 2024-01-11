import React, { useState, useEffect, useContext } from "react";
import {
    View,
    StatusBar,
    Image,
    TouchableOpacity,
    ActivityIndicator,
    Modal,
    ScrollView,
    RefreshControl,
} from "react-native";
import ImageViewer from "react-native-image-zoom-viewer";
import { AuthContext } from "../../Context/AuthContext.js";
import styles from "./style.js";
import { CustomText } from "../Components/CustomText.js";
import Toast from "react-native-toast-message";
import { API_URL, criminalStatus, wantedType } from "../../Utils/constants.js";
import { toastConfig } from "../Components/ToastConfig.js";
import CustomStickyView from "../Components/CustomStickyView.js";
import { HubConnectionBuilder } from "@microsoft/signalr";
import { setupURLPolyfill } from "react-native-url-polyfill";
import NotificationElement from "../Components/NotificationElement.js";

const Notification = ({ navigation, route }) => {
    const { refreshToken, userInfo } = useContext(AuthContext);
    const [refresh, SetRefresh] = useState(false);
    const [isLoading, SetIsLoading] = useState(false);
    const [notifications, setNotifications] = useState([]);
    // const { isNotify } = route.params;
    let isNotify = false;
    if (route.params != undefined && route.params.notify != undefined) {
        isNotify = true;
    }
    const getAllReportFromAPI = async () => {
        SetIsLoading(!refresh);
        let result = await refreshToken();
        if (!result.isSuccessfully) {
            Toast.show({
                type: "error",
                text1: result.data,
            });
            SetIsLoading(false);
            return;
        }

        fetch(
            //&PageNumber=1&PageSize=10
            API_URL + `v1/report?OrderBy=createdAt%20desc`,
            {
                method: "GET", // *GET, POST, PUT, DELETE, etc.
                mode: "cors", // no-cors, cors, *same-origin
                cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
                credentials: "same-origin", // include, *same-origin, omit
                headers: {
                    Accept: "application/json",
                    Authorization: `Bearer ${result.data}`,
                },
                redirect: "follow", // manual, *follow, error
                referrer: "no-referrer", // no-referrer, *client
            }
        )
            .then((res) => res.json())
            .then((res) => {
                if (res.succeeded) {
                    setNotifications([...res.data, ...notifications]);
                } else {
                    console.log(res);
                }
                SetIsLoading(false);
            })
            .catch((e) => {
                console.log(`login error: ${e}`);
                SetIsLoading(false);
            });
    };

    useEffect(() => {
        getAllReportFromAPI();
    }, []);
    useEffect(() => {
        if (refresh) {
            getAllReportFromAPI();
            SetRefresh(false);
        }
    }, [refresh]);
    useEffect(() => {
        if (isNotify) {
            getAllReportFromAPI();
        }
    }, [isNotify]);
    return (
        <View style={styles.container}>
            {/*statusbar to set wifi, battery... to white*/}
            <StatusBar
                barStyle="light-content"
                translucent
                backgroundColor="transparent"
            />
            <View style={[styles.head, { height: 250 }]}></View>
            <View style={[styles.content, { bottom: 140 }]}>
                <CustomText style={styles.title}>Danh sách báo cáo</CustomText>
                <View style={styles.body}>
                    {isLoading && (
                        <View style={styles.waitingCircle}>
                            <ActivityIndicator size="large" color="green" />
                        </View>
                    )}
                    {notifications && (
                        <ScrollView
                            style={styles.scroll}
                            refreshControl={
                                <RefreshControl
                                    style={{ tintColor: "white" }}
                                    refreshing={refresh}
                                    onRefresh={() => SetRefresh(true)}
                                />
                            }
                        >
                            {notifications.map((item, index) => {
                                // const Max_Image_Number = 20;
                                // if (index < Max_Image_Number)
                                return (
                                    <NotificationElement
                                        key={index}
                                        item={item}
                                    />
                                );
                            })}
                        </ScrollView>
                    )}
                </View>
            </View>
            <Toast config={toastConfig} />
        </View>
    );
};
export default Notification;
