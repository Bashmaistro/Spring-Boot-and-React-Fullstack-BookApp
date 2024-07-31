package com.luv2code.spring_boot_library.Services;

import com.luv2code.spring_boot_library.Dao.BookRepository;
import com.luv2code.spring_boot_library.Dao.ReviewRepository;
import com.luv2code.spring_boot_library.Entity.Review;
import com.luv2code.spring_boot_library.requestmodels.ReviewRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Date;
import java.time.LocalDate;

@Service
@Transactional
public class ReviewService {



    private ReviewRepository reviewRepository;

    @Autowired
    public ReviewService( ReviewRepository reviewRepository) {

        this.reviewRepository = reviewRepository;
    }



    public void postReview(String userEmail , ReviewRequest reviewRequest) throws Exception{

        Review validateReview = reviewRepository.findByUserEmailAndBookId(userEmail, reviewRequest.getBookId());

        if (validateReview != null) {
            throw new Exception();
        }

        Review review = new Review();
        review.setUserEmail(userEmail);
        review.setBookId(reviewRequest.getBookId());
        review.setDate(Date.valueOf(LocalDate.now()));
        review.setRating(reviewRequest.getRating());

        if (reviewRequest.getReviewDescription().isPresent()){
            review.setReviewDescription(reviewRequest.getReviewDescription().map(
                    Object::toString
            ).orElse(null));
        }

        reviewRepository.save(review);

    }


    public Boolean userReviewListed(String userEmail, Long bookId) throws Exception{


        Review validateReview = reviewRepository.findByUserEmailAndBookId(userEmail, bookId);

        return validateReview != null;
    }







}
