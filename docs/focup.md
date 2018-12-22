Markdown for interpretations
==============================

Goal
------------------------------

1. Readable in raw unprocessed text form
2. Transpose into json executable object
3. Use to output different formats (HTML /

Functions
------------------------------

1. Pre-process

  a. ellipt
  a. inject
  a. decode
     - escape
     - url
     - html
  a. replace (custom map)
  a. remove
     - decimal numbers
     - bold / italic

2. Annotate

  a. single source
     - multiple sources
     - priority (true/unique order)

3. Taxonomy

  a. priority (natural order)
  a. dimensional sort * up to 36 per dimension using [0-9a-z]
  a. type
  a. tags (arbitrary)
  a. color
     - defaults 0-9 => white,yellow,green,cyan,gray,blue,magenta,red,brown,black
     - custom => name => { ansi, rgb, gs, hex, hsl }

4. Style

  a. foreground
     - hightlight
     - shrink
     - dim
     - font
     - underline
  a. background
     - obsfucate

5. Post-process

  a. new line (breaks)
  a. replace (map)



Schema
------------------------------

* optional
/* lazy option

```
PROCESS
  pre       *  [STRING]    names of pre process fns
           /*  /STRING        as 1 elm []
  arrange   *   STRING     name of fn
  post      *  [STRING]    names of pre process fns
           /*  /STRING        as 1 elm []

INPUT
  raw           STRING     text / binary
  format    *   STRING     text/md,text/html,text,img/png
  process   *   PROCESS
  src       *   STRING      url of original
  name      *   STRING     title / file name / arbitrary name
  type      *   STRING     [doc|img|mail]  (support out of the box)
                           arbitrary       (custom for your app see demo)

FOCUS
  note      *   STRING     text / md comment
  mark        [[REGEXP]]   apply patterns at idx to corresponding input
           /*  [REGEXP]      / apply patterns to all inputs
           /*   REGEXP       / as 1 elm []

ROOT
  in           [INPUT]
           /*   INPUT        / as 1 elm []
  mu        *  [FOCUS]
           /*   FOCUS        / as 1 elm []
]```

Markdown
------------------------------

Append using

```
______________________
----------------------
```
Process markup inside fc code blocks
```
\`\`\`fc
…
`\`\`\
```

E.g.

```
…
original content
…

______________________
----------------------

Write anything here. It won't get processed.

\`\`\`fc
… block one markup
`\`\`\

Text outside fc code blocks are basically
comments on your commenting ;)

\`\`\`fc
… block one markup
`\`\`\
```

Examples fc blocks
------------------------------

Ex    Basic 1 mark without a comment
```fc
name~ title 1
title~ doc
src~ http://domain/url
ellipt_lines~ 38,92-94
process~ fn3
1. /`text first exact Match`/
```

Ex.   Shorthand w 1 multi-part mark and comment
```fcd
n~ title 2
t~ doc
s~ www.domain/url
…~ 34,38,92-94
p~ fn1 fn2 fn3 fn4

- /`\n[a-b]: *\n`/ /`text global case insensitive`/ig

   > A simple text comment
```

Ex.   2 comments on multiple sources
```fc
1.  t~ email
    n~ title 3

2.  t~ doc
    n~ title 4
    …~ 92-94
    ±~ 84.5
    :~ ATO:`/Australian Tax(|ation) Office`/ SMA:/`Strata(| Schemes)(| Management) Act`/
    Ð~ decimal zeros zero bold italic

+   /`match this text on both srcs`/

    > mark 1

+
    1. /`src1 only A`/  /`src1 only B`/
    2. /`src2 only C`/

    > ## comment/note w heading
    > and bold **text**
```

Ex.   2 comments on multiple sources
```fc
~~1~  ~t=email  ~n=Squash on 1 line  ~s=www.domain/url  ~…=34,92-94  ~p=n1_ fn3 _fn4  ~~+~  ~1=/`\\n[a-b]: *\\n`/  ~2=/`text select`  ~> ### heading and body  ~> comment  ~~+~  ~1=  ~2/`abba`/  ~> ### h3  ~> - li1  ~> - li2
```



{
  "in1": {
    "src": "r.37paul.st/20170430/13385-cash-apr",
    "map": {
      "ATO": "Australian Taxation Office",
      "O'Neill": "O'Neill Strata Management Pty Ltd",
      ":": " Management Pty Ltd: ",
      "Apr": "April 2017"
    }
  },
  "in2": {
    "src": "legislation.nsw.gov/#",
    "ellipt": {
      "#### 75 Investment": "\n\n#### 78 Accounts",
      "**Amounts payable from": "\n\n#### 74 Capital",
      "**Establishment of": "\n(2) **Amounts pay",
      "An owners corporation must pay the following": "administrative fund",
      "(5) **Exemption": "\n\n#### 78 Accounts"
    }
  },
  "focus": [
    {
      "note": "Here's my first point about funds\nIt's pretty clear I'd paid my levies as of a few days before I was minuted as **unfinancial**.",
      "mark": [
        ["J Kresner","***0.00***","***NIL***","at 30/04/17"],
        ["required to be, paid into the fund under this Act.",
         "contribution required to be paid to the administrative fund or capital works fund by an owner"]
    },
    {
      "note": "And here is where the Strata Committee spent more than $3000 on legal dispute without telling the OC while everyone waited a 2 years for the scaffold to disappear.",
      "mark: [
        ["Partridge Remedial","review of waterproofing","2,123","Colin Biggers", "Dispute with MDP","1,697"],
        ["strata committee of an owners corporation", "must not obtain legal services", "unless a resolution approving", "passed at a general meeting", "does not exceed", "amount prescribed by the regulations", "includes obtaining legal advice and taking legal action", "does not exceed $3,000"],
      "color": "1"
    },
    {
      "note": "Argument point 3 here"
    },
    {
      "note": "Look at all the Strata Manager fees. What a doggy display of taking everyone for a ride...",
      "mark": [["O'Neill Strata"],],
      "color": "2"
    }
  ]
}

### js



### markdown



```

```
