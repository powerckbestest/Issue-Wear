export type ProductType = {
    id: number,
    title: string,
    description: string
    price: string,
    categoryId: string,
    Color: ColorId
    Image: Url
    size: string
}

export type ColorId = {
    title: string
}

export type Url = {
    url: string
}


export type ProductFormType = {
    id: HTMLInputElement,
    title: HTMLInputElement,
    description: HTMLInputElement
    price: HTMLInputElement,
    categoryId: HTMLInputElement,
    colorId: HTMLInputElement,
    size: HTMLInputElement,
}

