import React, { useState, useEffect } from "react";
import {
    View,
    ScrollView,
    RefreshControl,
    StatusBar,
    Image,
    TouchableOpacity,
} from "react-native";
import styles from "./style.js";
import { CustomText } from "../Components/CustomText.js";
import InformationFields from "../Components/InformationFields.js";

const WantedDetail = ({ navigation }) => {
    // Lấy từ API (get by id)
    const wantedCriminal = {
        fullName: "Nguyễn Thế Đăng Hoan",
        otherName: "Xút",
        birthday: "3/2/2002",
        gender: true,
        phoneNumber: "0852556258",
        homeTown: "Quảng Nam",
        nationality: "Việt Nam",
        ethnicity: "Kinh",
        religion: "Không",
        cccd_cmnd: "206431580",
        career_and_workplace: "Sinh viên học tại trường bách khoa DN",
        permanent_residence: "Quảng Nam",
        current_accommodation: "Đà Nẵng",
        father_name: "Nguyễn Văn A",
        father_birthday: "2/3/1970",
        father_CCCD_CMND: "75847957824",
        mother_name: "Trần Thị B",
        mother_birthday: "4/6/1980",
        mother_CCCD_CMND: "54353452454",
        characteristics: "Có nốt ruồi ở mặt cách mũi 3cm",
        other_information: "Không",
        image: require("../../Public/Hoan.jpg"),
        charge: "Trộm cắp tài sản",
    };

    const basicInformation = {
        "Họ và tên": wantedCriminal.fullName,
        "Tên khác": wantedCriminal.otherName,
        "Ngày sinh": wantedCriminal.birthday,
        "Giới tính": wantedCriminal.gender ? "Nam" : "Nữ",
        "Số điện thoại": wantedCriminal.phoneNumber,
        "Quê quán": wantedCriminal.homeTown,
        "Quốc tịch": wantedCriminal.nationality,
        "Dân tộc": wantedCriminal.ethnicity,
        "Tôn giáo": wantedCriminal.religion,
        "CCCD/CMND": wantedCriminal.cccd_cmnd,
        "Nghề nghiệp, nơi làm việc": wantedCriminal.career_and_workplace,
        "Nơi ĐKTT": wantedCriminal.permanent_residence,
        "Chỗ ở hiện tại": wantedCriminal.current_accommodation,
        "Họ và tên cha": wantedCriminal.father_name,
        "Ngày sinh cha": wantedCriminal.father_birthday,
        "CCCD/CMND cha": wantedCriminal.father_CCCD_CMND,
        "Họ và tên mẹ": wantedCriminal.mother_name,
        "Ngày sinh mẹ": wantedCriminal.mother_birthday,
        "CCCD/CMND mẹ": wantedCriminal.mother_CCCD_CMND,
        "Đặc điểm nhận dạng": wantedCriminal.characteristics,
        "Thông tin khác": wantedCriminal.other_information,
    };

    return (
        <View style={[styles.container, { backgroundColor: "#F1F2F2" }]}>
            {/*statusbar to set wifi, battery... to white*/}
            <StatusBar barStyle="light-content" />
            <View style={[styles.head, { height: 350 }]}></View>
            <View
                style={[styles.content, { bottom: 400, alignItems: "center" }]}
            >
                <Image
                    style={styles.avatar}
                    source={wantedCriminal.image}
                ></Image>
                <CustomText style={styles.title}>
                    {wantedCriminal.fullName}
                </CustomText>
                <CustomText style={styles.note}>
                    {wantedCriminal.charge}
                </CustomText>
                <View style={{ marginTop: 26 }}>
                    <ScrollView
                        style={styles.scroll}
                        // refreshControl={
                        //     <RefreshControl
                        //         refreshing={refresh}
                        //         onRefresh={() => pullMe()}
                        //     />
                        // }
                    >
                        <InformationFields
                            title="Thông tin cơ bản"
                            listItems={basicInformation}
                        />
                        <TouchableOpacity
                            // onPress={() =>
                            //     handleConfirmWrong(props.item._id)
                            // }
                            style={[
                                styles.btnAgree,
                                { width: "100%", marginTop: 20 },
                            ]}
                        >
                            <CustomText
                                style={{
                                    color: "white",
                                    fontFamily: "Be Vietnam bold",
                                }}
                            >
                                Báo cáo tội phạm
                            </CustomText>
                        </TouchableOpacity>
                    </ScrollView>
                </View>
            </View>
        </View>
    );
};
export default WantedDetail;
// họ tên, đơn vị ra quyết định, hktt, tội danh đặc điêm
