using System;
using MongoDB.Bson.Serialization.Attributes;

namespace Ordo.Services.Ordering.API.Orders;

public class Order
{
    [BsonId]
    [BsonRepresentation(MongoDB.Bson.BsonType.ObjectId)]
    public string Id { get; set; }

    public string CustomerId { get; set; }

    public decimal Total { get; set; }
}

