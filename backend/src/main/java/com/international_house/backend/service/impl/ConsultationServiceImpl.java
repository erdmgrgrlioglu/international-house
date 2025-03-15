package com.international_house.backend.service.impl;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import com.international_house.backend.entity.Consultation;
import com.international_house.backend.repository.ConsultationRepository;
import com.international_house.backend.service.ConsultationService;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ConsultationServiceImpl implements ConsultationService {

    private final ConsultationRepository consultationRepository;

    public Consultation createConsultation(Consultation consultation) {
        return consultationRepository.save(consultation);
    }

    public List<Consultation> getConsultations() {
        return consultationRepository.findAll();
    }

    public Consultation getConsultation(Integer id) {
        return consultationRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Consultation Event not found with id: " + id));
    }

    public void updateConsultation(Integer id, Consultation update) {
        if (consultationRepository.findById(id).isPresent())
            consultationRepository.save(update);
    }

    @Scheduled(cron = "0 0 0 * * ?")
    public void resetConsultationDailyVisitorCount() {
        consultationRepository.resetDailyVisitorCount();
        System.out.println("Daily Visitor Counts have been reset to 0.");
    }

    public void deleteConsultation(Integer id) {
        consultationRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Consultation Event not found with id: " + id));
        consultationRepository.deleteById(id);
    }
}
