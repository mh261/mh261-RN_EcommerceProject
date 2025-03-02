import { View, Text, Platform, ScrollView, Pressable, StyleSheet, SectionList, TextInput } from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { TabsStackScreenProps } from "../Navigation/TabsNavigation";
import { SafeAreaView } from "react-native-safe-area-context";
import { HeadersComponent } from "./../Components/HeaderComponents/HeaderComponent";
import ImageSlider from "../Components/HomeScreenComponents/ImageSlider";
import { ProductListParams } from "../TypesCheck/HomeProps";
import { CategoryCard } from "../Components/HomeScreenComponents/CategoryCard";
import { fetchCategories, fetchProductsByCatID, fetchTrendingProducts, fetchSearchedProducts } from "../MiddeleWares/HomeMiddeWare";
import { useFocusEffect } from "@react-navigation/native";
import { ProductCard } from "../Components/HomeScreenComponents/ProductCard";
import { useSelector } from "react-redux";
import { CartState } from "../TypesCheck/productCartTypes";
import DisplayMessage from "../Components/proudctDetails/DisplayMessage";

const HomeScreen = ({ navigation, route }: TabsStackScreenProps<"Home">) => {
  const sectionListRef = useRef<SectionList>(null);
  const cart = useSelector((state: CartState) => state.cart.cart);

  const gotoCartScreen = () => {
    if (cart.length === 0) {
      setMessage("Cart is empty. Please add products to cart.");
      setDisplayMessage(true);
      setTimeout(() => { setDisplayMessage(false); }, 3000);
    } else {
      navigation.navigate("TabsStack", { screen: "Cart" });
    }
  };

  const goToPreviousScreen = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      navigation.navigate("OnboardingScreen");
    }
  };

  const sliderImages = [
    "https://en.wikipedia.org/wiki/Cat#/media/File:Cat_August_2010-4.jpg",
    "https://en.wikipedia.org/wiki/Dog#/media/File:Chin_posing.jpg",
    "https://hondamotophattien.com/uploads/scale1.1-posterfb_16.08.jpg",
  ];

  const [getCategory, setGetCategory] = useState<ProductListParams[]>([]);
  const [getProductsByCatID, setGetProductsByCatID] = useState<ProductListParams[]>([]);
  const [activeCat, setActiveCat] = useState<string>("");
  const bgImg = "../pictures/capy.jpg";
  const [trendingProducts, setTrendingProducts] = useState<ProductListParams[]>([]);

  // 🔍 Tìm kiếm sản phẩm
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState<ProductListParams[]>([]);
  const [allProducts, setAllProducts] = useState<ProductListParams[]>([]);

  useEffect(() => {
    fetchCategories({ setGetCategory });
    fetchTrendingProducts({ setTrendingProducts });
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

  // Gọi API tìm kiếm khi nhập vào thanh tìm kiếm
  useEffect(() => {
    if (searchText.trim() !== "") {
      fetchSearchedProducts({ searchQuery: searchText, setSearchResults });
    } else {
      setSearchResults([]);
    }
  }, [searchText]);

  const [message, setMessage] = useState("");
  const [displayMessage, setDisplayMessage] = useState<boolean>(false);

  return (
    <SafeAreaView style={styles.container}>
      {displayMessage && <DisplayMessage message={message} visible={() => setDisplayMessage(!displayMessage)} />}
      <HeadersComponent gotoCartScreen={gotoCartScreen} cartLength={cart.length} goToPrevious={goToPreviousScreen} />

      {/* 🔍 Thanh tìm kiếm */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search for products..."
          placeholderTextColor="#888"
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>

      {/* Hiển thị kết quả tìm kiếm nếu có */}
      {searchText ? (
        <View style={styles.productListContainer}>
          <Text style={styles.categoriesTitle}>Search Results</Text>
          {searchResults.length > 0 ? (
            searchResults.map((product, index) => ( // ✅ Đúng: Dùng `product` thay vì `item`
              <ProductCard
                key={product._id || index.toString()}
                item={{
                  _id: product._id || index.toString(),
                  name: product.name || "Product Name",
                  images: product.images || [""],
                  price: product.price || 0,
                  oldPrice: product.oldPrice || product.price || 0,
                  description: product.description || "Product Description",
                  quantity: product.quantity ?? 1,
                  inStock: product.inStock ?? false, // ✅ Nếu undefined -> mặc định là false
                  isFeatured: Boolean(product.isFeatured),
                  category: product.category?.toString() || "Product Category",
                }}
                pStyleProps={styles.productCardStyle}
                productProps={{
                  imageBg: bgImg,
                  onPress: () => navigation.navigate("ProductDetails", product), // ✅ Truyền `product`
                }}
              />
            ))
          ) : (
            <Text style={styles.noProductsText}>No products found</Text>
          )}
        </View>
      ) : (
        <ScrollView>
          {/* Image Slider Section */}
          <View style={styles.sliderContainer}>
            <ImageSlider images={sliderImages} />
          </View>


          {/* Categories Section */}
          <View style={styles.categoriesContainer}>
            <Text style={styles.categoriesTitle}>Categories</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoryList}>
              {getCategory.map((item) => (
                <CategoryCard
                  key={item._id}
                  item={{ name: item.name, images: item.images, _id: item._id }}
                  catStyleProps={styles.categoryCardStyle}
                  catProps={{
                    activeCat: activeCat,
                    onPress: () => setActiveCat(item._id),
                  }}
                />
              ))}
            </ScrollView>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

// 🎨 Cập nhật CSS
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
    paddingTop: Platform.OS === "android" ? 1 : 0,
  },
  categoryCardStyle: {
    height: 100, // Điều chỉnh chiều cao phù hợp
    width: 100, // Điều chỉnh chiều rộng phù hợp
    borderRadius: 12,
    resizeMode: "contain",
    marginHorizontal: 5,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  searchContainer: {
    margin: 10,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  searchInput: {
    fontSize: 16,
    color: "#333",
    paddingVertical: 6,
    paddingHorizontal: 10,
  },
  sliderContainer: {
    marginVertical: 12,
  },
  categoriesContainer: {
    backgroundColor: "#ffffff",
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 10,
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  categoriesTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#374151",
    marginBottom: 8,
  },
  categoryList: {
    paddingHorizontal: 5,
  },
  productListContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    backgroundColor: "#ffffff",
    paddingVertical: 12,
    marginHorizontal: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  noProductsText: {
    padding: 12,
    color: "#6b7280",
    textAlign: "center",
  },
  productCardStyle: {
    width: 250,
    height: 260,
    margin: 12,
    borderRadius: 15,
    backgroundColor: "#ffffff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
});

export default HomeScreen;
