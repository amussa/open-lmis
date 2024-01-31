WITH lmis_m2000 AS (
    INSERT INTO programs (
        "code", "name", "description", "active",
        "templateconfigured", "regimentemplateconfigured", "budgetingapplies", "usesdar", "push", "sendfeed",
        "isequipmentconfigured", "hideskippedproducts", "shownonfullsupplytab", "enableskipperiod", "enableivdform",
        "usepriceschedule", "parentid", "issupportemergency"
    )
    VALUES ('LMIS_M2000', 'LMIS M2000', 'ABBOTT LMIS M2000', 't',
        't', 't', 'f', 'f', 'f', 't',
        'f', 'f', 't', 'f', 'f',
        'f', NULL, 'f'
        )
    RETURNING id
)
INSERT INTO programs_supported (
    "facilityid", "programid", "startdate", "active",
    "createdby", "createddate", "modifiedby", "modifieddate", "reporttypeid", "reportstartdate", "reportactive"
)
VALUES (
    (select id from lmis_m2000), 11, '2019-11-05 00:00:00', 't',
    1, '2019-11-05 15:30:35.314808', 1, NULL, NULL, NULL, 'f')
;
