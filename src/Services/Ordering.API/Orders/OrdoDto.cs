using System;
using System.ComponentModel.DataAnnotations;

namespace Ordo.Services.Ordering.API.Orders;

public class OrderDto
{
    public string CustomerId { get; set; }

    public decimal Total { get; set; }
}

