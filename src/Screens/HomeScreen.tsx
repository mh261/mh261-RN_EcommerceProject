import { View, Text, Platform, ScrollView, Pressable, Image, TouchableOpacity, FlatList } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { TabsStackScreenProps } from "../Navigation/TabsNavigation";
import { SafeAreaView } from "react-native-safe-area-context";
import HeadersComponent from "../Components/HeaderComponents/HeaderComponent";
import ImageSlider from "../Components/HomeScreenComponents/ImageSlider"
import { ProductListParams } from '../TypesCheck/HomeProps'
import { CategoryCard } from "../Components/HomeScreenComponents/CategoryCard";
import { fetchCategories, fetchFeaturedProducts } from "../MiddeleWares/HomeMiddeWare";
import { useFocusEffect } from "@react-navigation/native";
import { fetchProductsByCatID } from "../MiddeleWares/HomeMiddeWare";
import { Alert } from "react-native";


const HomeScreen = ({ navigation, route }: TabsStackScreenProps<"Home">) => {
  const gotoCartScreen = () => {
    navigation.navigate("Cart");
  };

  const sliderImage = [
    require('../../assets/product/pr1.jpg'),
    require('../../assets/product/pr2.jpg'),
    require('../../assets/product/pr3.jpg'),
    { uri: 'http://localhost:9000/uploads/icebear.png' }
  ].map(img => {
    return typeof img === 'number' ? { uri: Image.resolveAssetSource(img).uri } : img;
  });

  const bgImg = { uri: 'http://localhost:9000/uploads/icebear.png' };

  const [getCategory, setGetCategory] = useState<ProductListParams[]>([]);
  const [getProductsByCatID, setGetProductsByCatID] = useState<ProductListParams[]>([]);
  const [activeCat, setActiveCat] = useState<string>("")

  const [isFeatured, setIsFeatured] = useState<boolean | null>(null);
  const [featuredProducts, setFeaturedProducts] = useState<ProductListParams[]>([]);


  useEffect(() => {
    if (isFeatured !== null) {
      fetchFeaturedProducts({ setFeaturedProducts, isFeatured });
    }
  }, [isFeatured]);

  useEffect(() => {
    fetchCategories({ setGetCategory });
  }, []);
  useEffect(() => {
    if (activeCat) {
      fetchProductsByCatID({ setGetProductsByCatID, catID: activeCat });
    }
  }, [activeCat]);

  useFocusEffect(
    useCallback(() => {
      fetchCategories({ setGetCategory });
      if (activeCat) {
        fetchProductsByCatID({ setGetProductsByCatID, catID: activeCat });
      }
    }, [activeCat])
  );

  const renderHeader = () => (
    <>
      {/* Categories */}
      <View style={{
        flex: 2,
        backgroundColor: "yellow",
        marginVertical: 0,
        alignItems: 'center'
      }}>
        <Text style={{}}>
          Categories
        </Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 15 }}
          style={{ marginTop: 4 }}
        >
          {
            getCategory.map((item, index) => (
              <CategoryCard
                key={index}
                item={{ "name": item.name, "images": item.images, _id: item._id }}
                catStyleProps={{
                  "height": 40,
                  "width": 45,
                  "radius": 20,
                  "resizeMode": "contain"
                  // imageBgHt: 150,
                }}
                catProps={{
                  "activeCat": activeCat, "onPress": () => setActiveCat(item._id)
                }}
              />
            ))
          }
        </ScrollView>
      </View>

      {/* Category products */}
      <View style={{
        backgroundColor: 'red',
        flexDirection: "row",
        justifyContent: 'space-between'
      }}>
        <Text style={{ fontSize: 12, fontWeight: 'bold', padding: 10 }}>
          Products from Selected Category
        </Text>
        <Pressable>
          <Text style={{ fontSize: 10, fontWeight: 'bold', padding: 10 }}>
            View All
          </Text>
        </Pressable>
      </View>
      <View style={{
        flex: 4,
        backgroundColor: '#fff ',
        borderWidth: 7,
        borderColor: 'green',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: "center",
        flexWrap: 'wrap',
      }}
      >
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {
            getProductsByCatID?.length > 0 ? (
              getProductsByCatID.map((item, index) => (
                <CategoryCard
                  key={index}
                  item={{ "name": item.name, "images": item.images, "_id": item._id }}
                  catStyleProps={{
                    "height": 100,
                    "width": 100,
                    "radius": 10,
                    "resizeMode": "contain"
                  }}
                  catProps={{
                    "onPress": () => Alert.alert(item.name),
                    "imageBg": item.images.length > 0 ? item.images[0] : ""
                  }}
                />
              ))
            ) : (
              <Text style={{ padding: 10 }}> No products found </Text>
            )}
        </ScrollView>
      </View>

      {/* Featured choose */}
      <View style={{ flex: 1, flexDirection: "row", justifyContent: "center", marginVertical: 10, paddingHorizontal: 5 }}>
        <TouchableOpacity
          onPress={() => setIsFeatured(true)}
          style={{
            backgroundColor: isFeatured ? "#007bff" : "#ccc",
            padding: 10,
            marginHorizontal: 5,
            borderRadius: 5
          }}>
          <Text style={{ color: "#fff", fontSize: 12 }}>Sản phẩm nổi bật (True)</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setIsFeatured(false)}
          style={{
            backgroundColor: !isFeatured ? "#007bff" : "#ccc",
            padding: 10,
            borderRadius: 5
          }}>
          <Text style={{ color: "#fff", fontSize: 12 }}>Sản phẩm thường (False)</Text>
        </TouchableOpacity>
      </View>
    </>
  );

  return (
    <SafeAreaView style={{ flex: 1, paddingTop: Platform.OS === 'android' ? 20 : 0, backgroundColor: 'violet' }}>
      <HeadersComponent gotoCartScreen={gotoCartScreen} />
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ backgroundColor: '#efefef', flexDirection: 'row', padding: 10, marginVertical: 10 }}
      >
        <ImageSlider images={sliderImage} />
      </ScrollView>
      <FlatList
        data={featuredProducts}
        keyExtractor={(item: { _id: any; }) => item._id}
        ListHeaderComponent={renderHeader}
        renderItem={({ item }) => (
          <View style={{
            flex: 4,
            flexDirection: "row",
            padding: 10,
            borderBottomWidth: 1,
            borderColor: "#ddd"
          }}>
            <Image
              source={{ uri: item.images[0] }}
              style={{ width: 80, height: 80, marginRight: 10, borderRadius: 5 }}
            />
            <View>
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>{item.name}</Text>
              <Text style={{ color: "#888" }}>Giá: {item.price} VND</Text>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
};
export default HomeScreen;