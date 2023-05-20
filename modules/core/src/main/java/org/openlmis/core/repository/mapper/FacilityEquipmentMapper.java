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

	@Select("SELECT * FROM facility_equipment WHERE facilityId = #{facilityId}")
	List<FacilityEquipment> findByFacilityId(@Param("facilityId") Integer facilityId);

	@Insert("INSERT INTO facility_equipment (name, serial, facilityId) " +
			"VALUES (#{name}, #{serial}, #{facilityId})")
	@Options(useGeneratedKeys = true, keyProperty = "id")
	void insert(FacilityEquipment facilityEquipment);

	@Update("UPDATE facility_equipment SET name = #{name}, serial = #{serial}, facilityId = #{facilityId} " +
			"WHERE id = #{id}")
	void update(FacilityEquipment facilityEquipment);

	@Delete("DELETE FROM facility_equipment WHERE id = #{id}")
	void deleteById(@Param("id") Long id);
}
