#!/bin/sh

CMD="\033[0;36mfix/FIXT\033[0m";
FS_ROOT=$(pwd)
FS_FIXT=${FS_ROOT}/test/fixt
FS_UP=;
FS_SRC=''
SET=''
LN=$(cat $FS_ROOT/bin/fix.tpl)

cat_in() {
  FS_IN=${FS_FIXT}/in
  cd $FS_IN;  
  echo "${CMD}.IN ${FS_IN}"
  IN="module.exports = { noop: \`"
  for f in $(ls -f *); do
    IN+=$LN
    IN+="$f': \`$(cat $f)"
  done
  IN+=$(printf "\` };")
  printf "%s" "$IN" > $FS_FIXT/in.md.js  
}

cat_up() {
  FS_UP=${FS_FIXT}/up  
  cd $FS_UP;
  echo "${CMD}.UP ${FS_UP}"
  UP="module.exports = { noop: \`"
  for f in $(ls -f *); do
    UP+=$LN
    UP+="$f': \`$(cat $f)"
  done
  UP+=$(printf "\` };")
  printf "%s" "$UP" > $FS_FIXT/up.md.js
}

if [[ $3 = '-set' ]] ; then
  FS_FIXT=${FS_FIXT}/set/$4
fi 

if [[ $1 = '-w-in' ]] ; then
  CAT_W=cat_in
  FS_SRC=${FS_FIXT}/in/$2.md
elif [[ $1 = '-w-up' ]] ; then
  CAT_W=cat_up
  FS_SRC=${FS_FIXT}/up/$2
else
  cat_up
  cat_in  
fi

if [[ $2 != '' ]] ; then
  echo "${CMD}.WATCH ${FS_SRC}"
  chsum1=""
  while [[ true ]] ; do
    chsum2=`find ${FS_SRC} -type f -exec md5 {} \;`
    if [[ $chsum1 != $chsum2 ]] ; then           
      $CAT_W
      chsum1=$chsum2
    fi
    sleep 2
  done
fi
