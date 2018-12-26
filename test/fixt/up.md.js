var fix = { md:{}, js:{} }; fix.js['sma-fin-mgt'] = `
{
  "in": [{
    "src": "r.37paul.st/20170430/13385-cash-apr",
    "name": "Month cash report - April 2017",
    "type": "doc",
    "map_map": {
      "ATO": "Australian Taxation Office",
      "O'Neill": "O'Neill Strata Management Pty Ltd",
      ":": " Management Pty Ltd: ",
      "Apr": "April 2017"
    }
  },
  {
    "src": "legislation.nsw.gov.au/~/view/act/2015/50/part5",
    "type": "law",
    "ellipt_map": {
      "#### 75 Investment": "#### 78 Accounts",
      "**Amounts payable from": "#### 74 Capital"
    }
  }],
"focus": [{
      "note": "Here's my first point about funds. It's pretty clear I'd paid my levies as of a few days before I was minuted as **unfinancial**.",
      "mark": [
        ["J Kresner","***0.00***","***NIL***","at 30/04/17"],
        ["required to be, paid into the fund under this Act.",
         "contribution required to be paid to the administrative fund or capital works fund by an owner"]
      ]
    },
    {
      "color": "1",
      "note": "And here is where the Strata Committee spent more than $3000 on legal dispute without telling the OC while everyone waited a 2 years for the scaffold to disappear.",
      "mark": [
        ["Partridge Remedial","review of waterproofing","2,123","Colin Biggers", "Dispute with MDP","1,697"],
        ["strata committee of an owners corporation", "must not obtain legal services", "unless a resolution approving", "passed at a general meeting", "does not exceed", "amount prescribed by the regulations", "includes obtaining legal advice and taking legal action", "does not exceed $3,000"]
      ]
    },
    {
      "note": "Point 3 here has no actual associated markings"
    },
    {
      "color": "2",
      "note": "Look at all the Strata Manager fees. What a doggy display of taking everyone for a ride...",
      "mark": [["O'Neill Strata"],
               []
      ]
    }
  ]
}`; fix.md['transcribe_1'] = `
1.  
    t~ email  
    n~ Squash on 1 line  
    s~ www.domain/url  
    …~ 34,92-94  
    p~ fn3  
1.  
    t~ doc  

+  
    1. /\`\\n[a-b]: *\\n\`/  
    1. /\`text select\`/g  
    > ## header  
    > and p body  

+  
    1.   
    1. /\`abba\`/ig  /\`baba\`/  
    > ### h3  
    > - li1  
    > - li2`; 

module.exports = fix;
