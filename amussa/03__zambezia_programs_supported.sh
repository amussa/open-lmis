#!/bin/bash
#
# Este script insere dados da secção programs_supported e requisitions_supported
# programs_supported indica a que programas a US está associada
# requisitions_supported indica a que relatórios a US está associada
#

# Definir os valores da variável facilityIds
facilityIds=(1464 1465 1466 1467 1468 1469 1470 1471 1472 1473 1474 1475 1476 1477 1478 1479 1480 1481 1482 1483 1484 1485 1486 1487 1488 1489 1490 1491 1492)

# Mapeamento entre programid e reporttypeid
declare -A reportTypeMap=(
  [16]="6"
  [18]="8"
  [17]="7"
  [19]="9"
  [20]="10"
  [21]="11"
  [22]="12"
)

# Definir o valor do campo reportactive
reportactive=true

# Definir o valor da variável startdate
startdate="2023-05-15 00:00:00"

# Definir o valor do campo reportstartdate
reportstartdate="2023-05-15 00:00:00"

# Lista de programIds
programIds=(22)

# Iterar sobre cada facilityId
for facilityId in "${facilityIds[@]}"
do
  # Iterar sobre cada programId
  for programId in "${programIds[@]}"
  do
    # Obter o reporttypeid correspondente ao programid
    reportTypeId=${reportTypeMap[$programId]}

    # Consulta SQL com as variáveis facilityId, programId, startdate, reportactive e reportstartdate
    sql_query="INSERT INTO \"public\".\"programs_supported\" (\"facilityid\", \"programid\", \"startdate\", \"active\", \"createdby\", \"createddate\", \"modifiedby\", \"modifieddate\", \"reporttypeid\", \"reportstartdate\", \"reportactive\") VALUES ($facilityId, $programId, '$start date', true, 1, current_timestamp, 1, NULL, $reportTypeId, '$reportstartdate', $reportactive);"

    # Executar a consulta SQL
    echo "$sql_query"
  done
done
