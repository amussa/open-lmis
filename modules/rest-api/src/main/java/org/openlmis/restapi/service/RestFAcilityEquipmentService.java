package org.openlmis.restapi.service;

import org.openlmis.core.domain.FacilityEquipment;
import org.openlmis.core.service.FacilityEquipmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RestFAcilityEquipmentService {

	@Autowired
	FacilityEquipmentService facilityEquipmentService;

	public List<FacilityEquipment> getAll() {
		return facilityEquipmentService.getAll();
	}

	public List<FacilityEquipment> getByFacilityId(Integer facilityId) {
		return facilityEquipmentService.getByFacilityId(facilityId);
	}
}
