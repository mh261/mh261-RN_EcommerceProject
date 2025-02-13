import { View, Text, useWindowDimensions, TouchableWithoutFeedback, StyleSheet } from 'react-native'
import React from 'react'
import { onboardingButtonParams, OnboardingDotParams } from '../../TypesCheck/OnboardingTypesCheck'
import Animated, { interpolateColor, useAnimatedStyle, withSpring, withTiming } from 'react-native-reanimated'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParams } from '../../Navigation/RootNavigator'



type Props = {}

const OnboardingButton = ({ flatListIndex, flatListRef, itemLength, x }: onboardingButtonParams) => {
    const { width: SCREEN_WIDTH } = useWindowDimensions()

    const buttonAnimation = useAnimatedStyle(() => {
        return {
            width:
                flatListIndex.value === itemLength - 1 ?
                    withSpring(140) : withSpring(60),
            height: 60
        }
    })
    const arrowAnimation = useAnimatedStyle(() => {
        return {
            opacity: flatListIndex.value === itemLength - 1 ?
                withTiming(0) : withTiming(1),
            width: 30,
            height: 30,
            transform: [
                {
                    translateX: flatListIndex.value === itemLength - 1 ?
                        withTiming(100) : withTiming(0),
                }
            ]
        }
    })
    const textAnimation = useAnimatedStyle(() => {
        return {
            opacity: flatListIndex.value === itemLength - 1 ?
                withTiming(1) : withTiming(0),
            transform: [
                {
                    translateX: flatListIndex.value === itemLength - 1 ?
                        withTiming(0) : withTiming(100),
                }
            ]
        }
    })

    const colorAnimation = useAnimatedStyle(() => {
        const backgroundColor = interpolateColor(
            x.value,
            [
                0, SCREEN_WIDTH, 2 * SCREEN_WIDTH
            ],

            ["#c80dfc", "#250dfc", "#251357"]
        )

        return {
            backgroundColor: backgroundColor
        }
    })

    const navigation = useNavigation <NativeStackNavigationProp<RootStackParams>>();
    return (
        <TouchableWithoutFeedback
            onPress={() => {
                if (flatListIndex.value < itemLength - 1) {
                    flatListRef.current?.scrollToIndex({ index: flatListIndex.value + 1 });
                }
                else {
                    // navigation.replace("TabsStack", { "screen": "Home " })
                    alert("Click here to start shopping online?")
                }
            }}
            >
                <Animated.View
                style = {[sty.container, buttonAnimation, colorAnimation]}>
                    <Animated.Text style = {[sty.textButton, textAnimation]} > GET STARTED</Animated.Text>
                    <Animated.Image 
                    source={require("../../../assets/onboarding/nextIcon.png")}
                    style = {[sty.arrow, arrowAnimation]}
                    />
                    </Animated.View>
                    </TouchableWithoutFeedback>

    )

}

export default OnboardingButton

const sty = StyleSheet.create({
    container: {
        backgroundColor: "#c822fc",
        padding: 0,
        borderRadius: 100, 
        justifyContent: "center", 
        alignItems: "center", 
        overflow: "hidden"
    },
    arrow: {
        position: "absolute"
    }, 
    textButton:{
        color: "#fff", 
        fontSize: 20, 
        position: "absolute"
    }
})