import React, { createContext, useEffect, useState } from "react";
import moment from "moment";
import axios from "axios";
import { API_URL } from "../Utils/constants.js";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isFirst, SetIsFirst] = useState(true);
    const [username, SetUsername] = useState(null);
    const [userInfo, SetUserInfo] = useState(null);
    const [isLoading, SetIsLoading] = useState(false);
    const [splashLoading, SetSplashLoading] = useState(false);

    useEffect(() => {
        const setItem = async () => {
            if (isFirst) return;
            if (username != null)
                await AsyncStorage.setItem("username", username);
            else await AsyncStorage.removeItem("username");
        };
        setItem();
    }, [username]);

    useEffect(() => {
        const setItem = async () => {
            if (isFirst) return;
            if (userInfo != null)
                await AsyncStorage.setItem(
                    "userInfo",
                    JSON.stringify(userInfo)
                );
            else await AsyncStorage.removeItem("userInfo");
        };
        setItem();
    }, [userInfo]);

    const register = (username, password) => {
        SetIsLoading(true);
        axios
            .post(API_URL + "auth/register", {
                username: username,
                password: password,
            })
            .then((res) => {
                let userInfo = res.data;
                SetUsername(username);
                SetUserInfo(userInfo);
                SetIsLoading(false);
                console.log(userInfo);
            })
            .catch((e) => {
                console.log(`register error ${e}`);
                SetIsLoading(false);
            });
    };

    const login = (username, password, isRememberLogin) => {
        SetIsLoading(true);

        // axios
        //     .post(API_URL + 'identity/token', {
        //         userName: username,
        //         password: password
        //     })
        //     .then(res => {
        //         let userInfo = res.data
        //         console.log(userInfo)
        //         SetUserInfo(userInfo)
        //         SetIsLoading(false)
        //     })
        //     .catch(e => {
        //         console.log(`login error: ${e}`)
        //         SetIsLoading(false)
        //     })

        return fetch(API_URL + "identity/token", {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            mode: "cors", // no-cors, cors, *same-origin
            cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            credentials: "same-origin", // include, *same-origin, omit
            headers: {
                "Content-Type": "application/json",
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: "follow", // manual, *follow, error
            referrer: "no-referrer", // no-referrer, *client
            body: JSON.stringify({ userName: username, password: password }), // body data type must match "Content-Type" header
        })
            .then((res) => res.json())
            .then((res) => {
                var message = "";
                if (res.succeeded) {
                    // let userInfo = {"access_token":res.token, "refresh_token":res.refreshToken}
                    // let userInfo = new UserToken(res.data)
                    let userInfo = res.data;
                    console.log(userInfo);
                    message = "Đăng nhập thành công!";
                    SetUsername(username);
                    SetUserInfo(userInfo);
                    AsyncStorage.setItem(
                        "isRememberLogin",
                        isRememberLogin.toString()
                    );
                } else {
                    // console.log(res.messages)
                    message = res.messages;
                }
                SetIsLoading(false);
                return message;
            })
            .catch((e) => {
                console.log(`login error: ${e}`);
                SetIsLoading(false);
                return "Có lỗi xảy ra: " + e;
            });
    };

    const logout = async () => {
        let isRememberLogin = await AsyncStorage.getItem("isRememberLogin");
        if (
            isRememberLogin == null ||
            isRememberLogin.toLowerCase() == "false"
        ) {
            SetIsLoading(true);

            SetUsername(null);

            SetIsLoading(false);
        }
        SetUsername(null);
        SetUserInfo(null);
        // axios.post(API_URL + '/logout',
        // {},
        // {
        //     headers: {Authorization: `Bearer ${userInfo.access_token}`},
        // }
        // ).then(res => {
        //     console(res.data)
        //     SetUserInfo(null)
        //     SetIsLoading(false)
        // }).cacht(e => {
        //     console.log(`logout error: ${e}`)
        //     SetIsLoading(false)
        // })
    };

    const isLoggedIn = async () => {
        try {
            let isRememberLogin = await AsyncStorage.getItem("isRememberLogin");
            if (
                isRememberLogin == null ||
                isRememberLogin.toLowerCase() == "false"
            )
                return;

            SetSplashLoading(true);

            let username = await AsyncStorage.getItem("username");
            if (username) {
                SetUsername(username);
            }

            let userInfo = await AsyncStorage.getItem("userInfo");

            SetIsFirst(false);

            if (userInfo == null) {
                SetSplashLoading(false);
                return;
            } else {
                userInfo = JSON.parse(userInfo);
                let refreshTokenExpiryTime = moment(
                    userInfo.refreshTokenExpiryTime,
                    "HH:mm DD/MM/YYYY"
                );
                if (
                    refreshTokenExpiryTime !== undefined &&
                    refreshTokenExpiryTime !== null &&
                    refreshTokenExpiryTime.isSameOrBefore(new Date())
                ) {
                    SetSplashLoading(false);
                    SetUsername(null);
                    SetUserInfo(null);
                    return;
                }
            }

            if (userInfo) {
                SetUserInfo(userInfo);
            }

            SetSplashLoading(false);
        } catch (e) {
            SetSplashLoading(false);
            console.log("check logged in error: ", e);
        }
    };

    const refreshToken = async () => {
        try {
            let tokenExpiryTime = moment(
                userInfo.tokenExpiryTime,
                "HH:mm DD/MM/YYYY"
            );
            if (
                tokenExpiryTime != null &&
                tokenExpiryTime.isSameOrBefore(
                    moment(new Date()).add(1, "minute")
                )
            ) {
                let refreshTokenExpiryTime = moment(
                    userInfo.refreshTokenExpiryTime,
                    "HH:mm DD/MM/YYYY"
                );
                if (
                    refreshTokenExpiryTime != null &&
                    refreshTokenExpiryTime.isAfter(new Date())
                ) {
                    return await fetch(API_URL + "identity/token/refresh", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            token: userInfo.token,
                            refreshToken: userInfo.refreshToken,
                        }),
                    })
                        .then((res) => res.json())
                        .then((res) => {
                            if (res.succeeded) {
                                console.log(res);
                                const data = res.data;
                                SetUserInfo(data);
                                return {
                                    isSuccessfully: true,
                                    data: data.token,
                                };
                            } else {
                                console.log("Fail", res);
                                return {
                                    isSuccessfully: false,
                                    data: `Refresh token thất bại: ${res.messages}`,
                                };
                            }
                        })
                        .catch((error) => {
                            console.error("Lỗi khi refresh token:", error);
                            return {
                                isSuccessfully: false,
                                data: `Lỗi khi refresh token: ${error}`,
                            };
                        });
                } else {
                    console.log("Refresh token hết hạn");
                    SetUsername(null);
                    SetUserInfo(null);
                    return {
                        isSuccessfully: false,
                        data: "Refresh token hết hạn! Vui lòng đăng nhập lại!",
                    };
                }
            }
            return { isSuccessfully: true, data: userInfo.token };
        } catch (error) {
            console.error("Lỗi khi refresh token:", error);
            return {
                isSuccessfully: false,
                data: `Lỗi khi refresh token: ${error}`,
            };
        }
    };

    useEffect(() => {
        isLoggedIn();
    }, []);

    return (
        <AuthContext.Provider
            value={{
                isLoading,
                username,
                userInfo,
                splashLoading,
                register,
                login,
                logout,
                refreshToken,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
