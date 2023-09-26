export type ProductType = {
  id: number;
  title: string;
  description: string;
  price: string;
  categoryId: string;
  Color: ColorType;
  Images: ImageType[];
  Category: CategoryType;
  Size: SizeType;
  ProductSize?: ProductSizeType;
};

export type ProductSizeType = {
  id: number;
  productId: number;
  sizeId: number;
  count: number;
  Product: ProductType;
  Size: SizeType;
};

export type SizeType = {
  id: number;
  title: string;
};

export type ImageType = {
  id: number;
  productId: number;
  url: string;
  forConstructor: boolean;
};

export type ColorType = {
  id: number;
  title: string;
};

export type CategoryType = {
  id: number;
  title: string;
};

export type ColorId = {
  title: string;
};

export type Url = {
  url: string;
};

export type ProductFormType = {
  id: HTMLInputElement;
  title: HTMLInputElement;
  description: HTMLInputElement;
  price: HTMLInputElement;
  categoryId: HTMLInputElement;
  colorId: HTMLInputElement;
  size: HTMLInputElement;
};

export type OrderFormType = {
  name: HTMLInputElement;
  phone: HTMLInputElement;
  address: HTMLInputElement;
};
