using System;
using System.Net;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

namespace Api
{
    public class GlobalErrorHandler
    {
        private readonly RequestDelegate _next;

        public GlobalErrorHandler(RequestDelegate next)
        {
            _next = next;
        }

        public async Task Invoke(HttpContext context)
        {
            try
            {
                await _next.Invoke(context);
            }
            catch (Exception ex)
            {
                var response = context.Response;
                response.ContentType = "application/json";
                response.StatusCode = (int)HttpStatusCode.InternalServerError;

                var errorResponse = new
                {
                    message = ex.Message,
                    statusCode = response.StatusCode
                };

                var errorJson = JsonSerializer.Serialize(errorResponse);

                await response.WriteAsync(errorJson);
            }
        }
    }
}