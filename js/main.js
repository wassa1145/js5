const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue({
    el: '#app',
    data: {
        catalogUrl: '/catalogData.json',
        products: [],
        filtered: [],
        productsCart: [],
        imgCatalog: 'https://via.placeholder.com/200x150',
        userSearch: '',
        show: false
    },
    methods: {
        filter(value){
         const regexp = new RegExp(value, 'i');
         this.filtered = this.products.filter(product => regexp.test(product.product_name));
        },
        getJson(url){
            return fetch(url)
                .then(result => result.json())
                .catch(error => {
                    console.log(error);
                })
        },
        addProduct(element) {
            const product = this.productsCart.find(item => item.id_product === element.id_product);
            if (product) {
                product.quantity++;
                this.productsCart.splice(this.productsCart.indexOf(product), 1, product);
            }
            else {
                const itemCart = Object.assign(element, { quantity: 1 });
                this.productsCart.push(itemCart);
            }
        },
        removeProduct(id){
            let find = this.productsCart.find(item => item.id_product === id);
            if(find.quantity > 1){
                find.quantity--;
                this.productsCart.splice(this.productsCart.indexOf(find), 1, find);
            } else {
                this.productsCart.splice(this.productsCart.indexOf(find), 1);
            }
                   
        },
        showCart() {
            this.show = !this.show;
        }
                
    },
    mounted(){
       this.getJson(`${API + this.catalogUrl}`)
           .then(data => {
               for(let el of data){
                   this.products.push(el);
               }
           });
        this.getJson(`getProducts.json`)
            .then(data => {
                for(let el of data){
                    this.products.push(el);
                }
            })
        this.filtered = this.products;
    }
})


