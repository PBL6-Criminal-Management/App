import TakeImage from "./TakeImage";
import FaceDetect from "./FaceDetect";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const tab = createNativeStackNavigator();

function FaceDetectTab() {
    return (
        <tab.Navigator screenOptions={{ headerShown: false }}>
            <tab.Screen name="TakeImage" component={TakeImage} />
            <tab.Screen name="FaceDetect" component={FaceDetect} />
            {/* <tab.Screen name="DetectResut" component={DetectResult} /> */}
        </tab.Navigator>
    );
}

export default FaceDetectTab;
