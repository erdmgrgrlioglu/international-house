package com.international_house.backend.repository;

import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.international_house.backend.entity.ConsultationEvent;

@Repository
public interface ConsultationEventRepository extends JpaRepository<ConsultationEvent, UUID> {
    @Modifying
    @Transactional
    @Query("UPDATE ConsultationEvent c SET c = ?2 WHERE c.id = ?1")
    int updateConsultationHourById(UUID id, ConsultationEvent update);
}
