import React from "react";
import { ProductListParams, FetchProductsParam } from "../TypesCheck/HomeProps";
import { IProductProps } from "../TypesCheck/ProductTypes";
import axios from "axios";

interface ICatProps {
    setGetCategory: React.Dispatch<React.SetStateAction<ProductListParams[]>>;
}

interface IProdByCatProps {
    catID: string;
    setGetProductsByCatID: React.Dispatch<React.SetStateAction<ProductListParams[]>>;
}

interface ITrendingProductProps {
    setTrendingProducts: React.Dispatch<React.SetStateAction<ProductListParams[]>>;
}

interface IFeaturedProps {
    isFeatured: boolean;
    setFeaturedProducts: React.Dispatch<React.SetStateAction<ProductListParams[]>>;
}

interface ISearchProps {
    searchQuery: string;
    setSearchResults: (data: ProductListParams[]) => void;
}

const BASE_URL = "http://192.168.1.11";

// Lấy danh mục sản phẩm
export const fetchCategories = async ({ setGetCategory }: ICatProps) => {
    try {
        const response = await axios.get(`${BASE_URL}:9000/category/getAllCategories`);
        console.log("API Response", response.data);

        if (Array.isArray(response.data)) {
            const fixedData = response.data.map(item => ({
                ...item,
                images: item.images.map((img: string) => img.replace("http://localhost", BASE_URL)),
            }));
            setGetCategory(fixedData);
        } else {
            console.warn("fetchCategories: Dữ liệu API không phải là mảng", response.data);
            setGetCategory([]);
        }
    } catch (error) {
        console.log("Axios get error", error);
        setGetCategory([]);
    }
};

// Lấy sản phẩm theo danh mục
export const fetchProductsByCatID = async ({ catID, setGetProductsByCatID }: IProdByCatProps) => {
    try {
        const response: FetchProductsParam = await axios.get(`${BASE_URL}:9000/product/getProductByCatID/${catID}`);
        console.log("API Response", response.data);

        if (Array.isArray(response.data)) {
            const fixedData = response.data.map(item => ({
                ...item,
                images: item.images.map((img: string) => img.replace("http://localhost", BASE_URL)),
            }));
            setGetProductsByCatID(fixedData);
        } else {
            console.warn("fetchProductsByCatID: Dữ liệu API không phải là mảng", response.data);
            setGetProductsByCatID([]);
        }
    } catch (error) {
        console.log("Axios get error", error);
        setGetProductsByCatID([]);
    }
};

// Lấy sản phẩm nổi bật
export const fetchTrendingProducts = async ({ setTrendingProducts }: ITrendingProductProps) => {
    try {
        const response: FetchProductsParam = await axios.get(`${BASE_URL}:9000/product/getTrendingProducts`);
        console.log("API Response", response.data);

        if (Array.isArray(response.data)) {
            const fixedData = response.data.map(item => ({
                ...item,
                images: item.images.map((img: string) => img.replace("http://localhost", BASE_URL)),
            }));
            setTrendingProducts(fixedData);
        } else {
            console.warn("fetchTrendingProducts: Dữ liệu API không phải là mảng", response.data);
            setTrendingProducts([]);
        }
    } catch (error) {
        console.error("Error fetching trending products:", error);
        setTrendingProducts([]);
    }
};

// Lấy sản phẩm nổi bật theo trạng thái isFeatured
export const fetchFeaturedProducts = async ({ isFeatured, setFeaturedProducts }: IFeaturedProps) => {
    try {
        const response = await axios.get(`${BASE_URL}:9000/product/getFeaturedProducts/${isFeatured}`);
        console.log("API Response", response.data);

        if (Array.isArray(response.data)) {
            const fixedData = response.data.map(item => ({
                ...item,
                images: item.images.map((img: string) => img.replace("http://localhost", BASE_URL)),
            }));
            setFeaturedProducts(fixedData);
        } else {
            console.warn("fetchFeaturedProducts: Dữ liệu API không phải là mảng", response.data);
            setFeaturedProducts([]);
        }
    } catch (error) {
        console.error("Error fetching featured products:", error);
        setFeaturedProducts([]);
    }
};

// 🔍 API tìm kiếm sản phẩm
export const fetchSearchedProducts = async ({ searchQuery, setSearchResults }: ISearchProps) => {
    try {
        const response = await axios.get(`${BASE_URL}:9000/product/search?q=${encodeURIComponent(searchQuery)}`);
        console.log("API Response", response.data);

        if (Array.isArray(response.data)) {
            const fixedData = response.data.map(item => ({
                ...item,
                images: item.images.map((img: string) => img.replace("http://localhost", BASE_URL)),
            }));
            setSearchResults(fixedData);
        } else {
            console.warn("fetchSearchedProducts: Dữ liệu API không phải là mảng", response.data);
            setSearchResults([]);
        }
    } catch (error) {
        console.error("Error fetching searched products:", error);
        setSearchResults([]);
    }
};

