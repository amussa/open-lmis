#!/bin/bash

start_date=$(date -j -f "%Y-%m-%d" "2020-05-21" +%s)
end_date=$(date -j -f "%Y-%m-%d" "2023-12-20" +%s)

current_date=$start_date
current_timestamp=$(date +"%Y-%m-%d %H:%M:%S.%N")

while [ "$current_date" -le "$end_date" ]; do
  period_start=$(date -j -f "%s" "$current_date" +"%b %Y")
  period_end=$(date -j -f "%s" "$(date -j -v+1m -f "%s" "$current_date" +%s 2>/dev/null) - 86400" +"%b %Y")
  name="$period_start to $period_end"
  description="$name"

  echo "INSERT INTO \"public\".\"processing_periods\" (\"scheduleid\", \"name\", \"description\", \"startdate\", \"enddate\", \"numberofmonths\", \"createdby\", \"createddate\", \"modifiedby\", \"modifieddate\") VALUES (1, '$name', '$description', '$(date -j -f "%s" "$current_date" +"%Y-%m-%d 00:00:00")', '$(date -j -f "%s" "$(date -j -v+1m -f "%s" "$current_date" +%s 2>/dev/null) - 86400" +"%Y-%m-%d 23:59:59")', 1, 1, '$current_timestamp', 1, '$current_timestamp');"

  current_date=$(date -j -v+1m -f "%s" "$current_date" +%s)
done
