import CriminalList from "./CriminalList";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const tab = createNativeStackNavigator();

function Criminal() {
    return (
        <tab.Navigator screenOptions={{ headerShown: false }}>
            <tab.Screen name="CriminalList" component={CriminalList} />
            {/* <tab.Screen name="CriminalDetail" component={CriminalDetail} /> */}
        </tab.Navigator>
    );
}

export default Criminal;
