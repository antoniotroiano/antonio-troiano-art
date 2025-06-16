export interface ShopImage {
    id: number;
    title: string;
    price: string;
    shopImageUrls: string[];
}

export interface ShopImageDetail extends ShopImage {
    year: string;
    technique: string;
    size: string;
    sold: boolean;
    youTubeLink: string;
    description: string;
}

export interface ShopImageType extends ShopImage {
    id: number;
    shopImageUrls: string[];
}
