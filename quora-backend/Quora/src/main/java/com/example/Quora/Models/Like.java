package com.example.Quora.Models;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
//@Builder
@NoArgsConstructor
@AllArgsConstructor

@Table(name = "user_likes")  // No SQL conflict
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
public class Like extends BaseModel {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    protected User user;

}

