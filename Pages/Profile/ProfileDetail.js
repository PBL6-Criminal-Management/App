import React, { useContext, useState } from "react";
import {
    View,
    TouchableOpacity,
    ScrollView,
    Image,
    StatusBar,
    Modal,
    TouchableWithoutFeedback,
} from "react-native";
import styles from "./style.js";
import { AuthContext } from "../../Context/AuthContext.js";
import { roleEnum } from "../../Utils/constants.js";
import { CustomText } from "../Components/CustomText.js";
import InformationFlat from "../Components/InformationFlat.js";

const Profile = ({ navigation }) => {
    const { logout } = useContext(AuthContext);
    const [isWarningShow, SetIsWarningShow] = useState(false);

    // Lấy từ API (get by id)
    const userInfo = {
        fullName: "Nguyễn Thế Đăng Hoan",
        position: 0,
        birthday: "2002-02-03",
        gender: true,
        phoneNumber: "0852556258",
        email: "nguyenthedanghoan@gmail.com",
        image: require("../../Public/Hoan.jpg"),
    };

    const userInformation = {
        "Họ và tên": userInfo.fullName,
        "Chức vụ": roleEnum[userInfo.position],
        "Ngày sinh": userInfo.birthday,
        "Giới tính": userInfo.gender ? "Nam" : "Nữ",
        "Số điện thoại": userInfo.phoneNumber,
        Email: userInfo.email,
    };

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
                <Image style={styles.avatar} source={userInfo.image}></Image>
                <CustomText style={styles.name}>{userInfo.fullName}</CustomText>
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
                            (params = { userInfo: userInfo })
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
        </View>
    );
};
export default Profile;
