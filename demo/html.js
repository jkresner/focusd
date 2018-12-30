var ul;

function child(tag, inner, css, id, parent) {
  var t = document.createElement(tag)
  if (inner) {
    if (t.hasOwnProperty('value')) t.value = inner
    else t.innerHTML = inner
  }
  if (id) t.id = id
  if (css) t.classList = css
  if (parent) parent.appendChild(t)
  else document.body.appendChild(t)
  return t
}

function ta(id, value, css, types) {
  var name = 't'+id
  var li = child('li', null, css, null, ul)

  child('label', id, null, null, li).setAttribute('for', id)

  if (types) child('fieldset', types
    .map(function(t) { 
      var rid = name+t
      return '<input type="radio" onchange="r()"'
        + (t===css?' checked="checked" ':'')
        +' name="'+name+'" id="'+rid+'"/><label for="'+rid+'">'+t+'</label>'
    })
    .join('')
    , null, null, li)

  return child('textarea', value, null, id, li)
}

function taScroll(id) {
  var textarea = document.getElementById(id)
  textarea.style.height = '100px'
  textarea.style.height = (textarea.scrollHeight-10)+'px'
}

function checkd(id, fn) {
  var checkbox = document.getElementById(id)
  if (fn && checkbox.checked) fn()
  return checkbox.checked
}

function el() {
  var elms = {}
  Object.values(arguments)
    .forEach(function(arry) {
      arry.forEach(function(elm) { elms[elm.id] = elm })
    })
  return elms
}

export default function doc(id, h1, ops) {
  document.body.id = id
  child('h1', h1)

  if (ops.ruler) child('ol',
    `<li class="px48"><p>480px</p></li>
     <li class="px64"><p>640px</p></li>
     <li class="px80"><p>800px</p></li>
     <li class="px12"><p>1200px</p></li>
     <li class="px32"><p>320px</p></li>`)

  var aside = child('aside', null, 'focusd', null)
  var preview = child('div', '', '', 'prv', aside)
  ul = child('ul', null, '', 'transforms')

  function prv(v, clear) { preview.innerHTML = clear ? v : preview.innerHTML + v  }

  if (ops.onload)
    document.addEventListener('DOMContentLoaded', ops.onload)

  return { prv: prv, el: el, checkd:checkd, child: child, ta:ta, taScroll: taScroll }
}
