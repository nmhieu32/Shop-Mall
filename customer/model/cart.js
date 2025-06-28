import CartItem from "./cart-item.js";

class Cart {
    constructor() {
        this.arr = [];
    }

    getTotalPrice() {
        return this.arr.reduce((total, item) => {
            item.calcTotal();
            return total + item.totalPrice;
        }, 0);
    }

    findIndex(id) {
        return this.arr.findIndex((item) => item.id === id);
    }

    addProduct(product) {
        const index = this.findIndex(product.id);
        if(index !== -1) {
            this.arr[index].quantity += 1;
        } else {
            const item = new CartItem(product.id, product.name, product.price, product.img, 1);
            this.arr.push(item);
        }
        return this.arr;
    }

    removeItem(id) {
        const index = this.findIndex(id);
        if(index !== -1) {
            this.arr.splice(index,1);
        }
    }

    changeQuantity(id, sl) {
        const index = this.findIndex(id);
        if(index !== -1) {
            const item = this.arr[index];
            item.quantity += sl;
            if(item.quantity < 1) {
                item.quantity = 1;
                alert("Số lượng sản phẩm không thể nhỏ hơn 1!");
                return;
            }
        }
    }

    clearCart() {
        this.arr = [];
    }
}

export default Cart;