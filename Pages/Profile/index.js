import ProfileDetail from "./ProfileDetail";
import ProfileEdit from "./ProfileEdit";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const tab = createNativeStackNavigator();

function ProfileTab() {
    return (
        <tab.Navigator screenOptions={{ headerShown: false }}>
            <tab.Screen name="ProfileDetail" component={ProfileDetail} />
            <tab.Screen name="ProfileEdit" component={ProfileEdit} />
        </tab.Navigator>
    );
}

export default ProfileTab;
