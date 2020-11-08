/*
  This code use some functions of es5 and es6
  ! It's only ui code
*/
import Inventory from './Inventory.js'

class Ui {
  constructor(){
    $('#add_form').on('submit',(e) => this.handleProductAdd(e))
    $('#delete_form').on('submit',(e) => this.handleProductRemove(e))
    $('#search_form').on('submit',(e) => this.handleProductGet(e))
    $('.sort').on('click',(e) => this.handleProductSort(e.target.id === 'mget_1'))
    $('#position_form').on('submit',(e) => this.handleProductAddOnPosition(e))
    $('#mdeletefirst').on('click',(e) => this.handleProductRemove(e, true))
    $('#add_first_form').on('submit',(e) => this.handleProductAdd(e, true))
    this.totalProductos = 0
    this.inicio = null
    this.inventory = Inventory
  }

    /******************/
   /* EVENT HANDLERS */
  /******************/

  handleProductAdd(e, first){
    // ? Events processing
    e.preventDefault();
    let serializeData = $(e.target).serializeArray()
    $(e.target).trigger("reset")
    let closeBtn = $('#add_modal_close')

    // ? Data validations
    if(this.inventory.totalProductos === 20) {
      M.toast({html: 'No space free'})
      return this._closeModal(closeBtn)
    }

    // ? Inventory block
    let productParams = serializeData.map(data => data.value);
    let productsInvetory
    if(!first){
      productsInvetory = this.inventory.newAddProduct(productParams)
    }else{
      productsInvetory = this.inventory.newAddProductBegining(productParams)
    }

    // ? UI methods
    this._getProductsHtmlNodes(productsInvetory)
    this._closeModal(closeBtn)
  }

  handleProductAddOnPosition(e){
    // ? Events processing
    e.preventDefault()
    let serializeData = $(e.target).serializeArray()
    $(e.target).trigger("reset")
    let closeBtn = $('#position_modal_close')

    // ? Data validations
    if(this.inventory.totalProductos === 20) {
      M.toast({html: 'No space free'})
      return this._closeModal(closeBtn)
    }else if(serializeData[serializeData.length - 1].value <= 0){
      M.toast({html: 'Invalid position (The position have to be > 0)'})
    }

    // ? Inventory block
    let productParams = serializeData.map(data => data.value);
    let productsInvetory
    if(productParams[productParams.length - 1] == 1){
      productsInvetory = this.inventory.newAddProductBegining(productParams)
    }else if(productParams[productParams.length - 1] > this.inventory.totalProductos){
      productsInvetory = this.inventory.newAddProduct(productParams)
    }else{
      productsInvetory = this.inventory.newAddProductByPosition(productParams, productParams[productParams.length - 1])
    }

    // ? UI methods
    this._getProductsHtmlNodes(productsInvetory)
    this._closeModal(closeBtn)
  }

  handleProductRemove(e,first){
    // ? Events processing
    e.preventDefault()
    let serializeData = $(e.target).serializeArray()
    $(e.target).trigger("reset")
    let closeBtn = $('#search_modal_close')

    // ? Data validations
    if(this.inventory.totalProductos === 0) {
      M.toast({html: 'Empty inventory'})
      return this._closeModal(closeBtn)
    }

    //? Inventory block
    let productsInvetory
    if(!first){
      let productCode = serializeData[0].value
      const [products, deletedProduct] = this.inventory.newDeleteProduct(productCode)
      productsInvetory = products
      this._launchGroupLog('Deleted element', deletedProduct);
    }else{
      const [products, deletedProduct] = this.inventory.newDeleteProductBegining()
      productsInvetory = products
      this._launchGroupLog('Deleted element', deletedProduct);
    }

    // ? UI methods
    this._getProductsHtmlNodes(productsInvetory)
    this._closeModal(closeBtn)
  }

  handleProductGet(e){
    // ? Events processing
    e.preventDefault()
    let serializeData = $(e.target).serializeArray()
    $(e.target).trigger("reset")
    let closeBtn = $('#delete_modal_close')

    // ? Data validations
    if(this.inventory.totalProductos === 0) {
      M.toast({html: 'Empty inventory'})
      return this._closeModal(closeBtn)
    }

    //? Inventory block
    let productCode = serializeData[0].value
    const productsInvetory = this.inventory.newSearchProduct(productCode)

    // ? UI methods
    this._getProductsHtmlNodes(productsInvetory)
    this._closeModal(closeBtn)
  }

  handleProductSort(asc){
    // ? Data validations
    if(this.inventory.totalProductos === 0) {
      M.toast({html: 'Empty inventory'})
      return this._closeModal(closeBtn)
    }

    //? Inventory block
    const productsInvetory = this.inventory.newSortProducts(asc)

    // ? UI methods
    this._getProductsHtmlNodes(productsInvetory)
  }

    /*******************/
   /* PRIVATE METHODS */
  /*******************/

  _closeModal(closeBtn){
    closeBtn.click()
  }
  _getProductsHtmlNodes(products){
    this._refreshUI(products.map(e => this._parseProductToHtml(e.code, e.name, e.description, e.totalPrice)))
  }
  _parseProductToHtml(code, name, description, totalPrice){
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
  _refreshUI(elemnts){
    $('#products_list > div').remove()
    $('#products_list').append(elemnts)
  }
  _launchGroupLog(title, data){
    console.group(title)
    console.log(data)
    console.groupEnd()
  }
}

export default Ui;
