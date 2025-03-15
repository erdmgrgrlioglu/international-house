package com.international_house.backend.service;

import com.international_house.backend.entity.Consultation;

import java.util.List;

public interface ConsultationService {
    Consultation createConsultation(Consultation type);

    Consultation getConsultation(Integer id);

    List<Consultation> getConsultations();

    void updateConsultation(Integer id, Consultation type);

    void resetConsultationDailyVisitorCount();

    void deleteConsultation(Integer id);
}
