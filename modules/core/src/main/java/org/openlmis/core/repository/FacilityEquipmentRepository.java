package org.openlmis.core.repository;

import lombok.NoArgsConstructor;
import org.openlmis.core.domain.FacilityEquipment;
import org.openlmis.core.repository.mapper.FacilityEquipmentMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@NoArgsConstructor
public class FacilityEquipmentRepository {

	@Autowired
	private FacilityEquipmentMapper facilityEquipmentMapper;

	public List<FacilityEquipment> getAll() {
		return facilityEquipmentMapper.findAll();
	}

	public List<FacilityEquipment> getByFacilityId(Integer facilityId) {
		return facilityEquipmentMapper.findByFacilityId(facilityId);
	}

}
