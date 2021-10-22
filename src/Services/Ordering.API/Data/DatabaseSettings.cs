using System;
namespace Ordo.Services.Ordering.API.Data;
public class DatabaseSettings : IDatabaseSettings
{

    public string ConnectionString { get; set; }
    public string DatabaseName { get; set; }
}


