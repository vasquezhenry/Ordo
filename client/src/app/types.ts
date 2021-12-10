export interface RestaurantAddressDto {
  address1: string;
  address2?: string;
  address3?: string;
  address4?: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  phoneNumber: string;
}
export interface CreateRestaurantDto {
  name: string;
  ownerId: string;
  description?: string;
  addresses: RestaurantAddressDto[];
}

export interface Restaurant {
  id: string;
  name: string;
  type: string;
  ownerId: string;
  description: string;
  menuId: string;
  addresses: RestaurantAddressDto[];
}

export interface Menu {
  description: string;
  restaurantId: string;
  categories: Category[];
}

export interface Category {
  id: string;
  name: string;
  description: string;
  menuId: string;
  items: Item[]
}

export interface CreateCategoryDto {
  name: string;
  description: string;
}

export interface Item {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  price: number;
  active: boolean;
  categoryId: string;
}

export interface CreateItemDto {
  name: string;
  description: string;
  imageUrl: string;
  price: number;
}

export interface UpdateItemDto {
  name: string;
  description?: string;
  imageUrl: string;
  price: number;
  active: boolean;
  categoryId: string;
}
