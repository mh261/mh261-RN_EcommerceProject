import { View, Text, useWindowDimensions, TouchableWithoutFeedback, StyleSheet } from 'react-native'
import React from 'react'
import { onboardingButtonParams, onboardingDotParams } from '../../TypesCheck/OnboardingTypesCheck'
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
        const background = interpolateColor(
            x.value,
            [
                0, SCREEN_WIDTH, 2 * SCREEN_WIDTH
            ],
            ["#7EC8E3", "#FF69B4", "#8A2BE2"],
        )
        return {
            backgroundColor: background
        }
    })

    const navigation = useNavigation<NativeStackNavigationProp<RootStackParams>>();
    return (
        <TouchableWithoutFeedback
            onPress={() => {
                if (flatListIndex.value < itemLength - 1) {
                    flatListRef.current?.scrollToIndex({ index: flatListIndex.value + 1 });
                }
                else {
                    navigation.replace("TabsStack", { "screen": "Home" })
                    // alert("Click here to start shopping online?")
                }
            }}
        >
            <Animated.View style={[sty.container, buttonAnimation, colorAnimation]}>
                <Animated.Text style={[sty.textButton, textAnimation]} > GET STARTED</Animated.Text>
                <Animated.Image
                    source={require("../../../assets/onboarding/nextIcon.png")}
                    style={[sty.arrow, arrowAnimation]}
                />
            </Animated.View>
        </TouchableWithoutFeedback>

    )

}

export default OnboardingButton
const sty = StyleSheet.create({
    container: {
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        marginHorizontal: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 5,
    },

    arrow: {
        position: "absolute",
        tintColor: "white", // Đổi màu mũi tên thành trắng
    },

    textButton: {
        color: "#FFF",
        fontWeight: "bold",
        fontSize: 18,
        position: "absolute",
        textTransform: "uppercase",
    }
})