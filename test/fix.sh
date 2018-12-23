#!/bin/sh

CMD="\033[0;36mfix/FIXTURE:\033[0m ";
ROOT=$(pwd)
FIXED=${ROOT}/test/fixture

printf "${CMD}: FIXTURE.in (input sources)\n"
IN=$(echo "var fix = { case:{}, law:{}, doc:{}, mail:{} }; ")
cd $FIXED/in/case;
for f in $(ls -f *.md); do
  IN+=$(printf "fix.case['${f%%.*}'] = \` \n$(cat $f)\`; \\n")
done;
cd $FIXED/in/doc;
for f in $(ls -f *.md); do
  IN+=$(printf "fix.doc['${f%%.*}'] = \` \n$(cat $f)\`; \\n")
done;

cd $FIXED/in/law;
for f in $(ls -f *.md); do
  IN+=$(printf "fix.law['${f%%.*}'] = \` \n$(cat $f)\`; \\n")
done;
cd $FIXED/in/mail;
# for f in $(ls -f *.md); do
  # IN+=$(printf "fix.mail['$f'] = \` \n$(cat $f)\`; \\n")
# done;
cd $FIXED;
IN+="module.exports = fix; "
printf "%s" "$IN" > in.js


printf "${CMD}: FIXTURE.up (focusd markup)\n"
UP=$(echo "var fix = { md:{}, js:{} }; ")
cd $FIXED/up/js;
for f in $(ls -f *.js); do
  UP+=$(printf "fix.js['${f%%.*}'] = \` \n$(cat $f)\`; \\n")
done;
cd $FIXED/up/md;
for f in $(ls -f *.md); do
  UP+=$(printf "fix.md['${f%%.*}'] = \` \n$(cat $f)\`; \\n")
done;
UP+="module.exports = fix; "
cd $FIXED;
printf "%s" "$UP" > up.js


printf "${CMD}: FIXTURE.out (expected output)\n"
cd $FIXED;
OUT=$(echo "var fix = { html: {}, terminal: 'one day!', postfix: 'another day' }; ")
OUT+="module.exports = fix; "
printf "%s" "$OUT" > out.js
