import Product from './Product.js'

class Inventory{
  constructor(){
    this.totalProductos = 0
    this.inicio = null
  }
  _addProduct(serializeData,index){
    let productAdded = false
    let productsCopy = this.products
    let product = new Product(serializeData[0].value,
      serializeData[1].value,
      serializeData[2].value,
      serializeData[3].value,
      serializeData[4].value
    )
    if(!this.products[index]) {
      this.products[index] = product
      return false
    }
    for(let i = 0; i < this.products.length; i++){
      if(!this.products[i]){
        this.products[i] = product
        productAdded = true
        this.totalProductos++
      }
    }
  }
  newAddProduct(productParams){
    this.totalProductos++
    let newProduct = new Product(...productParams);
    if(!this.inicio){
      this.inicio = newProduct
      return [newProduct]
    }
    let aux = this.inicio
    // ? This array is just for UI
    let productsArray = [];
    while(aux){
      if(aux.siguiente){
        // ? This push is just for the UI
        productsArray.push(aux)
        aux = aux.siguiente
      }else{
        productsArray.push(aux, newProduct)
        aux.siguiente = newProduct
        aux = null
        console.log(this)
      }
    }
    return productsArray
  }
  newDeleteProduct(productCode){
    let deletedProduct
    if(this.inicio.code === productCode) {
      deletedProduct = this.inicio
      this.inicio = null
      return [[], deletedProduct]
    }
    let aux = this.inicio
    let finishSearch = false
    while(!finishSearch){
      if(aux.siguiente){
        if(aux.siguiente.code === productCode){
          deletedProduct = aux.siguiente
          aux.siguiente = aux.siguiente.siguiente
          finishSearch = true
        }else{
          aux = aux.siguiente
        }
      }else{
        finishSearch = false
        deletedProduct = null
      }
    }
    return [this._getProductsList(), deletedProduct]
  }
  addNewProduct(e){
    e.preventDefault();
    let serializeData = $(e.target).serializeArray()
    $(e.target).trigger("reset")
    let closeBtn = $('#add_modal_close')
    if(this.totalProductos === 20) {
      M.toast({html: 'No space free'})
      return this.closeModal(closeBtn)
    }
    let productAdded = false
    for(let i = 0; i < this.products.length && !productAdded; i++){
      if(!this.products[i]){
        this.products[i] = new Product(serializeData[0].value,
          serializeData[1].value,
          serializeData[2].value,
          serializeData[3].value,
          serializeData[4].value
        )
        productAdded = true
        this.totalProductos++
      }
    }
    this.refreshUI(this.products)
    this.closeModal(closeBtn)
  }
  addNewProductByPosition(e){
    e.preventDefault();
    let serializeData = $(e.target).serializeArray()
    $(e.target).trigger("reset")
    let closeBtn = $('#add_modal_close')
    if(this.totalProductos === 20) {
      M.toast({html: 'No space free'})
      return this.closeModal(closeBtn)
    }
    this._addProduct(serializeData, serializeData[5].value)
    this.refreshUI(this.products)
    this.closeModal(closeBtn)
  }
  removeProduct(e){
    e.preventDefault()
    let serializeData = $(e.target).serializeArray()
    $(e.target).trigger("reset")
    let closeBtn = $('#delete_modal_close')
    let productRemoved = false
    for(let i = 0; i < this.products.length && !productRemoved; i++){
      if(this.products[i]){
        if(this.products[i].code === serializeData[0].value){
          this.products[i]  = undefined
          productRemoved = true
          this.totalProductos--
        }
      }
    }
    if(!productRemoved){
      M.toast({html: 'Product not found'})
    } else{
      this.refreshUI(this.products)
    }
    this.closeModal(closeBtn)
  }
  getProduct(e){
    e.preventDefault()
    let serializeData = $(e.target).serializeArray()
    $(e.target).trigger("reset")
    let closeBtn = $('#search_modal_close')
    let productFound = false
    for(let i = 0; i < this.products.length && !productFound; i++){
      if(this.products[i]){
        if(this.products[i].code === serializeData[0].value){
          productFound = this.products[i]
        }
      }
    }
    if(!productFound){
      M.toast({html: 'Product not found'})
    } else{
      this.refreshUI([productFound])
    }
    this.closeModal(closeBtn)
  }
  getSortedProducts(asc){
    if(this.totalProductos === 0){
      M.toast({html: 'The inventory is empty'})
      return false
    }
    let sortedProducts = new Array(this.products.length)
    if(asc){
      sortedProducts = this.products
    }else{
      for(let i = this.products.length - 1, e = 0; i >= 0; i--, e++){
        sortedProducts[e] = this.products[i]
      }
    }
    this.refreshUI(sortedProducts)
  }
  closeModal(closeBtn){
    closeBtn.click()
  }
  //////////////
  /* PRIVATE */
  ////////////
  _getProductsList(){
    if(!this.inicio) return []
    if(!this.inicio.siguiente) return [this.inicio]
    let aux = this.inicio
    // ? This array is just for UI
    let productsArray = [];
    while(aux){
      if(aux.siguiente){
        // ? This push is just for the UI
        productsArray.push(aux)
        aux = aux.siguiente
      }
    }
    return productsArray
  }
}

export default new Inventory();
