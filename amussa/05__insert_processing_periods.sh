#!/bin/bash

start_date="2020-05-21"
end_date="2023-12-20"

current_date="$start_date"
current_timestamp="$(date +'%Y-%m-%d %H:%M:%S.%N')"

while [ "$(date -d "$current_date" +'%Y%m%d')" -le "$(date -d "$end_date" +'%Y%m%d')" ]; do
  period_start="$(date -d "$current_date" +'%b %Y')"
  period_end="$(date -d "$current_date +1 month -1 day" +'%b %Y')"
  name="$period_start to $period_end"
  description="$name"

  echo "INSERT INTO \"public\".\"processing_periods\" (\"scheduleid\", \"name\", \"description\", \"startdate\", \"enddate\", \"numberofmonths\", \"createdby\", \"createddate\", \"modifiedby\", \"modifieddate\") VALUES (1, '$name', '$description', '$current_date 00:00:00', '$(date -d "$current_date +1 month -1 day" +'%Y-%m-%d 23:59:59')', 1, 1, current_timestamp, 1, current_timestamp);"

  current_date="$(date -d "$current_date +1 month" +'%Y-%m-%d')"
done
