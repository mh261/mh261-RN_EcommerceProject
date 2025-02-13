import {AnimationObject} from "lottie-react-native"
import {SharedValue} from "react-native-reanimated"
import { AnimatedRef } from "react-native-reanimated";
import { FlatList } from "react-native-reanimated/lib/typescript/Animated";


export interface OnboardingPrograms{
    _id: string; 
    text: string; 
    textColor: string; 
    backgroundColor: string; 
    imageUrl: AnimationObject
}

export interface OnboardingItemObj{
    item: OnboardingPrograms; 
    index: number; 
    x: SharedValue<number>
}

export interface OnboardingPaginationParams{
    item: OnboardingPrograms[]
    x: SharedValue<number>
}

export interface OnboardingDotParams{
    index: number; 
    x: SharedValue<number>
}

export interface onboardingButtonParams{
    flatListIndex: SharedValue<number>
    flatListRef: AnimatedRef<FlatList <OnboardingPrograms>>;
    itemLength: number, 
    x: SharedValue<number>
}

