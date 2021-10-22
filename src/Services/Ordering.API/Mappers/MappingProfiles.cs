using System;
using AutoMapper;
using Ordo.Services.Ordering.API.Orders;

namespace Ordo.Services.Ordering.API.Mappers;

public class MappingProfiles : Profile
{
    public MappingProfiles()
    {
        CreateMap<Order, OrderDto>();
        CreateMap<CreateOrderDto, Order>();
    }
}


