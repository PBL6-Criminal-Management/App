import React, { useContext, useEffect, useState } from "react";
import {
    View,
    TouchableOpacity,
    ScrollView,
    Image,
    StatusBar,
    Modal,
    TouchableWithoutFeedback,
} from "react-native";
import Toast from "react-native-toast-message";
import styles from "./style.js";
import { AuthContext } from "../../Context/AuthContext.js";
import { API_URL, roleEnum } from "../../Utils/constants.js";
import { CustomText } from "../Components/CustomText.js";
import InformationFlat from "../Components/InformationFlat.js";
import { toastConfig } from "../Components/ToastConfig.js";

const Profile = ({ navigation }) => {
    const { logout, userInfo, refreshToken } = useContext(AuthContext);
    const [isWarningShow, SetIsWarningShow] = useState(false);
    const [profile, SetProfile] = useState([]);
    const [userInformation, SetUserInformation] = useState([]);
    const [, SetIsLoading] = useState(false);

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
            API_URL + `v1/account/${userInfo.userId}`,
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
                        text1: res.messages != null ? res.messages : res,
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

    const checkLogic = () => {};

    return (
        <View style={styles.container}>
            {/*statusbar to set wifi, battery... to white*/}
            <StatusBar barStyle="light-content" />
            <View style={[styles.head, { height: 350 }]}></View>
            <View
                style={[styles.content, { bottom: 510, alignItems: "center" }]}
            >
                <TouchableOpacity
                    onPress={() => SetIsWarningShow(true)}
                    style={styles.btnLogout}
                >
                    <Image source={require("../../Public/logout.png")} />
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
                                        <CustomText style={styles.modalTitle}>
                                            Cảnh báo
                                        </CustomText>
                                    </View>
                                    <View style={styles.modalContent}>
                                        <CustomText
                                            style={{
                                                fontSize: 14,
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
                <Image
                    style={styles.avatar}
                    source={{ uri: profile.imageLink }}
                ></Image>
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
                        <InformationFlat listItems={userInformation} />
                    </ScrollView>
                </View>
                <TouchableOpacity
                    onPress={() =>
                        navigation.navigate(
                            "ProfileEdit",
                            (params = { userInfo: profile })
                        )
                    }
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
