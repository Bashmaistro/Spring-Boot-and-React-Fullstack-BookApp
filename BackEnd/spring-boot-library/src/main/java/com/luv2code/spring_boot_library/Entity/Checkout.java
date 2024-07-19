package com.luv2code.spring_boot_library.Entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "checkout", schema = "reactlibrarydatabase")
@Data
public class Checkout {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "user_email", length = 45)
    private String userEmail;

    @Column(name = "checkout_date", length = 45)
    private String checkoutDate;

    @Column(name = "return_date", length = 45)
    private String returnDate;

    @Column(name = "book_id")
    private Long bookId;

    public Checkout() {
    }

    public Checkout(String userEmail, String checkoutDate, String returnDate, Long bookId) {
        this.userEmail = userEmail;
        this.checkoutDate = checkoutDate;
        this.returnDate = returnDate;
        this.bookId = bookId;
    }
}