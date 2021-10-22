
using AutoMapper;
using Ordo.Services.Catalog.API.Categories;
using Ordo.Services.Catalog.API.Items;
using Ordo.Services.Catalog.API.Menus;
using Ordo.Services.Catalog.API.RestaurantAddresses;
using Ordo.Services.Catalog.API.Restaurants;

namespace Ordo.Services.Catalog.API.Mappings
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