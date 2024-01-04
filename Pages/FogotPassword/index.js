import React, { useState } from "react";
import {
    Linking,
    View,
    TouchableOpacity,
    TextInput,
    ActivityIndicator,
    StatusBar,
    Image,
} from "react-native";
import { Formik } from "formik";
import * as yup from "yup";
import Toast from "react-native-toast-message";
import { toastConfig } from "../Components/ToastConfig.js";
import { API_URL } from "../../Utils/constants.js";
import styles from "./style.js";
import { CustomText } from "../Components/CustomText.js";

const ForgotPassword = ({ navigation }) => {
    const [isLoading, SetIsLoading] = useState(false);

    const validationSchema = yup.object().shape({
        email: yup
            .string()
            .max(100, "Email không được vượt quá 100 ký tự!")
            .email("Định dạng email không hợp lệ!")
            .required("Email là bắt buộc"),
    });

    return (
        <Formik
            initialValues={{
                email: "",
                urlFE: "https://example.com",
            }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
                // Handle form submission logic here
                console.log(values);
                SetIsLoading(true);
                fetch(
                    //&PageNumber=1&PageSize=10
                    API_URL + `user/forgot-password`,
                    {
                        method: "POST", // *GET, POST, PUT, DELETE, etc.
                        mode: "cors", // no-cors, cors, *same-origin
                        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
                        credentials: "same-origin", // include, *same-origin, omit
                        headers: {
                            "Content-Type": "application/json",
                            Accept: "application/json",
                        },
                        redirect: "follow", // manual, *follow, error
                        referrer: "no-referrer", // no-referrer, *client
                        body: JSON.stringify(values),
                    }
                )
                    .then((res) => res.json())
                    .then(async (res) => {
                        if (res.succeeded) {
                            SetIsLoading(false);
                            navigation.navigate("Login", {
                                forgotSuccess: true,
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
                        console.log(`forgot password error: ${e}`);
                        Toast.show({
                            type: "error",
                            text1: "Có lỗi xảy ra: " + e,
                        });
                        SetIsLoading(false);
                    });
            }}
        >
            {({
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                errors,
                touched,
            }) => (
                <View style={styles.container}>
                    <View style={styles.form}>
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
                        <TouchableOpacity
                            style={styles.backContainer}
                            onPress={() => navigation.goBack()}
                        >
                            <Image
                                source={require("../../Public/back.png")}
                                style={styles.backBtn}
                            />
                        </TouchableOpacity>
                        <View style={styles.head}>
                            <CustomText style={styles.title}>
                                Quản lý{"\n"}tội phạm
                            </CustomText>
                            <CustomText style={styles.subtitle}>
                                CA Quảng Nam
                            </CustomText>
                        </View>
                        <View style={styles.body}>
                            <CustomText
                                style={{
                                    alignSelf: "flex-start",
                                    color: "#19BB50",
                                }}
                            >
                                Vui lòng nhập email của tài khoản bạn!
                            </CustomText>
                            <View style={styles.textInput}>
                                <CustomText style={{ width: 65 }}>
                                    Email:
                                </CustomText>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Email"
                                    value={values.email}
                                    onChangeText={handleChange("email")}
                                    onBlur={handleBlur("email")}
                                ></TextInput>
                            </View>
                            {touched.email && errors.email && (
                                <CustomText style={styles.error}>
                                    {errors.email}
                                </CustomText>
                            )}
                            <View style={{ gap: 14 }}>
                                <TouchableOpacity
                                    onPress={handleSubmit}
                                    style={styles.btnLogin}
                                >
                                    <CustomText style={styles.txtLogin}>
                                        Xác nhận
                                    </CustomText>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.foot}>
                            <View style={styles.footContent}>
                                <CustomText>
                                    Cần sự giúp đỡ? Liên hệ{" "}
                                    <CustomText
                                        style={{
                                            color: "#53B6ED",
                                            textDecorationLine: "underline",
                                        }}
                                        onPress={() =>
                                            Linking.openURL(
                                                "https://www.facebook.com/maeveofmay"
                                            )
                                        }
                                    >
                                        Thanh Nhàn
                                    </CustomText>
                                </CustomText>
                            </View>
                        </View>
                    </View>
                    <Toast config={toastConfig} />
                </View>
            )}
        </Formik>
    );
};
export default ForgotPassword;
