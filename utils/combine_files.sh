#! /bin/bash

while read p; do
	if [[ $p == "<script src='js/app.js'></script>" ]]; then
		echo "<script>"
		cat public/js/app.js
		echo "</script>"
	else
		echo $p
	fi
done < public/index.html