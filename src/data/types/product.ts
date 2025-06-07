interface ImageObj {
  thumbnail: string;
  mobile: string;
  desktop: string;
  tablet: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  image: ImageObj;
}
