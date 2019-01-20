var authority = require('./authority')
module.exports = {

  /*
  */
  mail_header(md, param, ops) {
    function encodeLgGg(str) { return str.replace(/[\u00A0-\u9999<>\&]/gim, 
      function(i) { return `&#${i.charCodeAt(0)};` }) }

    var parts = md.split(/\n\-\-Content\n/ig)
    if (parts.length != 2) return md
    var headers = parts[0].split('\n')
    var h = {d:'',f:'',t:'',s:''}
    for (var i=0; i< headers.length;i++) {
      var ln = headers[i]
      if (/^date: /i.test(ln)) h.d = 
        '<time>'+moment(ln.replace(/^date: /i,'')).format('DD MMM YYYY, HH:mm')+'</time>'
      if (/^from: /i.test(ln)) h.f = 
        '<svg></svg><tt>'+encodeLgGg(ln.replace(/^from: /i,''))+'</tt>'
      if (/^to: /i.test(ln)) h.t = 
        '<i>to</i><tt>'+encodeLgGg(ln.replace(/^to: /i,''))+'</tt>'
      if (/^subject: /i.test(ln)) h.s = 
        '<cite>Subject: '+ln.replace(/^subject: /i,'')+'</cite>'
    }

    return '<header>'+h.d+h.f+h.t+h.s+'</header>'
          +'<section>\n'+parts[1]+'\n</section>'
  },

  /*
  */
  lref(r, param, ops) {
    var matchList = '\n\n'
    for (var auth in authority) 
      if (r.indexOf(auth) > -1) matchList += (authority[auth]+'\n')
    
    return r + matchList
// [Civil Procedure Act 2005]: //act/2005/28 "CP98"
// [Commercial Arbitration Act 2010]: /? "CA10"
// [Disability Discrimination Act 1992]: https://www.legislation.gov.au/ "DD92"
// [Imperial Acts Application Act 1969]: //act/1969/30 "IM69"
// [Legal Profession Act 2004]: //act/2004/112 "LP04"
// [Strata Schemes (Leasehold Development) Act 1986]: //act/1986/219 "SL86"
// [Strata Schemes Management Regulation 2010]: //regulation/2010/492 "SM10"
  },

  /*
  */
  cref(md, param, ops) {
    return md /*+ `
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
[Potter v Minahan (1908) 7 CLR 277; 1908 HCA 63]: # ""`*/
  },

  /*
  */
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
  
  /*
  */
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
