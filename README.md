# Food order demo app

This page is a JavaScript single-page application, a demo food order website service. It allows to scroll through a restaurant menu, gives the information on products, allows to filter them, add them in the shopping cart and make an order.

**Technologies used:**
- Vanilla JavaScript, class components, modules, CSS Grid
- Webpack, Babel for production build  
  
### **App has the following structure:**

- **Header block**
  - App title
  - Carousel
    - Photo slider, slides can be changed by clicking arrows, shows the price of carousel items, has a button to add item in a cart. Implemented with usage of `offsetWidth` and `transform: translate` CSS properties, items are added to cart by transferring the value through bubbling `CustomEvent` payload.
- **Main menu block**
  - Product categories
    - Categories ribbon, allows to filter products by selected category. Implemented with `scrollBy`, `scrollLeft`, `scrollWidth`, `clientWidth` methods and properties. Category is selected by bubbling `CustomEvent` and marking category with `active` css class
  - Filter block
    - Allows to filter products by *spiciness, nuts and vegetarian* criterias. Spiciness slider has 0 to 4 steps, selected step value is received with usage of `getBoundingClientRect()` and element `offsetWidth`, value is transferred through bubbling `CustomEvent`.  
    Nuts and vegetarian are just checkboxes, which Boolean values are used in `updateFilter()` method, which uses filtering values to render `products` array in products grid.
  - Products grid block
    - Gets products list from mock `products` array, uses CSS Grid to render `productCard` components.  
    Each product card has a product image and description, price and add to cart button, `CustomEvent` payload is used to transfer product id for adding to the cart.

App has adaptive cross-browser layout, with usage of CSS FlexBox and Grid.
