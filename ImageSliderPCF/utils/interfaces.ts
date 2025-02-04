export interface ImageSliderItem {
    id: number | string;
    imageUrl: string;
    name?: string;
}

export interface ImageSliderProps {
    imageUrls: ImageSliderItem[];
    width?: number;
    iconColour?: string | undefined;
}
