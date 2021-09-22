using System;
namespace Api.Data
{
    public class BaseEntity
    {
        public Guid Id { get; init; }
        public DateTime CreatedDate { get; set; }
        public DateTime? UpdatedDate { get; set; }
    }
}