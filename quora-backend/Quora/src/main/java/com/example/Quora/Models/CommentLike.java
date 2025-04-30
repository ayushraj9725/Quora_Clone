package com.example.Quora.Models;

import jakarta.persistence.*;

@Entity
@DiscriminatorValue("COMMENT")
public class CommentLike extends Like {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "comment_id")
    private Comment comment;

}
