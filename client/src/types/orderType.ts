export type OrderType = {
  id: number;
  userId: number;
  statusId: number;
  phone: string;
  address: string;
};
export type OrderFromDb = {
  id: number;
  userId: number;
  statusId: number;
  address?: string;
  phone?: string;
  createdAt: string;
  updatedAt: string;
  OrderLists: OrderList[];
};

export type OrderList = {
  id: number;
  orderId: number;
  productSizeId: number;
  createdAt: string;
  updatedAt: string;
  ProductSize: ProductSize;
};

export type ProductSize = {
  id: number;
  productId: number;
  sizeId: number;
  count: number;
  createdAt: string;
  updatedAt: string;
  Size: Size;
  Product: Product;
};

export type Size = {
  id: number;
  title: string;
  createdAt: string;
  updatedAt: string;
};

export type Product = {
  id: number;
  title: string;
  categoryId: number;
  colorId: number;
  price: number;
  description: string;
  createdAt: string;
  updatedAt: string;
  Color: Color;
  Images: Image[];
  Category: Category;
};

export type Color = {
  id: number;
  title: string;
  createdAt: string;
  updatedAt: string;
};

export type Image = {
  id: number;
  productId: number;
  url: string;
  forConstructor: boolean;
  createdAt: string;
  updatedAt: string;
};

export type Category = {
  id: number;
  title: string;
  createdAt: string;
  updatedAt: string;
};

export type NewStatusTypeForm = {
    newStatus: HTMLInputElement
}

export type StatusType = {
    id: number
    title:string
}