import React, { useState, useContext, useEffect } from "react";
import {
    View,
    TouchableOpacity,
    ScrollView,
    Image,
    StatusBar,
    TextInput,
    Pressable,
    Modal,
    TouchableWithoutFeedback,
    KeyboardAvoidingView,
} from "react-native";
import Toast from "react-native-toast-message";
import { toastConfig } from "../Components/ToastConfig.js";
import DateTimePicker from "@react-native-community/datetimepicker";
import {
    API_URL,
    roleEnum,
    textInputDefaultSize,
} from "../../Utils/constants.js";
import Moment from "moment";
import styles from "./style.js";
import { AuthContext } from "../../Context/AuthContext.js";
import DropDown from "../Components/DropDown.js";
import { CustomText } from "../Components/CustomText.js";
import { scale } from "../../Utils/constants";

const ProfileEdit = ({ navigation, route }) => {
    const { logout, refreshToken, userInfo } = useContext(AuthContext);
    const [, SetIsLoading] = useState(false);
    const [profile, SetProfile] = useState(null);

    //value
    const [open, setOpen] = useState(false);
    const [value, SetValue] = useState();
    const [items, SetItems] = useState([
        { label: "Nam", value: true },
        { label: "Nữ", value: false },
    ]);

    // Windows-specific
    const [isShow, SetIsShow] = useState(false);
    const [isWarningShow, SetIsWarningShow] = useState(false);
    const [time, setTime] = useState();
    const [interval, setMinInterval] = useState(1);
    const [is24Hours, set24Hours] = useState(false);

    const onTimeChange = (event, newTime) => {
        if (Platform.OS === "android") {
            SetIsShow(false);
        }

        setTime(Moment(newTime, "DD/MM/YYYY").toDate());
        handleInputChange("birthday", newTime.toLocaleDateString("en-GB"));
    };

    const handleInputChange = (fieldName, value) => {
        SetProfile((prevState) => ({
            ...prevState,
            [fieldName]: value,
        }));
    };

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
                    SetValue(res.data.gender);
                    setTime(Moment(res.data.birthday, "DD/MM/YYYY").toDate());
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

    const submitProfile = async () => {
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

        fetch(API_URL + `v1/account`, {
            method: "PUT", // *GET, POST, PUT, DELETE, etc.
            mode: "cors", // no-cors, cors, *same-origin
            cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            credentials: "same-origin", // include, *same-origin, omit
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${result.data}`,
            },
            redirect: "follow", // manual, *follow, error
            referrer: "no-referrer", // no-referrer, *client
            body: JSON.stringify({
                id: userInfo.userId,
                name: profile.name,
                citizenId: profile.citizenId,
                birthday: profile.birthday,
                address: profile.address,
                email: profile.email,
                phoneNumber: profile.phoneNumber,
                role: profile.role,
                gender: profile.gender,
                isActive: profile.isActive,
                image: profile.image,
            }),
        })
            .then((res) => res.json())
            .then((res) => {
                if (res.succeeded) {
                    navigation.navigate("ProfileDetail", {
                        forceFetch: true,
                        updateSuccess: true,
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

    const checkLogic = () => {};

    useEffect(() => {
        getProfileFromAPI();
    }, []);

    useEffect(() => {
        if (value != null) handleInputChange("gender", value);
    }, [value]);

    return (
        <View style={styles.container}>
            {/* statusbar to set wifi, battery... to white */}
            <StatusBar
                barStyle="light-content"
                translucent
                backgroundColor="transparent"
            />
            <View style={[styles.head, { height: 350 }]}></View>
            {profile != null && (
                <View
                    style={[
                        styles.content,
                        { bottom: 510, alignItems: "center" },
                    ]}
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
                                                không? Thông tin thay đổi của
                                                bạn có thể sẽ không được lưu!
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
                    <KeyboardAvoidingView
                        behavior={Platform.OS === "ios" ? "padding" : "height"}
                        style={styles.body}
                    >
                        <View style={styles.title}>
                            <Image
                                source={require("../../Public/userInformation.png")}
                            ></Image>
                            <CustomText>Thông tin cơ bản</CustomText>
                        </View>
                        <ScrollView
                            contentContainerStyle={{ paddingBottom: 50 }}
                        >
                            <View>
                                <CustomText
                                    style={{
                                        fontFamily: "Be Vietnam bold",
                                        color: "#08354F",
                                    }}
                                >
                                    Họ và tên
                                </CustomText>
                                <TextInput
                                    style={{
                                        fontSize: textInputDefaultSize * scale,
                                    }}
                                    value={profile.name}
                                    onChangeText={(name) =>
                                        handleInputChange("name", name)
                                    }
                                ></TextInput>
                                <View
                                    style={{
                                        height: 1,
                                        borderWidth: 1,
                                        borderColor: "#DFE0E2",
                                    }}
                                ></View>
                            </View>
                            <View style={{ marginTop: 15 }}>
                                <CustomText
                                    style={{
                                        fontFamily: "Be Vietnam bold",
                                        color: "#08354F",
                                    }}
                                >
                                    Chức vụ
                                </CustomText>
                                <CustomText
                                    style={{
                                        fontSize: 14 * scale,
                                        color: "black",
                                    }}
                                >
                                    {roleEnum[profile.role]}
                                </CustomText>
                            </View>
                            <View
                                style={{
                                    marginTop: 15,
                                }}
                            >
                                <CustomText
                                    style={{
                                        fontFamily: "Be Vietnam bold",
                                        color: "#08354F",
                                    }}
                                >
                                    Ngày sinh
                                </CustomText>
                                <Pressable
                                    style={{
                                        flexDirection: "row",
                                        gap: 5,
                                    }}
                                    onPress={() => SetIsShow(true)}
                                >
                                    {/* <TextInput
                                            style={{
                                                fontSize:
                                                    textInputDefaultSize *
                                                    scale,
                                            }}
                                            pointerEvents="none"
                                        >
                                            {new Date(time).toLocaleDateString(
                                                "en-GB"
                                            )}
                                        </TextInput> */}
                                    <CustomText
                                        style={{
                                            fontSize:
                                                textInputDefaultSize * scale,
                                        }}
                                    >
                                        {new Date(time).toLocaleDateString(
                                            "en-GB"
                                        )}
                                    </CustomText>
                                    <Image
                                        source={require("../../Public/calendar.png")}
                                    ></Image>
                                </Pressable>
                                {isShow && (
                                    <DateTimePicker
                                        mode="date"
                                        value={time}
                                        style={{
                                            width: 300,
                                            opacity: 1,
                                            height: 140,
                                            marginVertical: 10,
                                        }}
                                        onChange={onTimeChange}
                                        is24Hour={is24Hours}
                                        minuteInterval={interval}
                                        display="spinner"
                                    />
                                )}
                                <View
                                    style={{
                                        height: 1,
                                        borderWidth: 1,
                                        borderColor: "#DFE0E2",
                                    }}
                                ></View>
                            </View>
                            <View
                                style={[
                                    { marginTop: 15 },
                                    Platform.OS === "ios" && {
                                        zIndex: 10,
                                    },
                                ]}
                            >
                                <DropDown
                                    title="Giới tính"
                                    titleColor={"#08354F"}
                                    placeholder="Chọn giới tính"
                                    value={value}
                                    items={items}
                                    setValue={SetValue}
                                    setItems={SetItems}
                                    multiple={false}
                                />
                                <View
                                    style={{
                                        height: 1,
                                        borderWidth: 1,
                                        borderColor: "#DFE0E2",
                                    }}
                                ></View>
                            </View>
                            <View style={{ marginTop: 15 }}>
                                <CustomText
                                    style={{
                                        fontFamily: "Be Vietnam bold",
                                        color: "#08354F",
                                    }}
                                >
                                    Số điện thoại
                                </CustomText>
                                <TextInput
                                    style={{
                                        fontSize: textInputDefaultSize * scale,
                                    }}
                                    onChangeText={(phoneNumber) =>
                                        handleInputChange(
                                            "phoneNumber",
                                            phoneNumber
                                        )
                                    }
                                >
                                    {profile.phoneNumber}
                                </TextInput>
                                <View
                                    style={{
                                        height: 1,
                                        borderWidth: 1,
                                        borderColor: "#DFE0E2",
                                    }}
                                ></View>
                            </View>
                            <View style={{ marginTop: 15 }}>
                                <CustomText
                                    style={{
                                        fontFamily: "Be Vietnam bold",
                                        color: "#08354F",
                                    }}
                                >
                                    Email
                                </CustomText>
                                <TextInput
                                    style={{
                                        fontSize: textInputDefaultSize * scale,
                                    }}
                                    onChangeText={(email) =>
                                        handleInputChange("email", email)
                                    }
                                >
                                    {profile.email}
                                </TextInput>
                                <View
                                    style={{
                                        height: 1,
                                        borderWidth: 1,
                                        borderColor: "#DFE0E2",
                                    }}
                                ></View>
                            </View>
                        </ScrollView>
                    </KeyboardAvoidingView>
                    <TouchableOpacity
                        onPress={() => submitProfile()}
                        style={[styles.btnAgree, { width: "100%" }]}
                    >
                        <CustomText
                            style={{
                                color: "white",
                                fontFamily: "Be Vietnam bold",
                            }}
                        >
                            Xác nhận
                        </CustomText>
                    </TouchableOpacity>
                </View>
            )}
            <Toast config={toastConfig} />
        </View>
    );
};
export default ProfileEdit;
