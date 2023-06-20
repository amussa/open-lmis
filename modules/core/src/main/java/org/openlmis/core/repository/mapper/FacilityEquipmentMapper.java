package org.openlmis.core.repository.mapper;

import org.apache.ibatis.annotations.*;
import org.openlmis.core.domain.FacilityEquipment;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FacilityEquipmentMapper {
	@Select("SELECT * FROM facility_equipment WHERE id = #{id}")
	FacilityEquipment findById(@Param("id") Long id);

	@Select("SELECT * FROM facility_equipment")
	List<FacilityEquipment> findAll();

	@Select("SELECT " +
			" facility_equipment.id, " +
			" facility_equipment.name, " +
			" facility_equipment.serial, " +
			" facility_equipment.facilityid, " +
			" facility_equipment.programid, " +
			" programs.code " +
			"FROM facility_equipment " +
			"INNER JOIN programs on (facility_equipment.programid = programs.id) " +
			"WHERE facilityId = #{facilityId}")
	List<FacilityEquipment> findByFacilityId(@Param("facilityId") Integer facilityId);

	@Insert("INSERT INTO facility_equipment (name, serial, facilityId, programId) " +
			"VALUES (#{name}, #{serial}, #{facilityId}, #{programId})")
	@Options(useGeneratedKeys = true, keyProperty = "id")
	void insert(FacilityEquipment facilityEquipment);

	@Update("UPDATE facility_equipment SET name = #{name}, serial = #{serial}, facilityId = #{facilityId}, programId = #{programId} " +
			"WHERE id = #{id}")
	void update(FacilityEquipment facilityEquipment);

	@Delete("DELETE FROM facility_equipment WHERE id = #{id}")
	void deleteById(@Param("id") Long id);
}
