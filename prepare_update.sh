#!/bin/bash

rm controls_ha_theme_mackshot.txt

echo "MOV ./www/hausautomatisierung-com-mackshot/custom.js unused" >> controls_ha_theme_mackshot.txt
find ./www -type f \( ! -iname ".*" \) -print0 | while IFS= read -r -d '' f;
do
    echo "stat -f -t -c \"%Y-%m-%d_%T\" $f"
    out="UPD "$(date -r $f +"%Y-%m-%d_%H:%M:%S")" "$(wc -c $f | awk '{print $1}')" ${f}"
    #echo "UPD "$(stat -f "%Sm" -t "%Y-%m-%d_%T" $f)" "$(stat -f%z $f)" ${f}"
    echo ${out//.\//} >> controls_ha_theme_mackshot.txt
done

# CHANGED file
echo "FHEM haus-automatisierung.com-mackshot custom theme last changes:" > CHANGED
echo $(date +"%Y-%m-%d") >> CHANGED
git log -n 10 --reverse --pretty="format:- %s" >> CHANGED
