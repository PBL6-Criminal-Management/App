import CriminalList from "./CriminalList";
import CriminalDetail from "./CriminalDetail";
import CaseDetail from "../Case/CaseDetail";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const tab = createNativeStackNavigator();

function Criminal() {
    return (
        <tab.Navigator screenOptions={{ headerShown: false }}>
            <tab.Screen name="CriminalList" component={CriminalList} />
            <tab.Screen name="CriminalDetail" component={CriminalDetail} />
            <tab.Screen name="CaseDetail" component={CaseDetail} />
        </tab.Navigator>
    );
}

export default Criminal;
