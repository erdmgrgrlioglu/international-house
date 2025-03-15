package com.international_house.backend.repository;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.international_house.backend.entity.Information;

@Repository
public interface InformationRepository extends JpaRepository<Information, Integer> {

    @Modifying
    @Transactional
    @Query("UPDATE Information v SET v.content = ?2 WHERE v.language = ?1")
    int updateInformationByLanguage(String language, Information update);

    @Query("SELECT i FROM Information i WHERE i.language = ?1")
    Optional<Information> findByLanguage(String language);
}
