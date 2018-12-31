module.exports = {


  lref(md, param, ops) {
    return md + `
[Agricultural Tenancies Act 1990]: / "AT90"
[Civil and Administrative Tribunal Act 2013]: //legislation.nsw.gov.au/~/view/act/2013/2 "CT13"
[Civil and Administrative Tribunal Rules 2014]: //legislation.nsw.gov.au/~/view/regulation/2014/26 "CT14"
[Commercial Arbitration Act 2010]: / "CA10"
[Community Land Management Act 1989]: //legislation.nsw.gov.au/~/view/act/1989/202 "CL89"
[Conveyancing Act 1919]: //legislation.nsw.gov.au/~/view/act/1919/6 "CV19"
[Defamation Act 2005]: //legislation.nsw.gov.au/~/view/act/2005/77 "DF05"
[Disability Discrimination Act 1992]: https://www.legislation.gov.au/ "DD92"
[Dividing Fences Act 1991]: //legislation.nsw.gov.au/~/view/act/1991/72 "DF91"
[Environmental Planning and Assessment Act 1979]: //legislation.nsw.gov.au/~/view/act/1979/203 "EP79"
[Fines Act 1996]: //legislation.nsw.gov.au/~/view/act/1996/ "FN96"
[Home Building Act 1989]: //legislation.nsw.gov.au/~/view/act/1989/147 "HB89"
[Interpretation Act 1987]: //legislation.nsw.gov.au/~/view/act/1987/15 "IT87"
[Imperial Acts Application Act 1969]: //legislation.nsw.gov.au/~/view/act/1969/30 "IM69"
[Local Government Act 1993]: //legislation.nsw.gov.au/~/view/act/1993/30 "LG93"
[Real Property Act 1900]: //legislation.nsw.gov.au/~/view/act/1900/25 "RP00"
[Strata Schemes Development Act 2015]: //legislation.nsw.gov.au/~/view/act/2015/51 "SD15"
[Strata Schemes Management Act 1996]: //legislation.nsw.gov.au/~/view/act/1996/138 "SM96"
[Strata Schemes Management Act 2015]: //legislation.nsw.gov.au/~/view/act/2015/50 "SM15"
[Strata Schemes Management Regulation 2010]: //legislation.nsw.gov.au/~/view/regulation/2010/492 "SM10"
[Strata Schemes Management Regulation 2016]: //legislation.nsw.gov.au/~/view/regulation/2016/ "SM16"
[Strata Schemes (Freehold Development) Act]: //legislation.nsw.gov.au/~/view/act/1973/68 "SF76"
[Strata Schemes (Freehold Development) Act 1973]: //legislation.nsw.gov.au/~/view/act/1973/68 "SF76"
[Strata Schemes (Leasehold Development) Act 1986]: //legislation.nsw.gov.au/~/view/act/1986/219 "SL86"
[Supreme Court Act 1970]: //legislation.nsw.gov.au/~/view/act/1970/ "SC70"
[Property, Stock and Business Agents Act 2002]: //legislation.nsw.gov.au/~/view/act/2002/66 "PA02"
[Workers Compensation Act 1987]: //legislation.nsw.gov.au/~/view/act/1987/70 "WC87"
[Workplace Injury Management and Workers Compensation Act 1998]: //legislation.nsw.gov.au/~/view/act/1998/86 "WI98"`
  },


  cref(md, param, ops) {
    return md + `
[Rosenthal v The Owners SP 20211 (2017) NSWCATCD 80]: / "Rosenthal 2017"
[Chief Commissioner of State Revenue v Smeaton Grange Holdings Pty Ltd 2017 NSWCA 184]: / "" 
[McElwaine v The Owners – Strata Plan No. 75975 (2017) NSWCA 239]: / ""
[McElwaine v The Owners – Strata Plan No. 75975 (2016) NSWSC 1589]: / "" 
[Brookfield Multiplex Ltd v Owners Corporation Strata Plan 61288 (2014) 254 CLR 185; 2014 HCA 36]: / ""
[Owners - Strata Plan 21702 v Krimbogiannis 2014 NSWCA 411]: / ""
[The Owners of Strata Plan 50276 v Thoo]: / "Thoo 2013 NSWCA 270"
[The Owners Strata Plan 50276 v Thoo (2013) NSWCA 270]: # "" 
[Momcilovic v The Queen (2011) 245 CLR 1; 2011 HCA 34]: # "" 
[Doughty v Martino Developments Pty Ltd (2010) 27 VR 499; 2010 VSCA 121]: # "" 
[Saeed v Minister for Immigration and Citizenship (2010) 241 CLR 252; 2010 HCA 23]: # "" 
[Stolfa v Owners Strata Plan 4366 and ors]: /  "[2009]NSWSC 589"
[Harrison v Melhem (2008) 72 NSWLR 380; 2008 NSWCA 67]: / "" 
[The Owners SP 35042 v Seiwa Australia Pty Ltd]: / "Seiwa 2007 NSWCA 272"
[Seiwa Australia Pty Ltd v The Owners SP 35042]: /  "Seiwa 2006 NSWSC 1157"
[Berowra Holdings Pty Ltd v Gordon (2006) 225 CLR 364;  2006 HCA 32]: # ""
[Ridis v Strata Plan No 10308 (2005) NSWCA 246]: / "Ridis 2005 NSWCA 246"
[Gumana v Northern Territory (2007) 158 FCR 349; 2007 FCAFC 23]: # ""
[Owners - Strata Plan No 43551 v Walter Construction Group Ltd (2004) 62 NSWLR 169; 2004 NSWCA 429]: # ""
[Malika Holdings Pty Ltd v Stretton (2001) 204 CLR 290; 2001 HCA 14]: # "" 
[Tiufino v Warland (2000) 50 NSWLR 104; 2000 NSWCA 110]: / ""
[Balog v Independent Commission Against Corruption (1990) 169 CLR 625; 1990 HCA 28]: / ""
[National Employers Mutual General Insurance Association Ltd v Manufacturers Mutual Insurance Ltd (1989) 17 NSWLR 223 at 235, 240]: # "" 
[Potter v Minahan (1908) 7 CLR 277; 1908 HCA 63]: # ""`
  },


  law_li(md, param, ops) {
    return md
      // .replace(/\n\n\n\n/g,'\n\n\n')
      // .replace(/\n\n\n/g,'\n\n')
      // .replace(/\n\n/g,'\n')
      // .replace(/####\n\n/g,'####\n')
      .replace(/\n\(i\)\s+/g, '\n - ')
      .replace(/\n\s*\((i|ii|iii|iv|v|vi)\)\s+/g, '\n> 1. ')
      .replace(/\n\s*\([1-9]\)\s+/g, '\n1. ')
      .replace(/\n\s*\([a-z]\)\s+/g, '\n - ')
  },
  

  law_stripHtml(text, param, ops) {
    var r = text.toString()
    var rx = {
      ' *': ' <a href="/~/view/(regulation|act)/\\d+/\\d+"( class="frag-legref"|)><span class="frag-name">',
      '*': '(</span>|)</a>',
      '\n': '(</blockquote></div>|)<div id="/part\\d+(/div\\d+|)/sec\\d+(-sub.\\d+|)(-p.[a-z]|)(-sp.[ixv]+|)" class="frag-li"><blockquote class="children">',                
      '\n\n': '(</span></div>|)<div id="/part\\d+(/div\\d|)/sec\\d+" class="frag-clause">',
      '\n': '<blockquote id="/part\\d+(/div\\d+|)/sec\\d+-sub.\\d+" class="frag-subclause">',
      '  \n': '<div id="/sch\\d+/part\\d+/cl\\d+" class="frag-clause"><div class="heading"><span class="heading">',
      ' \n': '<blockquote id="/sch\\d+/part\\d+(/div\\d+|)/cl\\d+-sub.\\d+" class="frag-subclause">',
      '\n ': '<div id="(/sch\\d+|)/part\\d+(/div\\d+|)(/sec\\d+|)(/cl\\d+|)(-sub.\\d+|)(-p.[a-z]|)" class="frag-li"><blockquote class="children">',
      '  \n    **note.**': '<div id="/part\\d+/sec\\d+(-sub.\\d+|)/note\\d" class="frag-note"><div><div class="heading"><span class="frag-heading">Note.</span></div>',
      ' \n    ': '<div class="frag-penalty"><div style="" class="frag-block">',
      '  \n\n  ': '<div style="" class="frag-block">',
      '  \n  _._ ': '<span id="/part\\d+/div\\d+/sec\\d+(-sub.\\d|)-def.[a-z]+" class="frag-defterm">',
      '\n###  ': '<div id="/sch\\d*/part\\d*" class="frag-part"><div class="heading">', 
      '\n### ': '<div id="/part\\d+/div\\d+" class="frag-division"><div class="heading">',
      '\n#### ': '<div class="heading"><span class="heading">',
      '## ': '<div class="heading">',
      '  ': '(</span>\\s+|)<span class="(frag-|)heading">',
      '   \n': '</(span|blockquote)></div>(<blockquote class="children">|)',
      '': '</(div|blockquote|span)>', 
      '<tr>':'<tr style="vertical-align:top">' }

    for (var code in rx) 
      r = r.replace(new RegExp(rx[code], 'g'), code)
    
    return r
  },


  ol_start(html, p, ops) {
    console.log('ol_start', ops.scope, p)
    if (!p) return html
    var p = p[0].split(':')

    return '<style type="text/css">'
      + '#'+ops.scope+p[1]+'+ol { counter-reset:cl '+(parseInt(p[0])-1)+' }'
      + '</style>'
      + html
  }


}
