import { View, ImageBackground, Text, Platform, ScrollView, Dimensions, Pressable, SafeAreaView } from 'react-native';
import React, { useState } from 'react';
import { RootStackScreenProps } from '../Navigation/RootNavigator';
import { HeadersComponent } from '../Components/HeaderComponents/HeaderComponent';
import { AntDesign, MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';
import { CartState } from '../TypesCheck/productCartTypes';
import { addToCart } from '../redux/CartReducer';
import { ProductListParams } from '../TypesCheck/productCartTypes';
import axios from 'axios';

const { width } = Dimensions.get("window");

const ProductDetails = ({ navigation, route }: RootStackScreenProps<"ProductDetails">) => {
    const { _id, images, name, price, oldPrice, inStock, color, size, description, quantity } = route.params ;

    const cart = useSelector((state: CartState) => state.cart.cart);
    const dispatch = useDispatch();
    const [addedToCart, setAddedToCart] = useState(false);

    const addItemToCart = (ProductItemObj: ProductListParams) => {
        const findItem = cart.find((product) => product._id === _id);
        if (!findItem) {
            setAddedToCart(true);
            dispatch(addToCart(ProductItemObj));
        }
    };

    return (
        <SafeAreaView style={{ paddingTop: Platform.OS === 'android' ? 20 : 0, flex: 1, backgroundColor: "#f8f8f8" }}>
            {/* Header */}
            <HeadersComponent gotoCartScreen={() => navigation.navigate("TabsStack", { screen: "Cart" })} cartLength={cart.length} goToPrevious={navigation.goBack} />

            <ScrollView>
                {/* Image Section */}
                <View style={{ alignItems: "center", marginVertical: 10 }}>
                    <ImageBackground source={{ uri: images[0] }} style={{ width: width * 0.9, height: 350, borderRadius: 10, overflow: "hidden" }}>
                        {/* Nút yêu thích */}
                        <Pressable
                            style={{
                                position: "absolute",
                                top: 10,
                                right: 10,
                                backgroundColor: "rgba(255,255,255,0.8)",
                                padding: 8,
                                borderRadius: 50,
                            }}
                            // onPress={toggleFavorite}
                        >
                            {/* <AntDesign name={favorite ? "heart" : "hearto"} size={24} color={favorite ? "red" : "black"} /> */}
                        </Pressable>

                        {/* Nút chia sẻ */}
                        <View style={{ position: "absolute", top: 10, right: 50, backgroundColor: "#00000080", padding: 8, borderRadius: 20 }}>
                            <MaterialCommunityIcons name="share-variant" size={22} color="white" />
                        </View>
                    </ImageBackground>
                </View>

                {/* Product Info */}
                <View style={{ backgroundColor: "white", borderRadius: 10, padding: 15, marginHorizontal: 15, shadowColor: "#000", shadowOpacity: 0.1, shadowRadius: 5, elevation: 3 }}>
                    <Text style={{ fontSize: 22, fontWeight: "bold" }}>{name}</Text>
                    <Text style={{ fontSize: 16, color: "gray", marginVertical: 5 }}>{description}</Text>

                    <View style={{ flexDirection: "row", alignItems: "center", marginVertical: 5 }}>
                        <Text style={{ fontSize: 20, fontWeight: "bold", color: "#E63946" }}>${price.toFixed(2)}</Text>
                        {oldPrice && (
                            <Text style={{ fontSize: 16, textDecorationLine: "line-through", marginLeft: 10, color: "gray" }}>
                                ${oldPrice.toFixed(2)}
                            </Text>
                        )}
                        {oldPrice && (
                            <View style={{ marginLeft: 10, backgroundColor: "#E63946", padding: 5, borderRadius: 5 }}>
                                <Text style={{ color: "white", fontSize: 14 }}>
                                    -{((1 - price / oldPrice) * 100).toFixed(1)}%
                                </Text>
                            </View>
                        )}
                    </View>

                    <Text style={{ fontSize: 16, color: quantity > 0 ? "green" : "red" }}>
                        {quantity > 0 ? `In Stock - ${quantity} available` : "Out of Stock"}
                    </Text>
                </View>

                {/* Delivery Info */}
                <View style={{ backgroundColor: "white", borderRadius: 10, padding: 15, marginHorizontal: 15, marginTop: 10, shadowColor: "#000", shadowOpacity: 0.1, shadowRadius: 5, elevation: 3 }}>
                    <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 5 }}>Delivery</Text>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <Ionicons name="location-sharp" size={20} color="green" />
                        <Text style={{ fontSize: 14, color: "black", marginLeft: 5 }}>Delivery to: 7/1 Thanh Thai, District 10, Ho Chi Minh City</Text>
                    </View>
                </View>
            </ScrollView>

            {/* Add to Cart Button */}
            <View style={{ backgroundColor: "white", padding: 15 }}>
                <Pressable
                    style={{
                        backgroundColor: addedToCart ? "#6A0572" : "#2D6A4F",
                        padding: 15,
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: 10,
                    }}
                    onPress={() => addItemToCart(route.params)}
                >
                    <Text style={{ color: "white", fontSize: 20, fontWeight: "bold" }}>
                        {addedToCart ? "Added to Cart" : "Add to Cart"}
                    </Text>
                </Pressable>
            </View>
        </SafeAreaView>
    );
};

export default ProductDetails;
