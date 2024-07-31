package com.luv2code.spring_boot_library.Controller;

import com.luv2code.spring_boot_library.Entity.Review;
import com.luv2code.spring_boot_library.Services.ReviewService;
import com.luv2code.spring_boot_library.requestmodels.ReviewRequest;
import com.luv2code.spring_boot_library.utils.ExtractJWT;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/api/reviews")
public class ReviewController {

    private final ReviewService reviewService;

    @Autowired
    public ReviewController(ReviewService reviewService) {
        this.reviewService = reviewService;
    }



    @PostMapping("/secure")
    public void postReview(@RequestHeader(value = "Authorization") String token,
                           @RequestBody ReviewRequest reviewRequest) throws Exception {


        String userEmail = ExtractJWT.extractJWT(token,"\"sub\"");

        if (userEmail == null){

            throw new Exception("User email not found");
        }

        reviewService.postReview(userEmail , reviewRequest);

    }

    @GetMapping("/secure/user/book")
    public Boolean reviewBookbyUser(@RequestHeader(value = "Authorization")String token ,
                                    @RequestParam Long bookId ) throws Exception {

        String userEmail = ExtractJWT.extractJWT(token,"\"sub\"");

        if (userEmail == null){
            throw new Exception("User email not found");

        }

        return reviewService.userReviewListed(userEmail , bookId);

    }

}
