import { View, Text, useWindowDimensions, StyleSheet } from "react-native";
import React from "react";
import Animated, { Extrapolation, interpolate, useAnimatedStyle } from "react-native-reanimated";
import { OnboardingItemObj } from "../../TypesCheck/OnboardingTypesCheck";
import LottieView from "lottie-react-native";

type Props = {}
const OnboardingItems = ({ item, index, x }: OnboardingItemObj) => {
    const { width: SCREEN_WIDTH } = useWindowDimensions()
    const circleAnimation = useAnimatedStyle(() => {
        const scale = interpolate(x.value, [
            (index - 1) * SCREEN_WIDTH, index * SCREEN_WIDTH, (index + 1) * SCREEN_WIDTH
        ],
            [80, 80, -100],
            Extrapolation.CLAMP
        )
        return {
            transform: [{ scale: scale }]
        }
    })
    const lottieAnimation = useAnimatedStyle(() => {
        const translatey = interpolate(
            x.value, [
            (index - 1) * SCREEN_WIDTH, index * SCREEN_WIDTH, (index + 1) * SCREEN_WIDTH
        ],
            [80, 80, 80],
            Extrapolation.CLAMP
        )
        return {
            transform: [{ translateY: translatey }]
        }
    })
    return (
        <View
            style={{
                flex: 1, justifyContent: "space-around", alignItems: "center",
                marginBottom: 370, width: SCREEN_WIDTH
            }}
        >
            <View style={styles.circularContainer}>
                <Animated.View
                    style={[{
                        width: SCREEN_WIDTH,
                        height: SCREEN_WIDTH,
                        backgroundColor: item.backgroundColor,
                        borderRadius: SCREEN_WIDTH / 2
                    }]}
                >
                </Animated.View>
            </View>
            <Animated.View style={[lottieAnimation]}>
                <LottieView
                    source={item.imageUrl}
                    style={{ width: SCREEN_WIDTH * 0.8, height: SCREEN_WIDTH * 0.8 }}
                    autoPlay
                />
            </Animated.View>
            <Text style={{
                color: item.textColor,
                fontSize: 40,
                fontWeight: "bold",
                textAlign: "center",
                marginHorizontal: 20,
                marginBottom: 10
            }}>
                {item.text}
            </Text>
        </View>
    )
}
const styles = StyleSheet.create({
    circularContainer: {
        ...StyleSheet.absoluteFillObject,
        alignItems: "center",
        justifyContent: "flex-end"
    }
})

export default OnboardingItems