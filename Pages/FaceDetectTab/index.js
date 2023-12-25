import TakeImage from "./TakeImage";
import FaceDetect from "./FaceDetect";
import SuccessDetect from "./SuccessDetect";
import FailDetect from "./FailDetect";
import CaseDetail from "../Case/CaseDetail";
import CriminalDetail from "../Criminal/CriminalDetail";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const tab = createNativeStackNavigator();

function FaceDetectTab() {
    return (
        <tab.Navigator screenOptions={{ headerShown: false }}>
            <tab.Screen name="TakeImage" component={TakeImage} />
            <tab.Screen name="FaceDetect" component={FaceDetect} />
            <tab.Screen name="SuccessDetect" component={SuccessDetect} />
            <tab.Screen name="FailDetect" component={FailDetect} />
            <tab.Screen name="CaseDetail" component={CaseDetail} />
            <tab.Screen name="CriminalDetail" component={CriminalDetail} />
        </tab.Navigator>
    );
}

export default FaceDetectTab;
