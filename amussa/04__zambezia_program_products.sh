#!/bin/bash

# Lista de productids
productids=(1717 1718 1719 1720 1721 1722 1723)

# variáveis
programid=22
dosespermonth=1
active=true
currentprice='1.00'
productcategoryid=11
displayorder=1
fullsupply=true

# Loop para gerar uma query por cada productid
for productid in "${productids[@]}"
do
    # Montando a query com as variáveis
    query="INSERT INTO \"public\".\"program_products\" (\"programid\", \"productid\", \"dosespermonth\", \"active\", \"currentprice\", \"productcategoryid\", \"displayorder\", \"fullsupply\") VALUES ($programid, $productid, $dosespermonth, $active, '$currentprice', $productcategoryid, $displayorder, $fullsupply);"
    echo "$query"
done
