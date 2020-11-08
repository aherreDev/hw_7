
import Ui from './models/Ui.js';

window.onload = () =>{
  $(document).ready(function(){
    initMaterialize()

    let ui = new Ui();
    ui.inventory.newAddProduct([123, 'Queso', 'Es queso', 2, 30])
    ui.inventory.newAddProduct([543, 'Carro', 'Es carro', 1, 1000])
    ui.inventory.newAddProduct([222, 'Nuez', 'Es nuez', 2, 10])

    ui._getProductsHtmlNodes(ui.inventory._getProductsList())
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


