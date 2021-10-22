using System;
using System.ComponentModel.DataAnnotations;

namespace Ordo.Services.Ordering.API.Orders;

public class CreateOrderDto
{
    [Required]
    public string CustomerId { get; set; }

    [Required]
    public decimal Total { get; set; }
}

