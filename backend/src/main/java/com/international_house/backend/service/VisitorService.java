package com.international_house.backend.service;

import com.international_house.backend.entity.Visitor;

import java.util.List;

public interface VisitorService {
    Visitor createVisitor(Visitor visitor);

    Visitor getVisitor(String id);

    List<Visitor> getVisitors();

    void updateVisitor(String id, Visitor update);

    void deleteVisitor(String visitorId);
}
