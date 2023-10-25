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

const WantedDetail = ({ navigation, route }) => {
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
        careerAndWorkplace: "Sinh viên học tại trường bách khoa DN",
        permanentResidence: "Quảng Nam",
        currentAccommodation: "Đà Nẵng",
        fatherName: "Nguyễn Văn A",
        fatherBirthday: "2/3/1970",
        fatherCCCD_CMND: "75847957824",
        motherName: "Trần Thị B",
        motherBirthday: "4/6/1980",
        motherCCCD_CMND: "54353452454",
        characteristics: "Có nốt ruồi ở mặt cách mũi 3cm",
        otherCharacteristics: "Cao ráo, đẹp dai",
        image: require("../../Public/Hoan.jpg"),
        status: "Đang ngồi tù",
        dangerousLevel: "Rất nghiêm trọng",
        cases: "HS000123456, HS00742308,...",
        charge: "Trộm cắp tài sản",
        mostRecentCrimeDate: "21/01/2020",
        releaseDate: "21/03/2021",
        exitAndEntryInformation: "xuất ngày 21/03/2021 tại cảng Đà Nẵng",
        bankAccount: "5845478954387 BIDV",
        gameAccount: "abcxyz",
        facebook: "nghgiưohgioehogiưh",
        zalo: "nghgiưohgioehogiưh",
        otherSocialNetwork: "nghgiưohgioehogiưh",
        phoneModel: "hgơehhưeh",
        study: "nghgiưohgioehogiưh",
        accessArrangement: "nghgiưohgioehogiưh",
        otherInformation: "Không",
        wantedCharge: "Giết người",
        wantedType: "Khẩn cấp",
        decisionNo: "4274324",
        decisionDate: "4274324d",
        decisionUnit: "4274324d",
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
        "Nghề nghiệp, nơi làm việc": wantedCriminal.careerAndWorkplace,
        "Nơi ĐKTT": wantedCriminal.permanentResidence,
        "Chỗ ở hiện tại": wantedCriminal.currentAccommodation,
        "Họ và tên cha": wantedCriminal.fatherName,
        "Ngày sinh cha": wantedCriminal.fatherBirthday,
        "CCCD/CMND cha": wantedCriminal.fatherCCCD_CMND,
        "Họ và tên mẹ": wantedCriminal.motherName,
        "Ngày sinh mẹ": wantedCriminal.motherBirthday,
        "CCCD/CMND mẹ": wantedCriminal.motherCCCD_CMND,
        "Đặc điểm nhận dạng": wantedCriminal.characteristics,
        "Đặc điểm khác": wantedCriminal.otherCharacteristics,
    };

    const criminalInformation = {
        "Tình trạng": wantedCriminal.status,
        "Mức độ nguy hiểm": wantedCriminal.dangerousLevel,
        "Vụ án liên quan": wantedCriminal.cases,
        "Tiền án, tiền sự": wantedCriminal.charge,
        "Ngày phạm tội gần nhất": wantedCriminal.mostRecentCrimeDate,
        "Ngày được thả": wantedCriminal.releaseDate,
        "Thông tin xuất, nhập cảnh": wantedCriminal.exitAndEntryInformation,
        "Tài khoản ngân hàng": wantedCriminal.bankAccount,
        "Tài khoản game": wantedCriminal.gameAccount,
        Facebook: wantedCriminal.facebook,
        Zalo: wantedCriminal.zalo,
        "Mạng xã hội khác": wantedCriminal.otherSocialNetwork,
        "Model điện thoại": wantedCriminal.phoneModel,
        "Nghiên cứu": wantedCriminal.study,
        "Bố trí tiếp cận": wantedCriminal.accessArrangement,
        "Thông tin khác": wantedCriminal.otherInformation,
    };

    const wantedInformation = {
        "Tội danh truy nã": wantedCriminal.wantedCharge,
        "Loại truy nã": wantedCriminal.wantedType,
        "Số ra quyết định": wantedCriminal.decisionNo,
        "Ngày ra quyết định": wantedCriminal.decisionDate,
        "Đơn vị ra quyết định": wantedCriminal.decisionUnit,
    };

    useEffect(() => {
        if (route.params?.criminalId) {
            //call to GetCriminalById API
        }
    }, [route.params]);

    return (
        <View style={[styles.container, { backgroundColor: "#F1F2F2" }]}>
            {/*statusbar to set wifi, battery... to white*/}
            <StatusBar barStyle="light-content" />
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
                <Image
                    style={styles.avatar}
                    source={wantedCriminal.image}
                ></Image>
                <CustomText style={styles.title}>
                    {wantedCriminal.fullName}
                </CustomText>
                <CustomText style={styles.note}>
                    Tội danh: {wantedCriminal.charge}
                </CustomText>
                <View style={{ marginTop: 26, width: "100%" }}>
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
                        <InformationFields
                            title="Thông tin tội phạm"
                            listItems={criminalInformation}
                        />
                        <InformationFields
                            title="Thông tin truy nã"
                            listItems={wantedInformation}
                        />
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
