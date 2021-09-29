using Api.Categories;
using Api.Items;
using Api.Menus;
using Api.RestaurantAddresses;
using Api.Restaurants;
using AutoMapper;

namespace Api.Mappings
{
    public class AppDataMappingProfiles : Profile
    {
        public AppDataMappingProfiles()
        {
            CreateMap<Restaurant, CreateRestaurantDto>().ForMember(dest => dest.Addresses, map => map.MapFrom(source => source.RestaurantAddresses)).ReverseMap(); ;
            CreateMap<Restaurant, RestaurantDto>().ForMember(dest => dest.Addresses, map => map.MapFrom(source => source.RestaurantAddresses)).ReverseMap();
            CreateMap<CreateRestaurantDto, RestaurantAddressDto>().ReverseMap();
            CreateMap<RestaurantAddressDto, RestaurantAddress>().ReverseMap();

            CreateMap<Category, CreateCategoryDto>().ReverseMap();
            CreateMap<Category, CategoryDto>().ReverseMap();

            CreateMap<Menu, MenuDto>();

            CreateMap<Item, ItemDto>().ReverseMap();
            CreateMap<Item, CreateItemDto>().ReverseMap();
            CreateMap<Item, UpdateItemDto>().ReverseMap();
        }
    }
}