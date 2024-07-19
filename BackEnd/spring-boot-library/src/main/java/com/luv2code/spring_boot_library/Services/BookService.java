package com.luv2code.spring_boot_library.Services;

import com.luv2code.spring_boot_library.Dao.BookRepository;
import com.luv2code.spring_boot_library.Dao.CheckoutRepository;
import com.luv2code.spring_boot_library.Entity.Book;
import com.luv2code.spring_boot_library.Entity.Checkout;
import org.springframework.cglib.core.Local;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.Optional;


@Service
@Transactional
public class BookService {

    private BookRepository bookRepository;
    private CheckoutRepository checkoutRepository;


    public BookService(BookRepository bookRepository, CheckoutRepository checkoutRepository) {
        this.bookRepository = bookRepository;
        this.checkoutRepository = checkoutRepository;
    }

    public Book checkout(String userEmail  , Long bookId ) throws Exception{

        Optional<Book> book = this.bookRepository.findById(bookId);

        Checkout validateCheckout = checkoutRepository.findByUserEmailAndBookId(userEmail, bookId);

        if (!book.isPresent() || validateCheckout != null || book.get()
                .getCopiesAvailable() <= 0){

            throw new Exception("Book doesnt exists");
        }

        book.get().setCopiesAvailable(book.get().getCopiesAvailable() - 1);
        bookRepository.save(book.get());


        Checkout checkout = new Checkout(
                userEmail,
                LocalDate.now().toString(),
                LocalDate.now().plusDays(7).toString(),
                book.get().getId()
        );
        checkoutRepository.save(checkout);
        return book.get();

    }

    public Boolean checkoutBookByUserEmail(String userEmail , Long bookId ) throws Exception{
        Checkout validateCheckout = checkoutRepository.findByUserEmailAndBookId(userEmail, bookId);

        if (validateCheckout != null){
            return true;
        }else {
            return false;
        }
    }

    public int currentLoansCount(String userEmail ) throws Exception{

        return checkoutRepository.findBooksByUserEmail(userEmail).size();
    }
}
