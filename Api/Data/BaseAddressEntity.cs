using System;

namespace Api.Data
{
    public class BaseAddressEntity
    {
        public Guid Id { get; set; }
        public string Address1 { get; set; }
        public string Address2 { get; set; } = "N/A";
        public string Address3 { get; set; } = "N/A";
        public string Address4 { get; set; } = "N/A";
        public string City { get; set; }
        public string State { get; set; }
        public string Country { get; set; }
        public string PostalCode { get; set; }
        public string PhoneNumber { get; set; }
       
    }
}