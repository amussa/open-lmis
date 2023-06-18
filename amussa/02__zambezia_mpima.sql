INSERT INTO "public"."programs" ("id", "code", "name", "description", "active", "templateconfigured", "regimentemplateconfigured", "budgetingapplies", "usesdar", "push", "sendfeed", "createdby", "createddate", "modifiedby", "modifieddate", "isequipmentconfigured", "hideskippedproducts", "shownonfullsupplytab", "enableskipperiod", "enableivdform", "usepriceschedule", "parentid", "issupportemergency")
VALUES (22, 'LMIS_MPIMA', 'LMIS MPIMA', 'LMIS MPIMA', true, true, true, false, false, false, true, NULL, current_timestamp, NULL, current_timestamp, false, false, true, false, false, false, NULL, false);

INSERT INTO "public"."reports_type" ("id", "code", "programid", "name", "description", "createdby", "createddate", "modifiedby", "modifieddate")
VALUES (12, 'LMIS_MPIMA', 22, 'LMIS MPIMA', 'LMIS MPIMA', NULL, current_timestamp, NULL, current_timestamp);




