package com.example.Quora.Models;

import jakarta.persistence.*;

@Entity
@DiscriminatorValue("QUESTION")
public class QuestionLike extends Like {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "question_id")
    private Question question;

}
