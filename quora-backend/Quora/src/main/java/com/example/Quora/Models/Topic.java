package com.example.Quora.Models;

import jakarta.persistence.*;
import lombok.*;

import java.util.HashSet;
import java.util.Set;

@Entity
@Getter
@Setter
// @Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "Topics")
public class Topic extends BaseModel{

    @Column(nullable = false , unique = true)
    private String name ;

    @ManyToMany(mappedBy = "topics") // Points to the field in Question
    private Set<Question> questions = new HashSet<>();


    // setters and getters and constructors

}
