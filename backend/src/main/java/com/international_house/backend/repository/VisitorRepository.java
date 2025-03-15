package com.international_house.backend.repository;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.international_house.backend.entity.Visitor;

@Repository
public interface VisitorRepository extends JpaRepository<Visitor, String> {
    @Modifying
    @Transactional
    @Query("UPDATE Visitor v SET v = ?2 WHERE v.id = ?1")
    int updateVisitorById(String id, Visitor update);

    @Query("SELECT v FROM Visitor v WHERE v.timeStamp = ?1")
    Optional<Visitor> findByTimeStamp(Long timeStamp);
}
