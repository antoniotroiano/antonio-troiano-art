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

export interface UpdateShopImageDto {
    title: string;
    description: string;
    price: string;
    size: string;
    technique: string;
    year: string;
    youTubeLink: string;
    sold: boolean;
    shopImageUrls: string[];
}
