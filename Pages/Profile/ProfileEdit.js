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
    ActivityIndicator,
} from "react-native";
import { Formik } from "formik";
import * as yup from "yup";
import Toast from "react-native-toast-message";
import { toastConfig } from "../Components/ToastConfig.js";
import * as ImagePicker from "expo-image-picker";
import DateTimePickerModal from "react-native-modal-datetime-picker";
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

const ProfileEdit = ({ navigation }) => {
    const { logout, refreshToken, userInfo } = useContext(AuthContext);
    const [isLoading, SetIsLoading] = useState(false);
    const [profile, SetProfile] = useState(null);

    //value
    const [items, SetItems] = useState([
        { label: "Nam", value: true },
        { label: "Nữ", value: false },
    ]);

    // Windows-specific
    const [isShow, SetIsShow] = useState(false);
    const [isWarningShow, SetIsWarningShow] = useState(false);

    const [changeAvatar, SetChangeAvatar] = useState(false);

    const chooseImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });
        if (!result.canceled) {
            handleInputChange("imageLink", result.assets[0].uri);
            SetChangeAvatar(true);
        }
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

    const submitProfile = async (newProfileData) => {
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

        if (changeAvatar) {
            const formData = new FormData();
            const image = {
                uri: newProfileData.imageLink,
                type: "image/jpeg",
                name: "photo.jpg",
            };
            formData.append("Files", image);
            formData.append("FilePath", "Avatar/" + newProfileData.username);

            fetch(API_URL + `v1/upload`, {
                method: "POST", // *GET, POST, PUT, DELETE, etc.
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
                body: formData,
            })
                .then((res) => res.json())
                .then(async (res) => {
                    if (res.succeeded) {
                        try {
                            await updateProfileToApi(result.data, {
                                ...newProfileData,
                                image: res.data[0].filePath,
                            });
                        } catch (e) {
                            console.log(`login error: ${e}`);
                            Toast.show({
                                type: "error",
                                text1: "Có lỗi xảy ra: " + e,
                            });
                            SetIsLoading(false);
                        }
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
        } else
            updateProfileToApi(result.data, {
                ...newProfileData,
                image: newProfileData.image,
            });
    };

    const updateProfileToApi = async (token, newProfileData, image) => {
        await fetch(API_URL + `v1/account`, {
            method: "PUT", // *GET, POST, PUT, DELETE, etc.
            mode: "cors", // no-cors, cors, *same-origin
            cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            credentials: "same-origin", // include, *same-origin, omit
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
            },
            redirect: "follow", // manual, *follow, error
            referrer: "no-referrer", // no-referrer, *client
            body: JSON.stringify(newProfileData),
        })
            .then((res) => res.json())
            .then((res) => {
                if (res.succeeded) {
                    SetIsLoading(false);
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
                    SetIsLoading(false);
                }
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

    const validationSchema = yup.object().shape({
        name: yup
            .string()
            .max(100, "Tên không được vượt quá 100 ký tự!")
            .required("Tên là bắt buộc"),
        email: yup
            .string()
            .max(100, "Email không được vượt quá 100 ký tự!")
            .email("Định dạng email không hợp lệ!")
            .required("Email là bắt buộc"),
        phoneNumber: yup
            .string()
            .max(15, "Số điện thoại không được vượt quá 15 ký tự!")
            .matches(
                /^(?:\+84|84|0)(3|5|7|8|9|1[2689])([0-9]{8,10})\b$/,
                "Số điện thoại không hợp lệ"
            )
            .required("Số điện thoại là bắt buộc"),
        image: yup
            .string()
            .max(500, "Đường dẫn ảnh không được vượt quá 500 ký tự"),
    });

    return (
        <Formik
            enableReinitialize={true}
            initialValues={
                profile
                    ? {
                          ...profile,
                          birthday: Moment(
                              profile.birthday,
                              "DD/MM/YYYY"
                          ).toDate(),
                      }
                    : {
                          name: "",
                          role: "",
                          birthday: new Date(),
                          gender: null,
                          phoneNumber: "",
                          email: "",
                          image: "",
                          imageLink: undefined,
                      }
            }
            validationSchema={validationSchema}
            onSubmit={(values) => {
                // Handle form submission logic here
                submitProfile({
                    id: userInfo.userId,
                    name: values.name,
                    citizenId: values.citizenId,
                    address: values.address,
                    role: values.role,
                    isActive: values.isActive,
                    birthday: Moment(values.birthday).format("DD/MM/YYYY"),
                    email: values.email,
                    phoneNumber: values.phoneNumber,
                    gender: values.gender,
                    image: values.image,
                    imageLink: values.imageLink,
                });
            }}
        >
            {({
                handleChange,
                handleBlur,
                handleSubmit,
                setFieldValue,
                values,
                errors,
                touched,
            }) => (
                <View style={styles.container}>
                    {/* statusbar to set wifi, battery... to white */}
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
                                <Image
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
                                                        style={
                                                            styles.iconCancel
                                                        }
                                                        onPress={() =>
                                                            SetIsWarningShow(
                                                                false
                                                            )
                                                        }
                                                    >
                                                        <Image
                                                            source={require("../../Public/darkCancel.png")}
                                                        />
                                                    </TouchableOpacity>
                                                    <CustomText
                                                        style={
                                                            styles.modalTitle
                                                        }
                                                    >
                                                        Cảnh báo
                                                    </CustomText>
                                                </View>
                                                <View
                                                    style={styles.modalContent}
                                                >
                                                    <CustomText
                                                        style={{
                                                            fontSize:
                                                                14 * scale,
                                                            width: 270,
                                                        }}
                                                    >
                                                        Bạn có chắc chắn muốn
                                                        đăng xuất không? Thông
                                                        tin thay đổi của bạn có
                                                        thể sẽ không được lưu!
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
                                                            SetIsWarningShow(
                                                                false
                                                            );
                                                            logout();
                                                        }}
                                                        style={
                                                            styles.btnConfirm
                                                        }
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
                                                            SetIsWarningShow(
                                                                false
                                                            )
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
                            <TouchableOpacity
                                style={styles.imageViewContainer}
                                onPress={() => chooseImage()}
                            >
                                <Image
                                    style={styles.image}
                                    source={{ uri: values.imageLink }}
                                ></Image>
                                <View style={styles.imageOverlay} />
                                <Image
                                    style={{
                                        width: 50,
                                        height: 50,
                                    }}
                                    source={require("../../Public/camera.png")}
                                />
                            </TouchableOpacity>
                            <CustomText style={styles.name}>
                                {values.name}
                            </CustomText>
                            <CustomText style={styles.note}>
                                {roleEnum[values.role]}
                            </CustomText>
                            <View
                                behavior={
                                    Platform.OS === "ios" ? "padding" : "height"
                                }
                                style={styles.body}
                            >
                                <View style={styles.title}>
                                    <Image
                                        source={require("../../Public/userInformation.png")}
                                    ></Image>
                                    <CustomText>Thông tin cơ bản</CustomText>
                                </View>
                                <ScrollView
                                    contentContainerStyle={{
                                        paddingBottom: 85,
                                    }}
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
                                                fontSize:
                                                    textInputDefaultSize *
                                                    scale,
                                                color: "#5C5D60",
                                                opacity: 1,
                                            }}
                                            value={values.name}
                                            onChangeText={handleChange("name")}
                                            onBlur={handleBlur("name")}
                                            placeholder="Họ và tên"
                                        ></TextInput>
                                        <View
                                            style={{
                                                height: 1,
                                                borderWidth: 1,
                                                borderColor: "#DFE0E2",
                                            }}
                                        ></View>
                                        {touched.name && errors.name && (
                                            <CustomText style={styles.error}>
                                                {errors.name}
                                            </CustomText>
                                        )}
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
                                        <CustomText>
                                            {roleEnum[values.role]}
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
                                            <CustomText
                                                style={{
                                                    fontSize:
                                                        textInputDefaultSize *
                                                        scale,
                                                }}
                                            >
                                                {new Date(
                                                    values.birthday
                                                ).toLocaleDateString("en-GB")}
                                            </CustomText>
                                            <Image
                                                source={require("../../Public/calendar.png")}
                                            ></Image>
                                        </Pressable>
                                        <DateTimePickerModal
                                            isVisible={isShow}
                                            mode="date"
                                            date={Moment(
                                                values.birthday,
                                                "DD/MM/YYYY"
                                            ).toDate()}
                                            onConfirm={(date) => {
                                                setFieldValue("birthday", date);
                                                SetIsShow(false);
                                            }}
                                            onCancel={() => SetIsShow(false)}
                                            locale="vi"
                                            confirmTextIOS={"Xác nhận"}
                                            cancelTextIOS={"Huỷ"}
                                            confirmTextAndroid={"Xác Nhận"}
                                            cancelTextAndroid={"Huỷ"}
                                        />
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
                                            value={values.gender}
                                            items={items}
                                            setValue={(val) => {
                                                setFieldValue("gender", val());
                                            }}
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
                                                fontSize:
                                                    textInputDefaultSize *
                                                    scale,
                                                color: "#5C5D60",
                                                opacity: 1,
                                            }}
                                            onChangeText={handleChange(
                                                "phoneNumber"
                                            )}
                                        >
                                            {values.phoneNumber}
                                        </TextInput>
                                        <View
                                            style={{
                                                height: 1,
                                                borderWidth: 1,
                                                borderColor: "#DFE0E2",
                                            }}
                                        ></View>
                                        {touched.phoneNumber &&
                                            errors.phoneNumber && (
                                                <CustomText
                                                    style={styles.error}
                                                >
                                                    {errors.phoneNumber}
                                                </CustomText>
                                            )}
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
                                                fontSize:
                                                    textInputDefaultSize *
                                                    scale,
                                                color: "#5C5D60",
                                                opacity: 1,
                                            }}
                                            onChangeText={handleChange("email")}
                                            onBlur={handleBlur("email")}
                                            placeholder="Email"
                                            keyboardType="email-address"
                                        >
                                            {values.email}
                                        </TextInput>
                                        <View
                                            style={{
                                                height: 1,
                                                borderWidth: 1,
                                                borderColor: "#DFE0E2",
                                            }}
                                        ></View>
                                        {touched.email && errors.email && (
                                            <CustomText style={styles.error}>
                                                {errors.email}
                                            </CustomText>
                                        )}
                                    </View>
                                </ScrollView>
                            </View>
                            <TouchableOpacity
                                onPress={handleSubmit}
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
            )}
        </Formik>
    );
};
export default ProfileEdit;
