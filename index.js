
import Ui from './models/Ui.js';

window.onload = () =>{
  $(document).ready(function(){
    initMaterialize()

    window.ui = new Ui();
  });
}

const initMaterialize = () =>{
  M.AutoInit();
  $('input, textarea').on('focus',(e)=>{
    $(`label[for="${e.target.id}"]`).addClass("active")
  })
  $('input, textarea').on('blur',(e)=>{
    if(e.target.value) return null
    $(`label[for="${e.target.id}"]`).removeClass("active")
  })
}


