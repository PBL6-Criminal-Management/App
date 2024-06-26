import React, { useContext, useEffect, useState } from "react";
import {
    View,
    TouchableOpacity,
    ScrollView,
    Image,
    StatusBar,
    Modal,
    TouchableWithoutFeedback,
    ActivityIndicator,
} from "react-native";
import ImageViewer from "react-native-image-zoom-viewer";
import Toast from "react-native-toast-message";
import styles from "./style.js";
import { AuthContext } from "../../Context/AuthContext.js";
import { API_URL, roleEnum } from "../../Utils/constants.js";
import { CustomText } from "../Components/CustomText.js";
import InformationFlat from "../Components/InformationFlat.js";
import { toastConfig } from "../Components/ToastConfig.js";

const Profile = ({ navigation, route }) => {
    const { refreshToken } = useContext(AuthContext);
    const [profile, SetProfile] = useState([]);
    const [userInformation, SetUserInformation] = useState([]);
    const [isLoading, SetIsLoading] = useState(false);
    const [isModalVisible, SetIsModalVisible] = useState(false);

    const getProfileFromAPI = async () => {
        SetIsLoading(true);
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
            API_URL + `v1/profile`,
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
                    SetProfile(res.data);
                    SetUserInformation({
                        "Họ và tên": res.data.name,
                        "Chức vụ": roleEnum[res.data.role],
                        "Ngày sinh": res.data.birthday,
                        "Giới tính": res.data.gender ? "Nam" : "Nữ",
                        "Số điện thoại": res.data.phoneNumber,
                        Email: res.data.email,
                    });
                } else {
                    console.log(res);
                    Toast.show({
                        type: "info",
                        text1:
                            res.messages != null
                                ? res.messages
                                : res.title
                                ? res.title
                                : res,
                    });
                }
                SetIsLoading(false);
            })
            .catch((e) => {
                console.log(`login error: ${e}`);
                Toast.show({
                    type: "error",
                    text1: "Có lỗi xảy ra: " + e,
                });
                SetIsLoading(false);
            });
    };

    useEffect(() => {
        getProfileFromAPI();
    }, []);

    useEffect(() => {
        if (route.params?.updateSuccess != undefined)
            if (route.params?.updateSuccess)
                Toast.show({
                    type: "info",
                    text1: "Cập nhật thông tin thành công!",
                });
            else
                Toast.show({
                    type: "error",
                    text1: "Cập nhật thông tin thất bại!",
                });

        if (route.params?.forceFetch) {
            // Call your API to fetch new profile
            getProfileFromAPI();
        }
    }, [route.params]);

    const checkLogic = () => {};

    return (
        <View style={styles.container}>
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
                style={[styles.content, { bottom: 510, alignItems: "center" }]}
            >
                <TouchableOpacity
                    style={styles.reloadContainer}
                    onPress={() => {
                        getProfileFromAPI();
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
                        source={
                            profile.imageLink
                                ? { uri: profile.imageLink }
                                : require("../../Public/notFoundAvatar.png")
                        }
                    ></Image>
                </TouchableOpacity>
                {profile != null && (
                    <Modal
                        visible={isModalVisible}
                        transparent={true}
                        onRequestClose={() => {
                            SetIsModalVisible(!isModalVisible);
                        }}
                        onBackdropPress={() => SetIsModalVisible(false)}
                    >
                        <ImageViewer
                            index={0}
                            imageUrls={[
                                {
                                    url: profile.imageLink,
                                },
                            ]}
                            renderIndicator={() => {}}
                            onClick={() => SetIsModalVisible(false)}
                            enableSwipeDown={true}
                            onSwipeDown={() => SetIsModalVisible(false)}
                        />
                    </Modal>
                )}
                <CustomText style={styles.name}>{profile.name}</CustomText>
                <CustomText style={styles.note}>
                    {roleEnum[profile.role]}
                </CustomText>
                <View style={styles.body}>
                    <View style={styles.title}>
                        <Image
                            source={require("../../Public/userInformation.png")}
                        ></Image>
                        <CustomText>Thông tin cơ bản</CustomText>
                    </View>
                    <ScrollView
                        showsVerticalScrollIndicator={true}
                        persistentScrollbar={true}
                    >
                        <InformationFlat
                            listItems={userInformation}
                            isShow={true}
                        />
                    </ScrollView>
                </View>
                <TouchableOpacity
                    onPress={() => navigation.navigate("ProfileEdit")}
                    style={[styles.btnAgree, { width: "100%" }]}
                >
                    <CustomText
                        style={{
                            color: "white",
                            fontFamily: "Be Vietnam bold",
                        }}
                    >
                        Chỉnh sửa thông tin
                    </CustomText>
                </TouchableOpacity>
            </View>
            <Toast config={toastConfig} />
        </View>
    );
};
export default Profile;
