INSERT INTO "public"."losses_adjustments_types" ("name", "description", "additive", "displayorder", "createddate", "isdefault", "category")
VALUES
    ('ABBOTT_M2000', 'Abbott M2000', 't', 38, now(), NULL, 'ISSUE'),
    ('ABBOTT_ALINITY_M', 'Abbott Alinity M', 't', 39, now(), NULL, 'ISSUE'),
    ('ROCHE_COBAS_6800', 'Roche Cobas 6800', 't', 40, now(), NULL, 'ISSUE'),
    ('ROCHE_COBAS_CAPCPN', 'Roche Capcpn', 't', 41, now(), NULL, 'ISSUE'),
    ('HOLOGIC_PANTER', 'Hologic Panter', 't', 42, now(), NULL, 'ISSUE');
