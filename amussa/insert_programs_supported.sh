#!/bin/bash
#
# Este script insere dados da secção programs_supported e requisitions_supported
# programs_supported indica a que programas a US está associada
# requisitions_supported indica a que relatórios a US está associada
#

# Definir o valor da variável facilityid
facilityid=1458

# Definir o valor da variável startdate
startdate="2021-01-01 00:00:00"

# Mapeamento entre programid e reporttypeid
declare -A reportTypeMap=(
  [16]="6"
  [18]="8"
  [17]="7"
  [19]="9"
  [20]="10"
  [21]="11"
)

# Definir o valor do campo reportactive
reportactive=true

# Definir o valor do campo reportstartdate
reportstartdate="2023-01-01 00:00:00"

# Lista de programIds
programIds=(16 17 18 19 20 21)

# Iterar sobre cada programId
for programId in "${programIds[@]}"
do
  # Obter o reporttypeid correspondente ao programid
  reportTypeId=${reportTypeMap[$programId]}

  # Consulta SQL com as variáveis facilityid, programId, startdate, reportactive e reportstartdate
  sql_query="INSERT INTO \"public\".\"programs_supported\" (\"facilityid\", \"programid\", \"startdate\", \"active\", \"createdby\", \"createddate\", \"modifiedby\", \"modifieddate\", \"reporttypeid\", \"reportstartdate\", \"reportactive\") VALUES ($facilityid, $programId, '$startdate', true, 1, current_timestamp, 1, NULL, $reportTypeId, '$reportstartdate', $reportactive);"

  # Executar a consulta SQL
  echo "$sql_query"
done
