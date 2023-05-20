package org.openlmis.restapi.controller;

import org.openlmis.core.domain.FacilityEquipment;
import org.openlmis.core.exception.DataException;
import org.openlmis.restapi.response.RestResponse;
import org.openlmis.restapi.service.RestFAcilityEquipmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

import static org.springframework.http.HttpStatus.BAD_REQUEST;
import static org.springframework.web.bind.annotation.RequestMethod.GET;

@Controller
public class RestFacilityEquipmentController extends BaseController {

	public static final String EQUIPMENT = "facilityEquipment";

	@Autowired
	RestFAcilityEquipmentService restFAcilityEquipmentService;

	@RequestMapping(value = "/rest-api/facilityEquipments/facility/{facilityId}", method = GET, headers = ACCEPT_JSON)
	public ResponseEntity<RestResponse> getAllFacilityEquipment(@PathVariable Integer facilityId) {
		try {
			List<FacilityEquipment> facilityEquipmentList = restFAcilityEquipmentService.getByFacilityId(facilityId);
			return RestResponse.response(EQUIPMENT, facilityEquipmentList);
		} catch (DataException e) {
			return RestResponse.error(e.getOpenLmisMessage(), BAD_REQUEST);
		}
	}

	@RequestMapping(value = "/rest-api/facilityEquipments", method = GET, headers = ACCEPT_JSON)
	public ResponseEntity<RestResponse> getAllFacilityEquipment() {
		try {
			List<FacilityEquipment> facilityEquipmentList = restFAcilityEquipmentService.getAll();
			return RestResponse.response(EQUIPMENT, facilityEquipmentList);
		} catch (DataException e) {
			return RestResponse.error(e.getOpenLmisMessage(), BAD_REQUEST);
		}
	}
}
