using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;


namespace YourNamespace
{
    public class Startup
    {
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers(); // Add this line to configure controllers.

            // Other service configurations go here.
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            app.UseRouting();

            app.UseEndpoints(endpoints =>
            {
                app.UseEndpoints(endpoints =>
                    {
                        endpoints.MapControllers();
                    });
            });
        }
    }
}
