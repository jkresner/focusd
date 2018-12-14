focusD
====================

Pronounced "focused", *focusD* helps convey interpretations. 
Express your perspectives and see other peoples using visual queues.

You're already familiar with **bold** which signals readers
to pay "more" attention. **bold** is limited in that it can't express 
which is "most" important between **X** and **Y**. 

**focusD** provides annotation features and styles that help you 
constrain reader attention and influence the order and context
which information is consumed. 

demo
-------------------

#### Input (raw text)

Except from [wikipedia.org/wiki/Markup_language](wikipedia.org/wiki/Markup_language):

    In computer text processing, a markup language is a system for annotating 
    a document in a way that is syntactically distinguishable from the text.[1] 
    The idea and terminology evolved from the "marking up" of paper 
    manuscripts, i.e., the revision instructions by editors, traditionally 
    written with a blue pencil on authors' manuscripts. In 
    digital media, this "blue pencil instruction text" was replaced by tags, 
    that is, instructions are expressed directly by tags or "instruction text
    encapsulated by tags." However the whole idea of a mark up language is to 
    avoid the formatting work for the text, as the tags in the mark up 
    language serve the purpose to format the appropriate text (like a header 
    or the beginning of a paragraph etc.). Every tag used in a Markup 
    language has a property to format the text we write. 

    Examples include typesetting instructions such as those found in troff, 
    TeX and LaTeX, or structural markers such as XML tags. Markup instructs 
    the software that displays the text to carry out appropriate actions, 
    but is omitted from the version of the text that users see.

#### focusd markup


    {
      style: {
         priority: 'highlight'
         colors: ['gray','yellow','green']
      },
      collapse: [{840,274}],
      focus: [
        {
          mark: ['a markup language is a system for annotating a document',
                 'syntactically distinguishable from the text'],
          color: 2
          note:  'In tags encapsulate and can only apply formatting to entire continuous blocks. With focusd we can group/apply semantic formatting to any array of selected data.',
        },
        {
          mark: 'Markup instructs the software that displays the text to carry out appropriate actions, but is omitted from the version of the text that users see',
          color: 1
        },
        {
          mark: {519,81},
          color: 2.6
          note: 'Like html and CSS, *focusd markup* and presentation are cleanly separate so you can focus on expressing yourself, then easily preview and choose the best styling.',
        }
      ]
    }     


#### output (HTML)

|||
|:-:|:-:|
| <figure id="mk1669" class="doc">&#8230; a <mark id="mk1669_1_1" class="mk1669_1">markup language is a system for annotating a document</mark> in a way that is <mark id="mk1669_1_2" class="mk1669_1">syntactically distinguishable from the text</mark>.[1] The idea and terminology evolved from the "marking up" of paper manuscripts, i.e., the revision instructions by editors, traditionally written with a blue pencil on authors' manuscripts. In digital media, this "blue pencil instruction text" was replaced by tags, that is, instructions are expressed directly by tags or "instruction text encapsulated by tags." However <mark id="mk1669_2_1" class="mk1669_2">the whole idea of a mark up language is to avoid the formatting work for the text</mark>, as the tags in the mark up language serve the purpose to format the appropriate text (like a header or the beginning of a paragraph etc.) &#8230;  \\nExamples &#8230; <mark id="mk1669_3_1" class="mk1669_3">Markup instructs the software that displays the text to carry out appropriate actions, but is omitted from the version of the text that users see</mark>.</figure> | >> - <a href="#mk1669_1_1">markup language is a system for annotating a document</a>\n<a href="#mk1669_1_2">syntactically distinguishable from the text</a>  \nIn tags encapsulate and can only apply formatting to entire continuous blocks. With focusd we can group/apply semantic formatting to any array of selected data.  \n >> - <a href="#mk1669_2_1">the whole idea of a mark up language is to avoid the formatting work for the text</a>  \n>> - <a href="#mk1669_2_1">the whole idea of a mark up language is to avoid the formatting work for the text</a>  \n>> - <a href="#mk1669_3_1">Markup instructs the software that displays the text to carry out appropriate actions, but is omitted from the version of the text that users see</a>Like html and CSS, *focusd markup* and presentation are cleanly separate so you can focus on expressing yourself, then easily preview and choose the best styling.

<style type="text/css">
  .mk1669_1 { background:rgb(252,252,58,.5) }
  .mk1669_2 { background:rgb(92,238,51,1) }
  .mk1669_3 { background:rgb(252,252,58,.25) }
</style>
a
