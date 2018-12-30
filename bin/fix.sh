#!/bin/sh

CMD="\033[0;36mfix/FIXTURE:\033[0m ";
ROOT=$(pwd)
FIXED=${ROOT}/test/fixt
LN=$(cat $ROOT/bin/fix.tpl)


cat_in() {
  echo "${CMD} FIXTURE.in (input sources)"
  cd $FIXED/in;
  IN="module.exports = { 'noop': \`"
  for f in $(ls -f *); do
    IN+=$LN
    IN+="$f': \`$(cat $f)"
  done
  IN+=$(printf "\` };")
  printf "%s" "$IN" > $FIXED/in.md.js
}

cat_up() {
  echo "${CMD} FIXTURE.up (focusd markup)"
  cd $FIXED/up;
  UP="module.exports = { 'noop': \`"
  for f in $(ls -f *.md); do
    UP+=$LN
    UP+="$f': \`$(cat $f)"
  done
  UP+=$(printf "\` };")
  printf "%s" "$UP" > $FIXED/up.md.js
}


if [[ $1 = '-w-in' ]] ; then
  CAT_W=cat_in
elif [[ $1 = '-w-up' ]] ; then
  CAT_W=cat_up
else
  cat_up
  cat_in  
fi


if [[ $2 != '' ]] ; then
  SRC=$FIXED/in/$2
  echo "${CMD} WATCH ${SRC}"
  chsum1=""
  while [[ true ]] ; do
    chsum2=`find ${SRC} -type f -exec md5 {} \;`
    if [[ $chsum1 != $chsum2 ]] ; then           
      $CAT_W
      chsum1=$chsum2
    fi
    sleep 2
  done
fi
