CREATE TABLE "public"."facility_equipment" (
    "id" SERIAL,
    "name" VARCHAR(255) NULL,
    "serial" VARCHAR(255) NULL,
    "facilityid" INTEGER NULL,
    "programid" INTEGER NOT NULL,
    CONSTRAINT "facility_equipment_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "FK_facility_equipment_facilityid" FOREIGN KEY ("facilityid") REFERENCES "public"."facilities" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION,
    CONSTRAINT "FK_facility_equipment_programId" FOREIGN KEY ("programid") REFERENCES "public"."programs" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION
);
