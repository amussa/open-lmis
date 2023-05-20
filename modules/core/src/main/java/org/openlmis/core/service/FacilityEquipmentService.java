package org.openlmis.core.service;

import lombok.NoArgsConstructor;
import org.openlmis.core.domain.FacilityEquipment;
import org.openlmis.core.repository.FacilityEquipmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@NoArgsConstructor
public class FacilityEquipmentService {

	@Autowired
	private FacilityEquipmentRepository facilityEquipmentRepository;

	public List<FacilityEquipment> getAll() {
		return facilityEquipmentRepository.getAll();
	}

	public List<FacilityEquipment> getByFacilityId(Integer facilityId) {
		return facilityEquipmentRepository.getByFacilityId(facilityId);
	}

}
