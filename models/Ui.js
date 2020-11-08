/*
  This code use some functions of es5 and es6
  ! It's only ui code
*/
import Inventory from './Inventory.js'

class Ui {
  constructor(){
    $('#add_form').on('submit',(e) => this.handleProductAdd(e))
    $('#delete_form').on('submit',(e) => this.handleProductRemove(e))
    $('#search_form').on('submit',(e) => this.getProduct(e))
    $('.sort').on('click',(e) => this.getSortedProducts(e.target.id === 'mget_1'))
    $('#position_form').on('submit',(e) => this.addNewProductByPosition(e))
    this.totalProductos = 0
    this.inicio = null
    this.inventory = Inventory
  }
  handleProductAdd(e){
    // ? Events processing
    e.preventDefault();
    let serializeData = $(e.target).serializeArray()
    $(e.target).trigger("reset")
    let closeBtn = $('#add_modal_close')

    // ? Data validations
    if(this.inventory.totalProductos === 20) {
      M.toast({html: 'No space free'})
      return this.closeModal(closeBtn)
    }

    // ? Inventory block
    let productParams = serializeData.map(data => data.value);
    let productsInvetory = this.inventory.newAddProduct(productParams)

    // ? UI methods
    this.getProductsHtmlNodes(productsInvetory)
    this.closeModal(closeBtn)
  }
  handleProductAddOnPosition(e){

  }
  handleProductRemove(e,first){
    // ? Events processing
    e.preventDefault()
    let serializeData = $(e.target).serializeArray()
    $(e.target).trigger("reset")
    let closeBtn = $('#delete_modal_close')

    // ? Data validations
    console.log(this.inventory)
    if(this.inventory.totalProductos === 0) {
      M.toast({html: 'Empty inventory'})
      return this.closeModal(closeBtn)
    }

    //? Inventory block
    let productsInvetory
    if(!first){
      let productCode = serializeData[0].value
      productsInvetory = this.inventory.newDeleteProduct(productCode)
    }

    // ? UI methods
    this.getProductsHtmlNodes(productsInvetory)
    this.closeModal(closeBtn)
  }
  handleProductGet(e){

  }
  handleProductSort(asc){

  }
  closeModal(closeBtn){
    closeBtn.click()
  }
  getProductsHtmlNodes(products){
    this.refreshUI(products.map(e => this.parseProductToHtml(e.code, e.name, e.description, e.totalPrice)))
  }
  parseProductToHtml(code, name, description, totalPrice){
    return `<div class="col s4">
              <div class="card">
                <div class="card-stacked">
                  <div class="card-content">
                    <strong class="is-size-3">${name}</strong>
                    <p>${description}</p>
                    <div>Code: <strong>${code}</strong></div>
                  </div>
                  <div class="card-action">
                    <a href="#">Total price: $${totalPrice}</a>
                  </div>
                </div>
              </div>
            </div>`
  }
  refreshUI(elemnts){
    $('#products_list > div').remove()
    $('#products_list').append(elemnts)
  }
}

export default Ui;
