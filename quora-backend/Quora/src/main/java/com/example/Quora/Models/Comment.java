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
@Table(name = "Comments")
public class Comment extends BaseModel{

    @Column(nullable = false , columnDefinition = "TEXT")
    private String text ;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id" , nullable = false)
    private User user ;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "answer_id")
    private Answer answer ;  // For top-level comments on answers

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "parent_comment_id")
    private Comment parentComment ;  // for nested comment

    @OneToMany(mappedBy = "parentComment" , cascade = CascadeType.ALL)
    private List<Comment> replies = new ArrayList<>();

    @OneToMany(mappedBy = "comment" , cascade = CascadeType.ALL)
    private List<CommentLike> commentLikes = new ArrayList<>();

}
