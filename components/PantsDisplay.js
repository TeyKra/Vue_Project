app.component('product-display', {
    props: {
      premium: {
        type: Boolean,
        required: true
      }
    },
    template:
      /*html*/
      `
     <div class="product-display">
          
      <div class="product-container">
        <div class="product-image">
          <img :src="image" />
        </div>
  
        <div class="product-info">
          <h1>{{ productName }}</h1>
          <p v-if="inStock">In Stock</p>
          <p v-else>Out of Stock</p>
          <p>Shipping: {{ shipping }}</p>
  
          <ul>
            <li v-for="detail in details">{{ detail }}</li>
          </ul>
  
          <div class="color-circle"
            v-for="(variant, Pants) in variants" 
            :key="variant.id"
            :style="{ backgroundColor:variant.color}"
            @mouseover="updateProduct(Pants)"
            >
          </div> 
  
          <button class="button" v-on:click="addToCart" 
            :disabled="!inStock"
            :class="{ disabledButton: !inStock }"
            >
          Add to cart
          </button>
        </div>
      </div>
  
      <review-list :reviews="reviews"></review-list>
      <review-form @review-submitted="addReview" ></review-form>
    </div>
     `,
    data() {
      return {
        product: 'Pants',
        brand: 'Supreme',
        selectedVariant: 0,
        details: ['80% cotton', '20% polyester', 'Gender-neutral'],
        variants: [
          {
            id: 2234,
            color: 'green',
            image: './assets/images/worldtoursupreme.png',
            quantity: 10
          },
          {
            id: 2235,
            color: 'blue',
            image: './assets/images/aquasupreme.png',
            quantity: 0
          },
          {
            id:2236,
            color:'red',
            image: './assets/images/northfacesupred.png.png',
            quantity: 25
          },
          {
            id:2237,
            color:'rgb(2, 247, 170)',
            image:'./assets/images/cargosupremegreen.png',
            quantity:0
          },
  
        ],
        reviews: [],
        tabs: ['review-form', 'review-list'],
        activeTab: 'review-form'
      }
    },
    methods: {
      addToCart() {
        this.$emit('add-to-cart', this.variants[this.selectedVariant].id)
      },
      updateProduct(Pants) {
        this.selectedVariant = Pants
      },
      addReview(review) {
        this.reviews.push(review)
      }
    },
    computed: {
      productName() {
        return this.brand + ' ' + this.product
      },
      image() {
        return this.variants[this.selectedVariant].image
      },
      inStock() {
        return this.variants[this.selectedVariant].quantity
      },
      shipping() {
        if (this.premium) {
          return 'Free'
        }
        return 2.99
      }
    }
  })
  