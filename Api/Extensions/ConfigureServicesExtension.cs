using System;
using System.IO;
using System.Reflection;
using Api.Categories;
using Api.Items;
using Api.Restaurants;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;

namespace Api.Extensions
{
    public static class ConfigureServicesExtension
    {

        public static IServiceCollection ConfigureAuthentication(this IServiceCollection services, IConfiguration config)
        {
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(opt =>
                      {
                          var projectId = config["Firebase:ProjectId"];
                          opt.Authority = $"https://securetoken.google.com/{projectId}";
                          opt.TokenValidationParameters = new TokenValidationParameters
                          {
                              ValidateIssuer = true,
                              ValidIssuer = $"https://securetoken.google.com/{projectId}",
                              ValidAudience = projectId,
                              ValidateLifetime = true
                          };
                      });

            return services;
        }
        public static IServiceCollection ConfigureRepositories(this IServiceCollection services)
        {
            services.AddScoped<RestaurantRepository>();
            services.AddScoped<CategoryRepository>();
            services.AddScoped<ItemRepository>();

            return services;
        }
        public static IServiceCollection ConfigureSwagger(this IServiceCollection services)
        {
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo
                {
                    Title = "Ordo API",
                    Version = "v1",
                    Description = "REST API for Ordo App",
                    TermsOfService = new Uri("https://example.com/terms"),
                    Contact = new OpenApiContact
                    {
                        Name = "Henry Vasquez",
                        Email = "vasquezhenrya@gmail.com",
                        Url = new Uri("https://github.com/vasquezhenry")
                    },
                    License = new OpenApiLicense
                    {
                        Name = "Use under LICX",
                        Url = new Uri("https://example.com/license"),
                    }
                });


                var jwtSecurityScheme = new OpenApiSecurityScheme
                {
                    Scheme = "bearer",
                    BearerFormat = "JWT",
                    Name = "JWT Authentication",
                    In = ParameterLocation.Header,
                    Type = SecuritySchemeType.Http,
                    Description = "Put **_ONLY_** your JWT Bearer token on textbox below!",

                    Reference = new OpenApiReference
                    {
                        Id = JwtBearerDefaults.AuthenticationScheme,
                        Type = ReferenceType.SecurityScheme
                    }
                };

                c.AddSecurityDefinition(jwtSecurityScheme.Reference.Id, jwtSecurityScheme);

                c.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        { jwtSecurityScheme, Array.Empty<string>() }
    });

                var xmlFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
                var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);
                c.IncludeXmlComments(xmlPath);
            });

            return services;
        }
    }
}