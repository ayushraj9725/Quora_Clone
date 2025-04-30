package com.example.Quora.Models;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Getter
@Setter
//@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "Users")
public class User extends BaseModel{

    @Column(nullable = false , unique = true)
    private String username ;

    @Column(nullable = false ,unique = true)
    private String email ;

    private String bio ;

    @OneToMany(mappedBy = "user" , cascade = CascadeType.ALL)
    private List<Question> questions = new ArrayList<>(); // establishing the relationship btw user and question , one user have many questions

    @OneToMany(mappedBy = "user" , cascade = CascadeType.ALL)
    private List<Answer> answers = new ArrayList<>(); // also one user do answers of multiple answer of any or diff-diff question

    @OneToMany(mappedBy = "user" , cascade = CascadeType.ALL)
    private List<Comment> comments = new ArrayList<>(); // one user can do multiple comments on post

    @OneToMany(mappedBy = "user" , cascade = CascadeType.ALL )
    private List<Like> likes = new ArrayList<>(); // one user can do multiple likes on post like ( question , answer , comments etc. )

    @ManyToMany
    @JoinTable(
            name = "user_followers",  // new table
            joinColumns = @JoinColumn(name = "follower_id"),
            inverseJoinColumns = @JoinColumn(name = "following_id")
    )
    private Set<User> following = new HashSet<>();

    @ManyToMany(mappedBy = "following")
    private Set<User> followers = new HashSet<>();

    // getters and setters

}
