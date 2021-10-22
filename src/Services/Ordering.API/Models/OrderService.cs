using System;
using MongoDB.Driver;
using Ordo.Services.Ordering.API.Data;

namespace Ordo.Services.Ordering.API.Models;

public class OrderService
{
    private readonly IMongoCollection<Order> _orders;

    public OrderService(IDatabaseSettings settings)
    {
        var client = new MongoClient(settings.ConnectionString);
        var database = client.GetDatabase(settings.DatabaseName);
        _orders = database.GetCollection<Order>("Orders");
    }

    public Order Create(Order order)
    {
        _orders.InsertOne(order);
        return order;
    }

    public IEnumerable<Order> Read() => _orders.Find(t => t.Id != null).ToList();

}


