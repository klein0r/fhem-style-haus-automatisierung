#!/bin/bash   

rm controls_smarthometheme.txt

find . -type d -print0 | while IFS= read -r f; 
do
	out="DIR $f"
	echo ${out//.\//} >> controls_smarthometheme.txt
done

find . -type f -print0 | while IFS= read -r f; 
do
	out="UPD "$(stat -f "%Sm" -t "%Y-%m-%d_%T" $f)" "$(stat -f%z $f)" ${f}"
	echo ${out//.\//} >> controls_smarthometheme.txt
done

# CHANGED file
echo "haus-automatisierung.com theme - last change:" > CHANGED
echo $(date +"%Y-%m-%d") >> CHANGED
echo " - $(git log -1 --pretty=%B)" >> CHANGED


