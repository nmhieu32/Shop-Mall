class CartItem {
    constructor(_id, _name, _price, _img, _quantity) {
        this.id = _id;
        this.name = _name;
        this.price = _price;
        this.img = _img;
        this.quantity = _quantity;
        this.calcTotal();
    }

    calcTotal() {
        return this.price * this.quantity;
    }
}

export default CartItem;