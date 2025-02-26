import React from "react"
import { createNativeStackNavigator, NativeStackScreenProps } from "@react-navigation/native-stack"
import OnboardingScreen from "../Screens/OnboardingScreen"

import TabsNavigator, {TabsStackParams} from "./TabsNavigation"
import { NavigatorScreenParams } from "@react-navigation/native"
import productDetails from "../Screens/productDetails"

export type RootStackParams = {
    OnboardingScreen: undefined
    TabsStack: NavigatorScreenParams<TabsStackParams>
    Deals: undefined
    Profile: undefined
    productDetails: {
        _id: string;
        images: [string];
        name: string;
        price: number;
        oldPrice?: number;
        inStock?: boolean;
        color?: string;
        size?: string;
        description?: string;
        quantity: number;
    }
    Cart: {
        _id: string;
        images: [string];
        name: string;
        price: number;
        color?: string;
        size?: string;
        quantity: number;
    }
}

const RootStack = createNativeStackNavigator<RootStackParams>();

export type RootStackScreenProps<T extends keyof RootStackParams> = NativeStackScreenProps<RootStackParams, T>;

const RootNavigator = () => {
  return (
    <RootStack.Navigator>
      <RootStack.Screen
        name="OnboardingScreen"
        component={OnboardingScreen}
        options={{ headerShown: false }}
      />
      <RootStack.Screen
        name="TabsStack"
        component={TabsNavigator}
        options={{ headerShown: false }}
      />
      <RootStack.Screen
        name="productDetails"
        component={productDetails}
        options={{ headerShown: false }}
      />
    </RootStack.Navigator>
  );
}

export default RootNavigator;
