;(function(root) {
'use strict';


/**
 * Main ("middle" stage) processing
 */
function markup(md1, mup, md2) {
  // console.log('markup skip md2', md2 == '')

  function ellips(md, map) {
    var keys = Object.keys(map)
    // console.log('ellips', map, keys)
    for (var k=0;k<keys.length;k++) {
      var start = md.indexOf(keys[k])
      var end =  md.indexOf(map[keys[k]])
      // console.log('ellips', keys[k], start, end)
      if (start > -1 && end > -1 && end > start)
        md = md.slice(0, start) + ' ... ' + md.slice(end, md.lengh)
    }
    return md
  }

  function preproc(md) {
    var parts = md.split('---\n### ')
    for (var i=1;i<parts.length;i++) {
      var lines = parts[i].split('\n')
      var partid = lines.shift().trim()
      var pattern = new RegExp('\\[#'+partid+'\\]','ig')
      var body = lines.join('\n')
      var html = marked(body)
      parts[0] = parts[0].replace(pattern,
        html
          .replace(/\\n/g,'<br />')
          .replace(/\n/g,''))
    }
    el.mp.value = parts[0] //.trim()
    console.log('el.mp.value', el.mp.value)
    return el.mp.value
  }




  function li_law(md) { return ('\n'+md)
      .replace(/\n\(i\)\s*/g, '\n - ')
      .replace(/\n\s*\((i|ii|iii|iv|v|vi)\)\s*/g, '\n1. ')
      .replace(/\n\s*\([1-9]\)\s*/g, '\n1. ')
      .replace(/\n\s*\([a-z]\)\s*/g, '\n - ')
  }

  function rxEsc(s) {
    return new RegExp(s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'),'g')
  }

  var art = '<ol><li>No arguments here yet...</li></ol>'
  if (mup.focus) {
    art = ''
    var fc = mup.focus
    for (var i=0;i<fc.length;i++) {
      var anot = fc[i]
      var li = i+1
      var color = 'hi'+(anot.color||0)
      var mTag = '<mark class="'+color+'"><i>'
      if (anot.note) art += '\n'+li+'. '+anot.note
      if (anot.in1) {
        var mks = anot.in1
        for (var m=0;m<mks.length;m++)
          md1 = md1.replace(rxEsc(mks[m]),mTag+li+'</i>'+mks[m]+'</mark>')
      }
      if (mup.focus[i].in2) {
        var mks = anot.in2
        for (var m=0;m<mks.length;m++)
          md2 = md2.replace(rxEsc(mks[m]),mTag+li+'</i>'+mks[m]+'</mark>')
      }
    }
    // console.log('art', art)
    art = marked(art)
      .replace('<li>', '<li class="hi0">')
      .replace('<li>', '<li class="hi1">')
      .replace('<li>', '<li class="hi0">')
      .replace('<li>', '<li class="hi2">')
  }

  var md2_post_mup = ''
  if (md2 != '') {
    if (mup.in2.ellipt) md2 = ellips(md2, mup.in2.ellipt)
    Object.keys(mup.in2.map||{}).forEach(function(k) {
      md2 = md2.replace(rxEsc(mup.in2.map[k]), k)
    })
    md2_post_mup = '\n<div>\n<q class="'+mup.in2.css+'">\n\n'+li_law(md2)+'\n</q>\n</div>'
  }
  Object.keys(mup.in1.map||{}).forEach(function(k) {
    md1 = md1.replace(rxEsc(mup.in1.map[k]), k)
  })
// console.log('md1', md1)

  el.mp.value = '<div>\n<figure class="'+mup.in1.css+'">\n'+li_law(md1)+'\n</figure>\n</div>'
              + '\n<article>\n'+art+'\n\n</article>'
              + md2_post_mup

  el.mr.value = el.mp.value
  console.log(el.mr.value)
  return el.mr.value
}

/**
 * Post processing
 */

function postproc(md_focusd) {
  var html_pre = marked(md_focusd)
  el.hp.value = html_pre
  el.hr.value = el.hp.value
                  .replace(/  \\n\\n/g, '<br /><br />')
                  .replace(/  \\n/g, '<br />')
                  .replace(/\>\\n/g, '><br />')
                  .replace(/\>\\n\\n/g, '><br />')
                  .replace(/\n\<\//g, '</')
                  .replace(/\n\<tr\>/g, '\n  <tr>')
                  .replace(/\n\<tbody\>\<tr\>/g, '<tbody>\n  <tr>')
                  .replace(/<th>/g, '    <th>')
                  .replace(/<th a/g, '    <th a')
                  .replace(/<td>/g, '    <td>')
                  .replace(/\<table\>\n\<thead\>/g, '\n<table><thead>')

  // remove all decimals
        .replace(/(\.\d+)+/g,'')

                  .trim()

  return el.hr.value
}



function focusd(in, mup, op, cb) {

}


focusd.options =
focusd.setOptions = function(opt) {
  merge(marked.defaults, opt);
  return marked;
};

focusd.getDefaults = function () {
  return {
    baseUrl: null,
    breaks: true,
    gfm: true,
    headerIds: true,
    headerPrefix: 'foc',
    // highlight: null,
    langPrefix: 'focusd',
    markup: {
      format: 'compact' // 'shorthand', 'verbose', 'json', 'html'
    }
    // renderer: new Renderer(),
    // sanitize: false,
    // sanitizer: null,
    // silent: false,
  };
}

focusd.defaults = focusd.getDefaults();


/**
 * Expose
 */

// focusd.Parser = Parser;
// focusd.parse.inline_md = Parser.parse.md;


if (typeof module !== 'undefined' && typeof exports === 'object') {
  module.exports = marked;
} else if (typeof define === 'function' && define.amd) {
  define(function() { return marked; });
} else {
  root.marked = marked;
}
})(this || (typeof window !== 'undefined' ? window : global));
