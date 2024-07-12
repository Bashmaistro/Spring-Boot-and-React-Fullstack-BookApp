package com.luv2code.spring_boot_library.Dao;

import com.luv2code.spring_boot_library.Entity.Book;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookRepository extends JpaRepository<Book,Long> {



}
