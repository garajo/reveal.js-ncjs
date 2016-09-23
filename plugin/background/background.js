/**
* @Author: gajo
* @Date:   2016-09-17T16:13:41-07:00
* @Last modified by:   gajo
* @Last modified time: 2016-09-17T16:13:55-07:00
*/

(function(){
  const inceptgifs = [
    "http://i.giphy.com/Ajf5GjjVwUYI8.gif", // 0: grow old together
    "http://i.giphy.com/Fhe1r0jebLLW0.gif", // 1: brains scrambled
    "http://i.giphy.com/lqU5wpfVE7i1i.gif", // 2: dream bigger
    "http://i.giphy.com/TM0pVrooWhHvW.gif", // 3: no, no
    "http://i.giphy.com/11nRqrJWD44Xwk.gif", // 4: thought it was free
    "http://i.giphy.com/eBX9S2vgQKKA0.gif", // 5: it's not
    "http://i.giphy.com/f2ZiDw8DXHgyc.gif", // 6: middle of dream
    "http://i.giphy.com/QJph5BJmKPypy.gif", // 7: still together
    "http://i.giphy.com/103CB2OC95pcVq.gif", // 8: mirror
    "http://i.giphy.com/rtW8602fw5368.gif", // 9: corridor
  ]

  window.addEventListener('keydown', function(evt){
    var cs = Reveal.getCurrentSlide()
    if (evt.ctrlKey && evt.key.match(/^[0-9]$/)){
      evt.preventDefault()
      evt.stopImmediatePropagation()
      cs.setAttribute('data-background-image', inceptgifs[parseInt(evt.key)])
      cs.setAttribute('data-background-size', 'contain')
      Reveal.sync()
    }else if (evt.ctrlKey && evt.key === '`'){
      cs.removeAttribute('data-background-image')
      Reveal.sync()
    }
  })
})()
