import ProductService from "../services/product-service.js";
import Cart from "../model/cart.js";
import CartItem from "../model/cart-item.js";

const service = new ProductService();
const cart = new Cart();

const getEle = (id) => document.getElementById(id);

// render Product
const renderProduct = (data) => {
    let contentHTML = "";
    for (let i = 0; i < data.length; i++) {
        const product = data[i];
        contentHTML += `
            <div class="col-md-4">
                <div class="card h-100 shadow-sm border-0 rounded-4 overflow-hidden">
                <img src="${product.img}" class="card-img-top" style="object-fit: cover; height: 350px;">
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title text-primary fw-bold">${product.name}</h5>
                        <p class="card-text text-muted small">${product.desc}</p>
                    <div class="mb-3">
                        <span class="text-warning">★★★★★</span>
                        <span class="text-muted small">(128 đánh giá)</span>
                    </div>
                        <p class="fw-bold fs-5 text-danger mb-3">${product.price} $</p>

                        <button class="btn btn-outline-primary mt-auto rounded-pill" onclick="addToCart(${product.id})">Add to cart</button>
                    </div>
                </div>
            </div>
        `;
    }
    getEle("phoneList").innerHTML = contentHTML;
};

// Request => getProduct
const getProduct = () => {
    const promise = service.getProductListAPI();

    promise
        .then((result) => {
            renderProduct(result.data);
        })
        .catch((error) => {
            console.log(error);
        });
};
getProduct();

// Filter product
getEle("selectList").addEventListener("change", () => {
    const type = getEle("selectList").value;

    const promise = service.getProductListAPI();

    promise
        .then((result) => {
            const product = result.data;
            const arrFilter = service.filterProduct(type, product);
            renderProduct(arrFilter);
        })
        .catch((error) => {
            console.log(error);
        });
});

// render cart
const renderCart = (data) => {
    let contentHTML = "";
    let grandTotal = 0;
    for (let i = 0; i < data.length; i++) {
        const item = data[i];
        let totalPrice = item.price * item.quantity;
        grandTotal += totalPrice;
        contentHTML += `
            <tr>
                <td><img src="${item.img}" width="60" class="rounded"></td>
                <td class="align-middle">${item.name}</td>
                <td class="align-middle text-danger fw-bold">${item.price}</td>
                <td class="align-middle">
                    <div class="d-flex align-items-center justify-content-center">
                        <button class="btn btn-sm btn-outline-secondary me-1" onclick="changeQuantity(${item.id},-1)">-</button>
                        <span class="px-2" id="qty-${item.id}">${item.quantity}</span>
                        <button class="btn btn-sm btn-outline-secondary ms-1" onclick="changeQuantity(${item.id},1)">+</button>
                    </div>
                </td>
                <td class="align-middle text-center align-center">
                    <button class="btn btn-sm red-btn " onclick="removeItem(${item.id})">X</button>
                </td>
            </tr>
        `;
    }
    getEle("cartTable").innerHTML = contentHTML + `
        <tr>
            <td colspan="5" class="align-left">Total: <b>${grandTotal}</b> $</td>
        </tr>
    `;

};

// Set Local
const setLocal = (data) => {
    localStorage.setItem("CART", JSON.stringify(data));
};

//get Local
const getLocal = (data) => {
    const dataString = localStorage.getItem(data);
    if (!dataString) {
        return;
    }
    const dataJson = JSON.parse(dataString);
    cart.arr = dataJson.map((item) =>
        new CartItem(item.id, item.name, item.price, item.img, item.quantity)
    );
    renderCart(cart.arr);
};
getLocal("CART");

// Add to Cart
const addToCart = (id) => {
    const promise = service.getProductById(id);

    promise
        .then((result) => {
            const product = result.data;
            const arrCart = cart.addProduct(product);
            setLocal(arrCart);
            getLocal("CART");
            alert(`Thêm sản phẩm ${product.name} vào giỏ hàng thành công!`);
        })
        .catch((error) => {
            console.log(error);
        });
}
window.addToCart = addToCart;

// Clear Cart
const emptyCart = () => {
    cart.clearCart();
    setLocal(cart.arr);
    getLocal("CART");
    alert("Đã xóa giỏ hàng!");
}
window.emptyCart = emptyCart;

// Pay now
const payNow = () => {
    if (cart.arr.length === 0) {
        alert("Giỏ hàng trống, không thể thanh toán!");
        return;
    }
    alert("Thanh toán thành công!");
    cart.clearCart();
    setLocal(cart.arr);
    getLocal("CART");
};
window.payNow = payNow;

// Change Quantity
const changeQuantity = (id, sl) => {
    const promise = service.getProductById(id);
    promise
        .then((result) => {
            const product = result.data;
            cart.changeQuantity(product.id, sl);
            renderCart(cart.arr);
            setLocal(cart.arr);
        })
        .catch((error) => {
            console.log(error);
        });

};
window.changeQuantity = changeQuantity;

// Remove Item in Cart
const removeItem = (id) => {
    const promise = service.getProductById(id);
    promise
        .then((result) => {
            const product = result.data;
            cart.removeItem(product.id);
            renderCart(cart.arr);
            setLocal(cart.arr);
            alert(`Đã xóa sản phẩm ${product.name} khỏi giỏ hàng!`);
        })
        .catch((error) => {
            console.log(error);
        });
};
window.removeItem = removeItem;