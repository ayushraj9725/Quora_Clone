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
@Table(name = "Questions")
public class Question extends BaseModel {

    @Column(nullable = false)
    private String title ;

    private String body ;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user ;

    @OneToMany(mappedBy = "question")
    private List<Answer> answers = new ArrayList<>();

    @ManyToMany
    @JoinTable(
            name = "question_topics" ,  // join table name
            joinColumns = @JoinColumn(name = "question_id") , // foreign key of question table
            inverseJoinColumns = @JoinColumn(name = "topic_id")  // foreign key of topic table
    )
    private Set<Topic> topics = new HashSet<>();  // multiple topic has multiple question , and multiple question belong from multiple topic

    @OneToMany(mappedBy = "question")
    private List<QuestionLike> Likes = new ArrayList<>();

}
