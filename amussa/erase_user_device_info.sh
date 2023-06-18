update users set password = '8B5IiikoqNCYFA24Fhfk64S39RTPgoYymlT8yHsq6qwNthMwLMZkdTtTwH9Woissrii4S0U8eGUwDJz0k1gJv8fqQieie' where username = #{username};

update moz_app_info set uniqueid = null where facilityId = #{facilityId};
