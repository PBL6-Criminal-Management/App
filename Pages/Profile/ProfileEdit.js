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
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import Moment from "moment";
import styles from "./style.js";
import { AuthContext } from "../../Context/AuthContext.js";
import { roleEnum } from "../../Utils/constants.js";
import { CustomText } from "../Components/CustomText.js";

const ProfileEdit = ({ navigation, route }) => {
    const [userInfo, SetUserInfo] = useState(null);
    const { logout } = useContext(AuthContext);
    const [open, setOpen] = useState(false);
    const [value, SetValue] = useState();
    const [selectedTime, SetSelectedTime] = useState();
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
        SetSelectedTime(newTime);
    };

    const checkLogic = () => {};

    useEffect(() => {
        if (route.params?.userInfo) {
            SetUserInfo(route.params?.userInfo);
        }
    }, [route.params]);

    useEffect(() => {
        if (userInfo != null) {
            SetValue(userInfo.gender);
            setTime(Moment(userInfo.birthday, "YYYY-MM-DD").toDate());
        }
    }, [userInfo]);

    return (
        <Pressable onPress={() => setOpen(false)} style={{ flex: 1 }}>
            <View style={styles.container}>
                {/* statusbar to set wifi, battery... to white */}
                <StatusBar barStyle="light-content" />
                <View style={[styles.head, { height: 350 }]}></View>
                {userInfo && (
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
                                                        fontSize: 14,
                                                        width: 270,
                                                    }}
                                                >
                                                    Bạn có chắc chắn muốn đăng
                                                    xuất không? Thông tin thay
                                                    đổi của bạn có thể sẽ không
                                                    được lưu!
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
                            source={userInfo.image}
                        ></Image>
                        <CustomText style={styles.name}>
                            {userInfo.fullName}
                        </CustomText>
                        <CustomText style={styles.note}>
                            {roleEnum[userInfo.position]}
                        </CustomText>
                        <View style={styles.body}>
                            <View style={styles.title}>
                                <Image
                                    source={require("../../Public/userInformation.png")}
                                ></Image>
                                <CustomText>Thông tin cơ bản</CustomText>
                            </View>
                            <ScrollView>
                                <View>
                                    <CustomText
                                        style={{
                                            fontFamily: "Be Vietnam bold",
                                            color: "#08354F",
                                        }}
                                    >
                                        Họ và tên
                                    </CustomText>
                                    <TextInput>{userInfo.fullName}</TextInput>
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
                                    <TextInput>
                                        {roleEnum[userInfo.position]}
                                    </TextInput>
                                    <View
                                        style={{
                                            height: 1,
                                            borderWidth: 1,
                                            borderColor: "#DFE0E2",
                                        }}
                                    ></View>
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
                                        <TextInput pointerEvents="none">
                                            {new Date(time).toLocaleDateString(
                                                "en-GB"
                                            )}
                                        </TextInput>
                                        <Image
                                            source={require("../../Public/calendar.png")}
                                        ></Image>
                                    </Pressable>
                                    <View
                                        style={{
                                            height: 1,
                                            borderWidth: 1,
                                            borderColor: "#DFE0E2",
                                        }}
                                    ></View>
                                    <Modal
                                        animationType="slide"
                                        transparent={true}
                                        visible={isShow}
                                        onRequestClose={() => {
                                            SetIsShow(!isShow);
                                        }}
                                    >
                                        <TouchableWithoutFeedback
                                            onPressOut={() => SetIsShow(false)}
                                        >
                                            <View style={styles.modalContainer}>
                                                <TouchableWithoutFeedback>
                                                    <View
                                                        style={styles.modalView}
                                                    >
                                                        <View
                                                            style={
                                                                styles.modalHead
                                                            }
                                                        >
                                                            <TouchableOpacity
                                                                style={
                                                                    styles.iconCancel
                                                                }
                                                                onPress={() =>
                                                                    SetIsShow(
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
                                                                Chọn ngày sinh
                                                            </CustomText>
                                                        </View>
                                                        <DateTimePicker
                                                            mode="date"
                                                            value={time}
                                                            style={{
                                                                width: 300,
                                                                opacity: 1,
                                                                height: 140,
                                                                marginVertical: 10,
                                                            }}
                                                            onChange={
                                                                onTimeChange
                                                            }
                                                            is24Hour={is24Hours}
                                                            minuteInterval={
                                                                interval
                                                            }
                                                            display="spinner"
                                                        />
                                                        <TouchableOpacity
                                                            onPress={() => {
                                                                setTime(
                                                                    selectedTime
                                                                );
                                                                SetIsShow(
                                                                    false
                                                                );
                                                            }}
                                                            style={
                                                                styles.btnAgree
                                                            }
                                                        >
                                                            <CustomText
                                                                style={{
                                                                    color: "white",
                                                                    fontFamily:
                                                                        "Be Vietnam bold",
                                                                }}
                                                            >
                                                                Xác nhận
                                                            </CustomText>
                                                        </TouchableOpacity>
                                                    </View>
                                                </TouchableWithoutFeedback>
                                            </View>
                                        </TouchableWithoutFeedback>
                                    </Modal>
                                </View>
                                <View
                                    style={[
                                        { marginTop: 15 },
                                        Platform.OS === "ios" && { zIndex: 10 },
                                    ]}
                                >
                                    <CustomText
                                        style={{
                                            fontFamily: "Be Vietnam bold",
                                            color: "#08354F",
                                        }}
                                    >
                                        Giới tính
                                    </CustomText>
                                    <DropDownPicker
                                        open={open}
                                        value={value}
                                        items={items}
                                        setOpen={setOpen}
                                        setValue={SetValue}
                                        setItems={SetItems}
                                        mode="BADGE"
                                        placeholder={"Chọn giới tính"}
                                        placeholderStyle={{
                                            color: "#BFC0C1",
                                        }}
                                        containerStyle={{
                                            width: "67%" /*width: 300*/,
                                        }}
                                        listMode="SCROLLVIEW"
                                        containerProps={{ height: 56 }}
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
                                    <TextInput>
                                        {userInfo.phoneNumber}
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
                                    <TextInput>{userInfo.email}</TextInput>
                                    <View
                                        style={{
                                            height: 1,
                                            borderWidth: 1,
                                            borderColor: "#DFE0E2",
                                        }}
                                    ></View>
                                </View>
                            </ScrollView>
                        </View>
                        <TouchableOpacity
                            // onPress={() =>
                            //     handleConfirmWrong(props.item._id)
                            // }
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
            </View>
        </Pressable>
    );
};
export default ProfileEdit;
