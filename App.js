import React from "react";
import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";

import { AuthProvider } from "./Context/AuthContext.js";
import Navigation from "./Pages/Components/Navigation.js";

function App() {
    let [fontsLoaded] = useFonts({
        Inter: require("./Public/Fonts/Inter-Bold.ttf"),
        "Be Vietnam": require("./Public/Fonts/BeVietnamPro-Regular.ttf"),
        "Be Vietnam italic": require("./Public/Fonts/BeVietnamPro-Italic.ttf"),
        "Be Vietnam bold": require("./Public/Fonts/BeVietnamPro-Bold.ttf"),
    });

    if (!fontsLoaded) {
        return null;
    }

    return (
        <AuthProvider>
            <Navigation />
        </AuthProvider>
    );
}

export default App;
