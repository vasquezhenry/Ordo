using System;
using MongoDB.Driver;
using Ordo.Services.Ordering.API.Data;

namespace Ordo.Services.Ordering.API.Orders;

public class OrderService
{
    private readonly IMongoCollection<Order> _orders;

    public OrderService(IConfiguration config)
    {
        var client = new MongoClient(config["OrderingServiceDB:ConnectionString"]);
        var database = client.GetDatabase(config["OrderingServiceDB:DatabaseName"]);
        _orders = database.GetCollection<Order>("Orders");
    }

    public Order Create(Order order)
    {
        _orders.InsertOne(order);
        return order;
    }

    public IEnumerable<Order> Read() => _orders.Find(t => t.Id != null).ToList();

}


