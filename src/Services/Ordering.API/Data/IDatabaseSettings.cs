using System;
namespace Ordo.Services.Ordering.API.Data;

public interface IDatabaseSettings
{
    string ConnectionString { get; set; }
    string DatabaseName { get; set; }
}


