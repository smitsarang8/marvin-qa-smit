describe('Amazon test case smit sarang', () => {
  let data;
  let wholePrice;
  let qty;
  let subTotalOnUi;

  before(function () {
    cy.fixture('amazon-buy-product').then(function (regdata) {
      data = regdata
    })
  })

  it('Open Amazon', () => {
    cy.launchURL("https://www.amazon.in")
  })

  it('Search for a product', () => {
    cy.get('[placeholder="Search Amazon.in"]').type(data.searchQueryProduct)
    cy.get("[type='submit']").click()
  })

  it('Select any from the search page', () => {
    cy.get('[class="a-link-normal s-underline-text s-underline-link-text s-link-style a-text-normal"]').eq(1).invoke('removeAttr', 'target').click()
  })

  it('Go to the product detail page & select the size', () => {
    cy.get('select[id="native_dropdown_selected_size_name"]').select(data.size)
  })

  it('Capture whole price', () => {
    cy.get('span[class="a-price-whole"]').eq(1).then(($btn) => {
      const txt = $btn.text()
      wholePrice = txt.replace(",", "")
    })

    cy.get('span[class="a-price-fraction"]').eq(1).then(($btn) => {
      const txt = $btn.text()
      wholePrice = wholePrice.concat(txt)
      cy.log(wholePrice)
    })
  })

  it('Capture Qty', () => {
    cy.get('select[id="quantity"]').find(':selected').then(($btn) => {
      const txt = $btn.text()
      qty = txt
      cy.log(qty)
    })
  })

  it('Click on add to cart', () => {
    cy.get('input[id="add-to-cart-button"]').click()
  })

  it('Click on go to cart', () => {
    cy.get('span[id="sw-gtc"]').click()
  })

  it('Validate order summary Price & Quantity', () => {
    cy.get('span[id="sc-subtotal-amount-activecart"]').then(($btn) => {
      const txt = $btn.text()
      subTotalOnUi = txt.replace(",", "")
      cy.log("Product whole price: " + wholePrice)
      cy.log("Product qty: " + qty)
      cy.log("Sub Total value on UI: " + subTotalOnUi)
      let subtotal = parseInt(qty) * parseFloat(wholePrice)
      expect(subTotalOnUi.trimStart()).to.equal(subtotal.toFixed(2))
      cy.log("subTotalValue matched" + subtotal.toFixed(2))
    })
  })

  it('Click Proceed to buy & on the Login popup screen take a screenshot', () => {
    cy.get('input[value="Proceed to checkout"]').click()
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();
    let hour = today.getHours();
    let min = today.getMinutes();

    today = dd + '_' + mm + '_' + yyyy + '_' + hour + '_' + min;

    cy.contains('Sign in')
      .should('be.visible')
      .wait(500)
    cy.captureScreenshot("loginPage")
  })
})