package com.luv2code.spring_boot_library.config;

import com.luv2code.spring_boot_library.Entity.Book;
import com.luv2code.spring_boot_library.Entity.Checkout;
import com.luv2code.spring_boot_library.Entity.Review;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.config.annotation.CorsRegistry;



@Configuration
public class MyDataRestConfig implements RepositoryRestConfigurer {

    private String theAllowedOrigins = "http://localhost:3000";

    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config,
                                                     CorsRegistry cors) {

        HttpMethod[] theUnsupportedMethods = { HttpMethod.POST, HttpMethod.PUT, HttpMethod.DELETE ,HttpMethod.PATCH};

        config.exposeIdsFor(Book.class);
        config.exposeIdsFor(Review.class);
        config.exposeIdsFor(Checkout.class);

        disableHttpMethods(Book.class, config ,theUnsupportedMethods);
        disableHttpMethods(Review.class, config ,theUnsupportedMethods);
        disableHttpMethods(Checkout.class, config ,theUnsupportedMethods);

        /* Configure CORS Mapping */
        cors.addMapping(config.getBasePath() + "/**")
                .allowedOrigins(theAllowedOrigins).allowedHeaders("*");




    }


    private void disableHttpMethods(Class theClass,
                                    RepositoryRestConfiguration config,
                                    HttpMethod[] theUnsupportedMethods) {

        config.getExposureConfiguration()
                .forDomainType(theClass)
                .withItemExposure((metdata, httpMethods) ->httpMethods.disable(theUnsupportedMethods))
                .withCollectionExposure((metdata, httpMethods) -> httpMethods.disable(theUnsupportedMethods));
    }

}
