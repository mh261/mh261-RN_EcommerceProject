import express, { Request, Response } from 'express'
import { PRODUCTS } from '../Models/ProductModel'
import { ProductParams, UpdateProduct } from '../dto/Product';

const path = 'http://localhost:9000/assets/'

export const createProduct = async (req: Request, res: Response) => {
    const { name, price, oldPrice, description, quantity, inStock, isFeatured,
        category } = <ProductParams>req.body;

    const files = req.files as [Express.Multer.File];
    const images = files.map((file: Express.Multer.File) => path + file.filename);

    const product = new PRODUCTS({
        name: name,
        images: images,
        price, oldPrice, description, quantity, inStock, isFeatured, category
    });

    try {
        console.log(product)
        await product.save();
        res.status(200).json(`Product created successfully:))) + ${path}!!!`)
    } catch (error) {
        res.status(500).json(`Failed to create Product ${error}:(((`)
    }
}
export const getProductByCatID = async (req: Request, res: Response) => {
    console.log(req.params.CatID)
    try {

        const result = await PRODUCTS.find({ category: req.params.CatID });
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json(`Failed to get Products fetch ${error}:(((`)
    }
}
export const getProductByID = async (req: Request, res: Response) => {
    try {
        const result = await PRODUCTS.findById(req.params.id);
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json(`Failed to get Product fetch ${error}:(((`)
    }
}
export const getAllProducts = async (req: Request, res: Response) => {
    try {
        const result = await PRODUCTS.find();
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json(`Failed to get Products fetch ${error}:(((`)
    }
}

export async function updateProduct(req: Request, res: Response) {
    const { name } = <UpdateProduct>req.body;
    const files = req.files as [Express.Multer.File];

    if (files) {
        const images = files.map(file => `${path}${file.filename}`);
        try {
            const catUpdate = await PRODUCTS.findByIdAndUpdate(req.params.id,
                { name: name, images: images }, { new: true });
            res.status(200).json("Category updated successfully:)))");
        } catch (error) {
            res.status(500).json(`Failed to update Category ${error}:(((`);
        }
    }
    else {
        try {
            const catUpdate = await PRODUCTS.findByIdAndUpdate(req.params.id, { name: name });
            res.status(200).json("Product updated successfully:)))");
        } catch (error) {
            res.status(500).json(`Failed to update Proudct ${error}:(((`);
        }
    }
}

export const deleteProduct = async (req: Request, res: Response) => {
    try {
        await PRODUCTS.findByIdAndDelete(req.params.id);
        res.status(200).json("product deleted successfully:)))")
    } catch (error) {
        res.status(500).json(`Failed to delete product ${error}:(((`)
    }
}
export const getTrendingProducts = async (req: Request, res: Response) => {
    try {
        const result = await PRODUCTS.find({ isFeatured: true }).sort({ createdAt: -1 }).limit(4)
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json(`Products get fail! ${error}`)
    }
}

export const searchProducts = async (req: Request, res: Response) => {
    try {
        const query = req.query;
        // if (!query) {
        //     return res.status(400).json({ message: "Query parameter is required" });
        // }
        const result = await PRODUCTS.find({ name: { $regex: query.query, $options: "i" } });
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: `Product search failed! ${error}` });
    }
};


