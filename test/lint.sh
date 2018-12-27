#!/bin/sh
SRC=$1
daemon() {
  chsum1=""
  while [[ true ]]
  do
    chsum2=`find ${SRC} -type f -exec md5 {} \;`
    if [[ $chsum1 != $chsum2 ]] ; then           
      npx eslint $SRC
      chsum1=$chsum2
    fi
    sleep 2
  done
}

daemon;
echo 'running lint watch ${SRC}'
