export interface IProductProps{ 
    item: { 
        _id: string; 
        name: string; 
        images: [string]; 
        price: number; 
        oldPrice: number; 
        description: string; 
        quantity?: number; 
        inStock: boolean; 
        isFeatured: boolean; 
        category: string; 
    }; 
    productProps: { 
        imageBg?: string; 
        percentageWidth?: string; 
        onPress?: () => void;
    }; 
    pStyleProps: {
        width?: number; 
        height?: number; 
        marginHorzontal?: number; 
        marginBottom?: number; 
        resizeMode?: "contain" | "cover" | "stretch";
    }; 
}