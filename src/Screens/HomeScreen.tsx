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



  return (
    <SafeAreaView style={{ paddingTop: Platform.OS === 'android' ? 40 : 0, flex: 1, backgroundColor: 'violet' }}>
      <HeadersComponent gotoCartScreen={gotoCartScreen} />
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ backgroundColor: '#efefef', flexDirection: 'row', padding: 10, marginVertical: 10 }}
      >
        <ImageSlider images={sliderImage} />
      </ScrollView>
      <View style={{ backgroundColor: "yellow", flex: 2 }}>
        <Text>
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
                  "height": 50,
                  "width": 55,
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
      <View style={{
        backgroundColor: 'red', flexDirection: "row", justifyContent: 'space-between',
        marginTop: 10
      }}>
        <Text style={{ fontSize: 15, fontWeight: 'bold', padding: 10 }}>
          Products from Selected Category
        </Text>
        <Pressable>
          <Text style={{ fontSize: 10, fontWeight: 'bold', padding: 10 }}>
            View All
          </Text>
        </Pressable>
      </View>
      <View style={{
        backgroundColor: '#fff ', borderWidth: 7, borderColor: 'green', flexDirection: 'row',
        justifyContent: 'space-between', alignItems: "center", flexWrap: 'wrap',
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
      <View style={{ flexDirection: "row", justifyContent: "center", marginVertical: 10 }}>
        <TouchableOpacity
          onPress={() => setIsFeatured(true)}
          style={{
            backgroundColor: isFeatured ? "#007bff" : "#ccc",
            padding: 10,
            marginRight: 10,
            borderRadius: 5
          }}>
          <Text style={{ color: "#fff" }}>Sản phẩm nổi bật (True)</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setIsFeatured(false)}
          style={{
            backgroundColor: !isFeatured ? "#007bff" : "#ccc",
            padding: 10,
            borderRadius: 5
          }}>
          <Text style={{ color: "#fff" }}>Sản phẩm thường (False)</Text>
        </TouchableOpacity>
      </View>

      {/* Danh sách sản phẩm */}
      <FlatList
        data={featuredProducts}
        keyExtractor={(item: { _id: any; }) => item._id}
        renderItem={({ item }) => (
          <View style={{
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