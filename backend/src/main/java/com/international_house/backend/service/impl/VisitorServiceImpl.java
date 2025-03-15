package com.international_house.backend.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import jakarta.persistence.EntityNotFoundException;

import com.international_house.backend.entity.Visitor;
import com.international_house.backend.service.VisitorService;
import com.international_house.backend.repository.ConsultationRepository;
import com.international_house.backend.repository.VisitorRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
public class VisitorServiceImpl implements VisitorService {

    private final VisitorRepository visitorRepository;
    private final ConsultationRepository consultationRepository;

    public Visitor createVisitor(Visitor visitor) {
        consultationRepository.incrementDailyVisitorCountByOne(visitor.getConsultation().getId());
        consultationRepository.incrementTotalVisitorCountByOne(visitor.getConsultation().getId());
        return visitorRepository.save(visitor);
    }

    public Visitor getVisitor(String id) {
        return visitorRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Visitor not found with id: " + id));
    }

    public List<Visitor> getVisitors() {
        return visitorRepository.findAll();
    }

    public void updateVisitor(String id, Visitor update) {
        if (visitorRepository.findById(id).isPresent())
            visitorRepository.save(update);
    }

    public void deleteVisitor(String id) {
        visitorRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Visitor not found with id: " + id));
        visitorRepository.deleteById(id);
    }
}
