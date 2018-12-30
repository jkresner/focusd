#!/bin/sh
CMD="\033[0;36m/LINT:\033[0m ";
SRC=$1

chsum1=""
while [[ true ]]
do
  chsum2=`find ${SRC} -type f -exec md5 {} \;`
  if [[ $chsum1 != $chsum2 ]] ; then           
    echo "${CMD} ${SRC}"
    npx eslint $SRC
    chsum1=$chsum2
  fi
  sleep 2
done
