import axios, { AxiosResponse } from 'axios';
import {
  Category,
  CreateCategoryDto,
  CreateItemDto,
  CreateRestaurantDto,
  Item,
  Restaurant,
  UpdateItemDto,
} from '../types';

//Constant global key name used to get access token from local storage
export const JWT_KEY = 'access_token';

//Base axios instance all outgoing api requests will use
export const instance = axios.create({ baseURL: process.env.REACT_APP_API_URL });

/**
 * Request interceptor for all outgoing requests
 * This interceptor gets the access token from localStorage and attaches it to the Authorization Header
 */
instance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem(JWT_KEY);
    config.headers = {
      Authorization: `Bearer ${accessToken}`,
    };
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);
const Restaurants = {
  //Create a restaurant for this ownerId
  async createRestaurant(ownerId: string, r: CreateRestaurantDto): Promise<AxiosResponse<Restaurant>> {
    return instance.post(`/owners/${ownerId}/restaurants`, r);
  },
  //All the restaurants given a ownerId
  async getRestaurants(ownerId: string): Promise<AxiosResponse<Restaurant[]>> {
    return instance.get(`/owners/${ownerId}/restaurants`);
  },
  //Update existing resturant
  async updateRestaurant(restaurantId: string, r: Restaurant): Promise<AxiosResponse<Restaurant>> {
    return instance.put(`/restaurants/${restaurantId}`, r);
  },
  async deleteRestaurant(restaurantId: string): Promise<AxiosResponse<Restaurant>> {
    return instance.delete(`/restaurants/${restaurantId}`);
  }
};
const Items = {
  //Create item given a categoryId
  async createItem(categoryId: string, item: CreateItemDto): Promise<AxiosResponse<Item>> {
    return instance.post(`/categories/${categoryId}/items`, item);
  },
  //Get all items by categoryId
  async getItems(categoryId: string): Promise<AxiosResponse<Item[]>> {
    return instance.get(`/categories/${categoryId}/items`);
  },
  //Update an item by itemId(NOTE: If you want to "delete" an item just change active to false on the item)
  async updateItem(itemId: string, item: UpdateItemDto): Promise<AxiosResponse<Item>> {
    return instance.put(`/items/${itemId}`, item);
  },
  async deleteItem(itemId: string): Promise<AxiosResponse<Item>> {
    return instance.delete(`/items/${itemId}`);
  }
};

const Categories = {
  //Create category given menuId and category dto
  async createCategory(menuId: string, category: CreateCategoryDto): Promise<AxiosResponse<Category>> {
    return instance.post(`/menus/${menuId}/categories`, category);
  },
  //Get all categories by a given menuId
  async getCategories(menuId: string): Promise<AxiosResponse<Category[]>> {
    return instance.get(`/menus/${menuId}/categories`);
  },
  //delete category by id
  async deleteCategories(id: string): Promise<AxiosResponse> {
    return instance.delete(`/categories/${id}`)
  }
};

export const API = {
  Restaurants,
  Items,
  Categories,
};
