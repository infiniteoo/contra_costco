using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Configuration;
using Amazon;
using Amazon.DynamoDBv2;
using Amazon.DynamoDBv2.DataModel;
using Amazon.Extensions.NETCore.Setup;

namespace ContraCostco
{
    public class Startup(IConfiguration configuration)
    {
        public IConfiguration Configuration { get; } = configuration;

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers();

            // Add AWS service configuration
            services.AddDefaultAWSOptions(Configuration.GetAWSOptions());

            // Add DynamoDB client
            services.AddAWSService<IAmazonDynamoDB>();

            // Add DynamoDB context
            services.AddSingleton<IDynamoDBContext, DynamoDBContext>(sp =>
            {
                var client = sp.GetService<IAmazonDynamoDB>();
                return new DynamoDBContext(client);
            });

            // Other service configurations can go here
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            // ... Other configurations ...

            app.UseRouting();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
