import psycopg2

# NOTES:
# inicializar new_facility_id com o valor de: "select nextval('facilities_id_seq');"
# no final da migração, actualizar a sequencia com: "ALTER SEQUENCE facilities_id_seq RESTART [proximo_valor];"
#

# Estabelece conexão com a base de dados de treino
conn_train = psycopg2.connect(
    host="localhost",
    port="5432",
    database="open_lmis",
    user="postgres",
    password=""
)
cursor_train = conn_train.cursor()

# Define o novo ID inicial para as facilities na base de dados de produção
# SELECT (last_value + 1) as next FROM facilities_id_seq;
new_facility_id = 1470

# Loop sobre as facilidades na base de dados de treino
select_query = "SELECT * FROM facilities WHERE id >= 1464 and id <= 1492 order by id"
cursor_train.execute(select_query)
facilities_data = cursor_train.fetchall()
for facility in facilities_data:
    old_facility_id = facility[0]
    facility_values = facility[1:]
    print(f"new_facility_id: {new_facility_id}");

    # Tabela "facilities"
    facility_values = [f"'{value}'" if value is not None else 'NULL' for value in facility_values]
    insert_query = "INSERT INTO facilities (code, name, description, gln, mainphone, fax, address1, address2, geographiczoneid, typeid, catchmentpopulation, latitude, longitude, altitude, operatedbyid, coldstoragegrosscapacity, coldstoragenetcapacity, suppliesothers, sdp, online, satellite, parentfacilityid, haselectricity, haselectronicscc, haselectronicdar, active, golivedate, godowndate, comment, enabled, virtualfacility, createdby, createddate, modifiedby, modifieddate, pricescheduleid) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s);"
    print(insert_query % tuple(facility_values))

    # Tabela "facility_equipment"
    select_query = "SELECT name, serial, %s, programid FROM facility_equipment WHERE facilityid = %s"
    cursor_train.execute(select_query, (new_facility_id, old_facility_id))
    facility_equipment_data = cursor_train.fetchall()
    for facility_equipment in facility_equipment_data:
        facility_equipment = [f"'{value}'" if value is not None else 'NULL' for value in facility_equipment]
        insert_query = "INSERT INTO facility_equipment (name, serial, facilityid, programid) VALUES (%s, %s, %s, %s);"
        print(insert_query % tuple(facility_equipment))

    # Tabela "moz_app_info"
    select_query = "SELECT %s, appversion, createddate, username, upgradetime, androidversion, deviceinfo, uniqueid FROM moz_app_info WHERE facilityid = %s"
    cursor_train.execute(select_query, (new_facility_id, old_facility_id))
    moz_app_info_data = cursor_train.fetchall()
    for moz_app_info in moz_app_info_data:
        moz_app_info = [f"'{value}'" if value is not None else 'NULL' for value in moz_app_info]
        insert_query = "INSERT INTO moz_app_info (facilityid, appversion, createddate, username, upgradetime, androidversion, deviceinfo, uniqueid) VALUES (%s, %s, %s, %s, %s, %s, %s, %s);"
        print(insert_query % tuple(moz_app_info))

    # Tabela "programs_supported"
    select_query = "SELECT %s, programid, startdate, active, createdby, createddate, modifiedby, modifieddate, reporttypeid, reportstartdate, reportactive FROM programs_supported WHERE facilityid = %s"
    cursor_train.execute(select_query, (new_facility_id, old_facility_id))
    programs_supported_data = cursor_train.fetchall()
    for program_supported in programs_supported_data:
        program_supported = [f"'{value}'" if value is not None else 'NULL' for value in program_supported]
        insert_query = "INSERT INTO programs_supported (facilityid, programid, startdate, active, createdby, createddate, modifiedby, modifieddate, reporttypeid, reportstartdate, reportactive) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s);"
        print(insert_query % tuple(program_supported))

    # Tabela "requisition_group_members"
    select_query = "SELECT requisitiongroupid, %s, createdby, createddate, modifiedby, modifieddate FROM requisition_group_members WHERE facilityid = %s"
    cursor_train.execute(select_query, (new_facility_id, old_facility_id))
    requisition_group_members_data = cursor_train.fetchall()
    for requisition_group_member in requisition_group_members_data:
        requisition_group_member = [f"'{value}'" if value is not None else 'NULL' for value in requisition_group_member]
        insert_query = "INSERT INTO requisition_group_members (requisitiongroupid, facilityid, createdby, createddate, modifiedby, modifieddate) VALUES (%s, %s, %s, %s, %s, %s);"
        print(insert_query % tuple(requisition_group_member))

    # Tabela "requisition_group_program_schedules"
    select_query = "SELECT requisitiongroupid, programid, scheduleid, directdelivery, %s, createdby, createddate, modifiedby, modifieddate FROM requisition_group_program_schedules WHERE requisitiongroupid = %s"
    cursor_train.execute(select_query, (new_facility_id, old_facility_id))
    requisition_group_program_schedules_data = cursor_train.fetchall()
    for requisition_group_program_schedule in requisition_group_program_schedules_data:
        requisition_group_program_schedule = [f"'{value}'" if value is not None else 'NULL' for value in requisition_group_program_schedule]
        insert_query = "INSERT INTO requisition_group_program_schedules (requisitiongroupid, programid, scheduleid, directdelivery, dropofffacilityid, createdby, createddate, modifiedby, modifieddate) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s);"
        print(insert_query % tuple(requisition_group_program_schedule))

    # Tabela "users"
    select_query = "SELECT username, password, firstname, lastname, employeeid, restrictlogin, jobtitle, primarynotificationmethod, officephone, cellphone, email, supervisorid, %s, verified, active, createdby, createddate, modifiedby, modifieddate, ismobileuser FROM users WHERE facilityid = %s"
    cursor_train.execute(select_query, (new_facility_id, old_facility_id))
    users_data = cursor_train.fetchall()
    for user in users_data:
        user = [f"'{value}'" if value is not None else 'NULL' for value in user]
        insert_query = "INSERT INTO users (username, password, firstname, lastname, employeeid, restrictlogin, jobtitle, primarynotificationmethod, officephone, cellphone, email, supervisorid, facilityid, verified, active, createdby, createddate, modifiedby, modifieddate, ismobileuser) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s);"
        print(insert_query % tuple(user))

    new_facility_id += 1
    print()
# Fecha a conexão com a base de dados de treino
cursor_train.close()
conn_train.close()

