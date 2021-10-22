using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Ordo.Services.Ordering.API.Orders;

namespace Ordering.API.Controllers
{
    [Route("api/orders")]
    public class OrdersController : Controller
    {
        private readonly OrderService _orderService;
        private readonly IMapper _mapper;

        public OrdersController(OrderService orderService, IMapper mapper)
        {
            _orderService = orderService;
            _mapper = mapper;
        }

        // GET: api/values
        [HttpGet]
        public IEnumerable<Order> Get()
        {
            return _orderService.Read();
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/values
        [HttpPost]
        public ActionResult<Order> Post([FromBody] CreateOrderDto order)
        {
            return _orderService.Create(_mapper.Map<Order>(order));
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}

