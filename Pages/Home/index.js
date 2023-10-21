import React, { useState } from "react";
import {
    TextInput,
    View,
    ScrollView,
    RefreshControl,
    StatusBar,
    TouchableOpacity,
    Image,
} from "react-native";
import styles from "./style.js";
import WantedElement from "../Components/WantedElement.js";
import { CustomText } from "../Components/CustomText.js";

const Home = ({ navigation }) => {
    const [txtSearch, SetTxtSearch] = useState("");
    const [refresh, SetRefresh] = useState(true);
    const historyList = [
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
    const checkLogic = () => {};
    return (
        <View style={styles.container}>
            {/*statusbar to set wifi, battery... to white*/}
            <StatusBar barStyle="light-content" />
            <View style={styles.head}></View>
            <View style={styles.content}>
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
                        <TouchableOpacity
                            onPress={() => {
                                //show filter
                            }}
                        >
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
                        {historyList.map((item, index) => {
                            const Max_Image_Number = 20;
                            if (index < Max_Image_Number)
                                return (
                                    <WantedElement key={index} item={item} />
                                );
                        })}
                    </ScrollView>
                </View>
            </View>
        </View>
    );
};
export default Home;
