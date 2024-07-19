package com.luv2code.spring_boot_library.Controller;

import com.luv2code.spring_boot_library.Entity.Book;
import com.luv2code.spring_boot_library.Services.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/api/books")
public class BookController {

    private BookService bookService;

    @Autowired
    public BookController(BookService bookService) {

        this.bookService = bookService;
    }

    @PutMapping("/secure/checkout")
    public Book checkoutBook(@RequestParam Long bookId)throws Exception {
        String userEmail ="testuser@gmail.com";
        return this.bookService.checkout(userEmail,bookId);
    }

    @GetMapping("/secure/ischeckedout/byuser")
    public Boolean checkoutBookByUser(@RequestParam Long bookId)throws Exception {
        String userEmail ="testuser@gmail.com";

        return this.bookService.checkoutBookByUserEmail(userEmail,bookId);
    }

    @GetMapping("/secure/currentloans/count")
    public int currentLoansCount()throws Exception {

        String userEmail ="testuser@gmail.com";
        return bookService.currentLoansCount(userEmail);

    }




}
