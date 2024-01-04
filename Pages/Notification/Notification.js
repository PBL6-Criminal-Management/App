import React, { useState, useEffect, useContext } from "react";
import {
    View,
    StatusBar,
    Image,
    TouchableOpacity,
    ActivityIndicator,
    Modal,
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

const Notification = ({ navigation, route }) => {
    const { refreshToken, userInfo } = useContext(AuthContext);

    const [basicInformation, SetBasicInformation] = useState({});
    const [criminalInformation, SetCriminalInformation] = useState({});
    const [wantedInformation, SetWantedInformation] = useState({});
    const [titleInfo, SetTitleInfo] = useState(null);
    const [isLoading, SetIsLoading] = useState(false);
    const [isNotifyShow, SetIsNotifyShow] = useState(false);

    const [isModalVisible, SetIsModalVisible] = useState(false);
    const [fromScreen, SetFromScreen] = useState(null);

    const [criminalId, SetCriminalId] = useState(null);
    const [notifications, setNotifications] = useState([]);
    // const scrollY = useRef(new Animated.Value(0)).current;

    // _hubConnection = new HubConnectionBuilder()
    //     .withUrl(API_URL + "notification")
    //     .configureLogging(LogLevel.Debug)
    //     .build();
    // _hubConnection.start().then(a => {
    //     console.log('Connected rafa');
    // });
    // _hubConnection.on('ReceiveNotification', notification => {
    //     console.log("notification : " + notification)
    // });

    const getAllReportFromAPI = async () => {
        let result = await refreshToken();
        if (!result.isSuccessfully) {
            Toast.show({
                type: "error",
                text1: result.data,
            });
            return;
        }

        fetch(
            //&PageNumber=1&PageSize=10
            API_URL + `v1/report?OrderBy=sendingTime%20desc`,
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
            })
            .catch((e) => {
                console.log(`login error: ${e}`);
            });
    };

    useEffect(() => {
        const connection = new HubConnectionBuilder()
            .withUrl(API_URL + "notification?userId=" + userInfo.userId)
            .build();

        connection
            .start()
            .then(() => {
                connection.invoke("SendOfflineNotifications");
                console.log("SignalR Connected");
            })
            .catch((err) => console.log("SignalR Connection Error: ", err));

        connection.on("ReceiveNotification", (message) => {
            console.log("Notification : " + message);
            setNotifications([message, ...notifications]);
        });
        // connection.on("SendNotification", (message) => {
        //     console.log("Notification : " + notifications);
        // });
        return () => {
            connection.stop();
        };
    }, [notifications]);

    useEffect(() => {
        getAllReportFromAPI();
    }, []);

    return (
        <View style={[styles.container, { backgroundColor: "#F1F2F2" }]}>
            {/*statusbar to set wifi, battery... to white*/}
            <StatusBar
                barStyle="light-content"
                translucent
                backgroundColor="transparent"
            />
            {isLoading && (
                <View style={styles.waitingCircle}>
                    <ActivityIndicator size="large" color="green" />
                </View>
            )}
            <View style={[styles.head, { height: 350 }]}></View>
            <View
                style={[styles.content, { bottom: 400, alignItems: "center" }]}
            >
                <TouchableOpacity
                    style={styles.backContainer}
                    onPress={() => navigation.goBack()}
                >
                    <Image
                        source={require("../../Public/back.png")}
                        style={styles.backBtn}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.reloadContainer}
                    onPress={() => {
                        if (route.params?.criminalId)
                            getCriminalByIdFromAPI(route.params?.criminalId);
                    }}
                >
                    <Image
                        source={require("../../Public/sync.png")}
                        style={styles.reloadBtn}
                    />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => SetIsModalVisible(true)}>
                    <Image
                        style={styles.avatar}
                        source={{ uri: titleInfo?.image }}
                    ></Image>
                </TouchableOpacity>
                {titleInfo != null && (
                    <Modal
                        visible={isModalVisible}
                        transparent={true}
                        onRequestClose={() => {
                            SetIsModalVisible(!isModalVisible);
                        }}
                        onBackdropPress={() => SetIsModalVisible(false)}
                    >
                        <ImageViewer
                            imageUrls={[
                                {
                                    url: titleInfo?.image,
                                },
                            ]}
                            renderIndicator={() => {}}
                            onClick={() => SetIsModalVisible(false)}
                            enableSwipeDown={true}
                            onSwipeDown={() => SetIsModalVisible(false)}
                        />
                    </Modal>
                )}
                <CustomText style={styles.title}>{titleInfo?.name}</CustomText>
                <CustomText style={styles.note}>
                    Tội danh gần nhất: {titleInfo?.charge}
                </CustomText>
                <View
                    style={{
                        marginTop: 26,
                        width: "100%",
                    }}
                >
                    <CustomStickyView
                        style={{ height: 300 }}
                        data={[
                            {
                                title: "Báo cáo tội phạm",
                                listItems: notifications,
                            },
                        ]}
                        childrenKey={"listItems"}
                    />
                </View>
            </View>
            <Toast config={toastConfig} />
        </View>
    );
};
export default Notification;
