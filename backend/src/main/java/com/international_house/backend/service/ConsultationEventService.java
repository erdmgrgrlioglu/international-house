package com.international_house.backend.service;

import com.international_house.backend.entity.ConsultationEvent;

import java.util.List;
import java.util.UUID;

public interface ConsultationEventService {
    ConsultationEvent createConsultationEvent(ConsultationEvent event);

    ConsultationEvent getConsultationEvent(UUID id);

    List<ConsultationEvent> getConsultationEvents();

    void updateConsultationEvent(UUID id, ConsultationEvent update);

    void deleteConsultationEvent(UUID id);
}
