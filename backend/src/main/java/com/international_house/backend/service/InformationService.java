package com.international_house.backend.service;

import com.international_house.backend.entity.Information;

import java.util.List;

public interface InformationService {
    Information getInformation(String language);

    List<Information> getInformations();

    void updateInformation(String language, Information update);
}
