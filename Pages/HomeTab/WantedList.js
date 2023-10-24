import React, { useState, useEffect } from "react";
import {
    TextInput,
    View,
    ScrollView,
    RefreshControl,
    StatusBar,
    TouchableOpacity,
    Image,
    Modal,
} from "react-native";
import styles from "./style.js";
import WantedElement from "../Components/WantedElement.js";
import FilterFields from "../Components/FilterFields.js";
import { CustomText } from "../Components/CustomText.js";
import DropDown from "../Components/DropDown.js";

const WantedList = ({ navigation }) => {
    const [txtSearch, SetTxtSearch] = useState("");
    const [refresh, SetRefresh] = useState(true);
    const [modalVisible, SetModalVisible] = useState(false);

    const [value, SetValue] = useState([]);

    //now - 200 -> now (0 years old - 200 years old)
    const [items, SetItems] = useState(
        Array.from({ length: 201 }, (_, i) => {
            return {
                label: i + (new Date().getFullYear() - 200),
                value: i + (new Date().getFullYear() - 200),
            };
        })
    );

    const wantedList = [
        {
            criminalName: "Đăng Hoan",
            image: require("../../Public/Hoan.jpg"),
            birthday: "2002",
            charge: "Trộm cắp tài sản",
            characteristic: "Có nốt ruồi ở mặt cách mũi 3cm",
            murderWeapon: "Dao",
            wantedType: "Bình thường",
        },
        {
            criminalName: "Khắc Luận",
            image: require("../../Public/Luan.png"),
            birthday: "2002",
            charge: "Trộm cắp tài sản",
            characteristic: "Có nốt ruồi ở mặt cách mũi 3cm",
            murderWeapon: "Dao",
            wantedType: "Nguy hiểm",
        },
        {
            criminalName: "Thục Nhi",
            image: require("../../Public/Nhi.jpg"),
            birthday: "2002",
            charge: "Trộm cắp tài sản",
            characteristic: "Có nốt ruồi ở mặt cách mũi 3cm",
            murderWeapon: "Dao",
            wantedType: "Đặc biệt",
        },
        {
            criminalName: "Thanh Nhàn",
            image: require("../../Public/chi_Nhan.png"),
            birthday: "2001",
            charge: "Trộm cắp tài sản",
            characteristic: "Có nốt ruồi ở mặt cách mũi 3cm",
            murderWeapon: "Dao",
            wantedType: "Nguy hiểm",
        },
        {
            criminalName: "Đăng Hoan",
            image: require("../../Public/Hoan.jpg"),
            birthday: "2002",
            charge: "Trộm cắp tài sản",
            characteristic: "Có nốt ruồi ở mặt cách mũi 3cm",
            murderWeapon: "Dao",
            wantedType: "Bình thường",
        },
        {
            criminalName: "Khắc Luận",
            image: require("../../Public/Luan.png"),
            birthday: "2002",
            charge: "Trộm cắp tài sản",
            characteristic: "Có nốt ruồi ở mặt cách mũi 3cm",
            murderWeapon: "Dao",
            wantedType: "Nguy hiểm",
        },
        {
            criminalName: "Thục Nhi",
            image: require("../../Public/Nhi.jpg"),
            birthday: "2002",
            charge: "Trộm cắp tài sản",
            characteristic: "Có nốt ruồi ở mặt cách mũi 3cm",
            murderWeapon: "Dao",
            wantedType: "Đặc biệt",
        },
        {
            criminalName: "Thanh Nhàn",
            image: require("../../Public/chi_Nhan.png"),
            birthday: "2001",
            charge: "Trộm cắp tài sản",
            characteristic: "Có nốt ruồi ở mặt cách mũi 3cm",
            murderWeapon: "Dao",
            wantedType: "Nguy hiểm",
        },
    ];

    const dangerousLevels = ["Bình thường", "Nguy hiểm", "Đặc biệt"];
    const [dangerousLevelsChecked, SetDangerousLevelsChecked] = useState(
        Array.from({ length: dangerousLevels.length }, (_, i) => false)
    );

    // useEffect(() => {
    //     console.log(dangerousLevelsChecked);
    // }, [dangerousLevelsChecked]);

    const resetFilter = () => {
        SetDangerousLevelsChecked(
            Array.from({ length: dangerousLevels.length }, (_, i) => false)
        );
        SetValue([]);
    };
    const goToWantedDetail = () => {
        navigation.navigate("WantedDetail");
    };
    const checkLogic = () => {};

    return (
        <View style={styles.container}>
            {/*statusbar to set wifi, battery... to white*/}
            <StatusBar barStyle="light-content" />
            <View style={[styles.head, { height: 240 }]}></View>
            <View style={[styles.content, { bottom: 250 }]}>
                <CustomText style={styles.title}>Danh sách truy nã</CustomText>
                <View style={styles.search}>
                    <View style={styles.input}>
                        <TextInput
                            placeholder="Tìm kiếm"
                            placeholderTextColor="black"
                            underlineColorAndroid="black"
                            value={txtSearch}
                            onChangeText={SetTxtSearch}
                        ></TextInput>
                        <Image
                            style={styles.icon}
                            source={require("../../Public/search.png")}
                        />
                    </View>
                    <View style={styles.btnFilter}>
                        <TouchableOpacity onPress={() => SetModalVisible(true)}>
                            <CustomText style={{ color: "black" }}>
                                Bộ lọc
                            </CustomText>
                        </TouchableOpacity>
                        <Image
                            style={styles.icon}
                            source={require("../../Public/filter.png")}
                        />
                    </View>
                </View>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        // Alert.alert('Modal has been closed.');
                        SetModalVisible(!modalVisible);
                    }}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalView}>
                            <View style={styles.modalHead}>
                                <TouchableOpacity
                                    style={styles.btnCancel}
                                    onPress={() => SetModalVisible(false)}
                                >
                                    <Image
                                        source={require("../../Public/darkCancel.png")}
                                    />
                                </TouchableOpacity>
                                <CustomText style={styles.modalTitle}>
                                    Bộ lọc
                                </CustomText>
                                <TouchableOpacity onPress={resetFilter}>
                                    <CustomText
                                        style={{
                                            color: "#53B6ED",
                                        }}
                                    >
                                        Cài lại
                                    </CustomText>
                                </TouchableOpacity>
                            </View>
                            <FilterFields
                                title="Mức độ nguy hiểm"
                                listItems={dangerousLevels}
                                listChecked={dangerousLevelsChecked}
                                setListChecked={SetDangerousLevelsChecked}
                            />
                            <DropDown
                                title="Năm sinh"
                                placeholder="Chọn năm sinh"
                                value={value}
                                items={items}
                                setValue={SetValue}
                                setItems={SetItems}
                            />
                            <TouchableOpacity
                                // onPress={() =>
                                //     handleConfirmWrong(props.item._id)
                                // }
                                style={styles.btnAgree}
                            >
                                <CustomText
                                    style={{
                                        color: "white",
                                        fontFamily: "Be Vietnam bold",
                                    }}
                                >
                                    Chấp nhận
                                </CustomText>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
                <View style={styles.body}>
                    <ScrollView
                        style={styles.scroll}
                        // refreshControl={
                        //     <RefreshControl
                        //         refreshing={refresh}
                        //         onRefresh={() => pullMe()}
                        //     />
                        // }
                    >
                        {wantedList.map((item, index) => {
                            const Max_Image_Number = 20;
                            if (index < Max_Image_Number)
                                return (
                                    <WantedElement
                                        key={index}
                                        item={item}
                                        onPress={goToWantedDetail}
                                    />
                                );
                        })}
                    </ScrollView>
                </View>
            </View>
        </View>
    );
};
export default WantedList;
// họ tên, đơn vị ra quyết định, hktt, tội danh đặc điêm
