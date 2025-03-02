import { View, Text, StyleSheet, Pressable } from 'react-native';
import React from 'react';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import { GoBack } from './GoBackButton';

interface IHeaderParams {
    pageTitle?: string;
    goToPrevious?: () => void;
    cartLength?: number;
    gotoCartScreen?: () => void;
}

const styles = StyleSheet.create({
    cartNum: {
        position: 'absolute',
        top: -10,
        right: -10,
        borderRadius: 10,
        width: 20,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export const HeadersComponent = ({ goToPrevious, cartLength, gotoCartScreen }: IHeaderParams) => {
    return (
        <View style={{ backgroundColor: 'white', padding: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
            <GoBack onPress={goToPrevious} />

            <Pressable onPress={gotoCartScreen}>
                <View style={styles.cartNum}>
                    <Text style={{ color: "pink" }}>
                        {cartLength}
                    </Text>
                </View>
                <MaterialIcons name="shopping-cart" size={24} color="grey" style={{ padding: 5, marginTop: 3 }} />
            </Pressable>
        </View>
    );
};
