import WantedDetail from "./WantedDetail";
import WantedList from "./WantedList";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const tab = createNativeStackNavigator();

function HomeTab() {
    return (
        <tab.Navigator screenOptions={{ headerShown: false }}>
            <tab.Screen name="WantedList" component={WantedList} />
            <tab.Screen name="WantedDetail" component={WantedDetail} />
        </tab.Navigator>
    );
}

export default HomeTab;
