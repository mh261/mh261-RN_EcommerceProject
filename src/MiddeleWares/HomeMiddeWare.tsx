import React from "react";
import { ProductListParams, FetchProductsParam } from "../TypesCheck/HomeProps"
import axios from "axios"

interface ICatProps {
    setGetCategory: React.Dispatch<React.SetStateAction<ProductListParams[]>>
}
interface IProdByCatProps {
    catID: string;
    setGetProductsByCatID: React.Dispatch<React.SetStateAction<ProductListParams[]>>
}

interface IFeaturedProps {
    isFeatured: boolean;
    setFeaturedProducts: React.Dispatch<React.SetStateAction<ProductListParams[]>>;
}

const BASE_URL = "http://192.168.0.99";


export const fetchCategories = async ({ setGetCategory }: ICatProps) => {
    try {
        const response = await axios.get(`${BASE_URL}:9000/category/getAllCategories`);
        // console.log("API Response", response.data);

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

export const fetchProductsByCatID = async ({ catID, setGetProductsByCatID }: IProdByCatProps) => {
    try {
        const response: FetchProductsParam = await axios.get(`${BASE_URL}:9000/product/getProductByCatID/${catID}`);
        // console.log("API Response", response.data);

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

export const fetchFeaturedProducts = async ({ isFeatured, setFeaturedProducts }: IFeaturedProps) => {
    try {
        const response = await axios.get(`${BASE_URL}:9000/product/getFeaturedProducts/${isFeatured}`);
        // console.log("API Response", response.data);

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