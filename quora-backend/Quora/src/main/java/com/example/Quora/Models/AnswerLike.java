package com.example.Quora.Models;

import jakarta.persistence.*;

@Entity
@DiscriminatorValue("ANSWER")
public class AnswerLike extends Like {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "answer_id")
    private Answer answer;

}
