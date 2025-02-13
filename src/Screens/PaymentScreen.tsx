import { View, Text, Platform, ScrollView } from "react-native";
import React from "react";
import { TabsStackScreenProps } from "../Navigation/TabsNavigation"
import { SafeAreaView } from "react-native-safe-area-context";



type Props ={}
const PaymentScreen = ({navigation, route }: TabsStackScreenProps<"Payment">) =>{
    return(
        <View style ={{marginTop: 50}}>
            <Text>HOME SCREEN</Text>
        </View>
    )
}

export default PaymentScreen;