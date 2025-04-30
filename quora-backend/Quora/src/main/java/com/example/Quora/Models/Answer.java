package com.example.Quora.Models;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
//@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "Answers")
public class Answer extends BaseModel{

    @Column(nullable = false , columnDefinition = "TEXT")
    private String text ; // writing text as comment

    @ManyToOne
    @JoinColumn(name = "question_id")
    private Question question ;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user ;

    @OneToMany(mappedBy = "answer" , cascade = CascadeType.ALL)
    private List<Comment> comment = new ArrayList<>();

    @OneToMany(mappedBy = "answer" , cascade = CascadeType.ALL)
    private List<AnswerLike> Likes = new ArrayList<>();

}
