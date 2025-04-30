package com.example.Quora.Repositories;

import com.example.Quora.Models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User,Long> {


    // writing the message to interact with database or user table


}
