export interface Portfolio {
    id: string;
    title: string;
    year: string;
    tags: string[];
    imageUrls: string[];
};

export interface UpdatePortfolioDto {
    title: string;
    year: string;
    tags: string[];
    imageUrls: string[];
}
