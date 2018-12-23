class slashoVideo extends HTMLElement {
  constructor(){
    super()
    this.url
    this.shadow = this.attachShadow({mode: 'open'})
    let style = document.createElement('style')
    style.innerHTML = "html {\r\n  box-sizing: border-box;\r\n}\r\n\r\n*, *:before, *:after {\r\n  box-sizing: inherit;\r\n}\r\n\r\nbody {\r\n  margin: 0;\r\n  padding: 0;\r\n  display:flex;\r\n  background:#7A419B;\r\n  min-height:100vh;\r\n  background: linear-gradient(135deg, #7c1599 0%,#921099 48%,#7e4ae8 100%);\r\n  background-size:cover;\r\n  align-items: center;\r\n  justify-content: center;\r\n}\r\n\r\n.player {\r\n  max-width:800px;\r\n  border:5px solid rgba(0,0,0,0.2);\r\n  box-shadow:0 0 20px rgba(0,0,0,0.2);\r\n  position: relative;\r\n  font-size: 0;\r\n  overflow: hidden;\r\n  max-height: 450px;\r\n}\r\n\r\n/* This css is only applied when fullscreen is active. */\r\n.player:fullscreen {\r\n  max-width: none;\r\n  width: 100%;\r\n}\r\n\r\n.player:-webkit-full-screen {\r\n  max-width: none;\r\n  width: 100%;\r\n}\r\n\r\n.player__video {\r\n  width: 100%;\r\n}\r\n\r\n.playerbutton {\r\n  background:none;\r\n  border:0;\r\n  line-height:1;\r\n  color:white;\r\n  text-align: center;\r\n  outline:0;\r\n  padding: 0;\r\n  cursor:pointer;\r\n  max-width:50px;\r\n}\r\n\r\n.playerbutton:focus {\r\n  border-color: #ffc600;\r\n}\r\n\r\n.playerslider {\r\n  width:10px;\r\n  height:30px;\r\n}\r\n\r\n.controls {\r\n  display:flex;\r\n  position: absolute;\r\n  bottom:0;\r\n  width: 100%;\r\n  transform: translateY(100%) translateY(-5px);\r\n  transition:all .3s;\r\n  flex-wrap:wrap;\r\n  background:rgba(0,0,0,0.1);\r\n}\r\n\r\n.player:hover .controls {\r\n  transform: translateY(0);\r\n}\r\n\r\n.player:hover .progress {\r\n  height:8px;\r\n}\r\n\r\n.controls > * {\r\n  flex:1;\r\n}\r\n\r\n.progress {\r\n  position: relative;\r\n  flex-basis:100%;\r\n  height:5px;\r\n  transition:height 0.3s;\r\n  background:rgba(0,0,0,0.5);\r\n  cursor: pointer;\r\n}\r\n\r\n.progress_line {\r\n  position: absolute;\r\n  z-index: 1;\r\n  height: 100%;\r\n  width: 0%;\r\n  background:#ffc600;\r\n  border-top-right-radius: 300px;\r\n  border-bottom-right-radius: 300px;\r\n}\r\n.downloaded{\r\n  position: absolute;\r\n  z-index: -1;\r\n  height: 100%;\r\n  width:0%;\r\n  background:rgba(255,255,255,0.5);\r\n  border-top-right-radius: 300px;\r\n  border-bottom-right-radius: 300px;\r\n}\r\n/* unholy css to style input type=\"range\" */\r\n\r\ninput[type=range] {\r\n  -webkit-appearance: none;\r\n  background:transparent;\r\n  width: 100%;\r\n  margin: 0 5px;\r\n}\r\ninput[type=range]:focus {\r\n  outline: none;\r\n}\r\ninput[type=range]::-webkit-slider-runnable-track {\r\n  width: 100%;\r\n  height: 8.4px;\r\n  cursor: pointer;\r\n  box-shadow: 1px 1px 1px rgba(0, 0, 0, 0), 0 0 1px rgba(13, 13, 13, 0);\r\n  background: rgba(255,255,255,0.8);\r\n  border-radius: 300px;\r\n  border: 0.2px solid rgba(1, 1, 1, 0);\r\n}\r\ninput[type=range]::-webkit-slider-thumb {\r\n  height: 15px;\r\n  width: 15px;\r\n  border-radius: 50px;\r\n  background: #ffc600;\r\n  cursor: pointer;\r\n  -webkit-appearance: none;\r\n  margin-top: -3.5px;\r\n  box-shadow:0 0 2px rgba(0,0,0,0.2);\r\n}\r\ninput[type=range]:focus::-webkit-slider-runnable-track {\r\n  background: #bada55;\r\n}\r\ninput[type=range]::-moz-range-track {\r\n  width: 100%;\r\n  height: 8.4px;\r\n  cursor: pointer;\r\n  box-shadow: 1px 1px 1px rgba(0, 0, 0, 0), 0 0 1px rgba(13, 13, 13, 0);\r\n  background: #ffffff;\r\n  border-radius: 300px;\r\n  border: 0.2px solid rgba(1, 1, 1, 0);\r\n}\r\ninput[type=range]::-moz-range-thumb {\r\n  box-shadow: 0 0 0 rgba(0, 0, 0, 0), 0 0 0 rgba(13, 13, 13, 0);\r\n  height: 15px;\r\n  width: 15px;\r\n  border-radius: 50px;\r\n  background: #ffc600;\r\n  cursor: pointer;\r\n}\r\n"

    let player = document.createElement('div')
    player.classList.add('player')
    let video = document.createElement('video')
    video.src = this.getAttribute('url') || this.url
    video.width = 800
    video.height = 400
    video.classList.add('videoPlayer')
    video.autoplay = true
    let controls = document.createElement('div')
    controls.classList.add('controls')
    let progress = document.createElement('div')
    progress.classList.add('progress')
    let progressBar = document.createElement('div')
    progressBar.classList.add('progress_line')
    let buffer = document.createElement('div')
    buffer.classList.add('downloaded')
    let toggle = document.createElement('button')
    toggle.classList.add('playerbutton')
    toggle.classList.add('toggle')
    toggle.title = 'Toggle Play'
    toggle.innerText = '►'
    let inputone = document.createElement('input')
    inputone.classList.add('playerslider')
    inputone.type = 'range'
    inputone.name = "volume"
    inputone.value = '1'
    inputone.min = 0
    inputone.max = 1
    inputone.step = 0.05
    let inputtwo = document.createElement('input')
    inputtwo.classList.add('playerslider')
    inputtwo.type = 'range'
    inputtwo.name = "playbackRate"
    inputtwo.value = '1'
    inputtwo.min = 0.5
    inputtwo.max = 2
    inputtwo.step = 0.1
    let range = new Array()
    range.push(inputone)
    range.push(inputtwo)
    let skipbuttond = document.createElement('button')
    skipbuttond.dataset.skip = -10
    skipbuttond.classList.add('playerbutton')
    skipbuttond.innerText = '« 10s'
    let skipbuttonf = document.createElement('button')
    skipbuttonf.dataset.skip = 25
    skipbuttonf.classList.add('playerbutton')
    skipbuttonf.innerText = '« 25s'
    let skip = new Array()
    skip.push(skipbuttond)
    skip.push(skipbuttonf)


    //script
    function togglePlay(){
      let method = video.paused ? 'play' : 'pause'
      video[method]()
    }
    function updateButton(){
      let icon = video.paused ? '►' : '❚❚'
      // console.log(icon)
      toggle.innerText = icon
    }

    progress.onclick = e => {
      let time = e.layerX/progress.getBoundingClientRect().width * 100
      time = video.duration * time /100
      video.currentTime = time
    }
    video.onclick = () => {
      togglePlay()
    }
    video.onplay = () => {
      updateButton()
    }
    video.onpause = () => {
      updateButton()
    }
    toggle.onclick = () => {
      togglePlay()
    }
    skip.forEach(s => {
      s.onclick = () => {
        let timeskip = s.dataset.skip
        video.currentTime += parseFloat(timeskip)
      }
    })
    range.forEach(r => {
      r.oninput = () =>{
        video[r.name] = r.value
      }
    })

    video.ontimeupdate = () => {
      let percentage = (video.currentTime/video.duration)*100
      progressBar.style.width = `${percentage}%`
      let buff = video.buffered.end(0) / video.seekable.end(0) * 100
      buffer.style.width = `${buff}%`
    }

    //all appendChild
    player.appendChild(video)
    progress.appendChild(progressBar)
    progress.appendChild(buffer)
    controls.appendChild(progress)
    controls.appendChild(toggle)
    controls.appendChild(inputone)
    controls.appendChild(inputtwo)
    controls.appendChild(skipbuttond)
    controls.appendChild(skipbuttonf)
    player.appendChild(controls)
    this.shadow.appendChild(player)
    this.shadow.appendChild(style)
  }
  setUrl(url){
    this.url = url
    this.video.src = url
    this.setAttribute("url", url)
  }
}
window.customElements.define('slasho-video', slashoVideo)
