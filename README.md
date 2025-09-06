# 🛍️Shop-Mall

Trang web thương mại điện tử demo, triển khai tại:
👉 https://shop-mall-red.vercel.app/

# 🌐 Giới thiệu

Shop-Mall là dự án web bán hàng trực tuyến, sử dụng mockAPI làm backend giả lập để quản lý dữ liệu sản phẩm, người dùng và giỏ hàng.

Trang web hỗ trợ:
Hiển thị danh sách sản phẩm
Xem chi tiết sản phẩm
Thêm sản phẩm vào giỏ hàng
Xoá/cập nhật giỏ hàng
Thanh toán (giả lập)

# 🧱 Công nghệ sử dụng
Frontend: HTML, CSS, JavaScript

Mock API: mockAPI.io để tạo REST API giả lập

Triển khai: Vercel

# 📁 Cấu trúc thư mục
/
├── admin/               # Giao diện quản lý sản phẩm

├── customer/            # Giao diện khách hàng

├── asset/               # Ảnh, CSS, JS tĩnh
├── index.html           # Trang chủ

└── README.md            # File hướng dẫn


# ⚙️ Cài đặt & Chạy dự án
# 1. Clone repo
git clone https://github.com/nmhieu32/Shop-Mall.git
cd Shop-Mall

# 2. Cấu hình MockAPI

Vào https://mockapi.io/

Tạo một Project mới

Tạo các resource (bảng dữ liệu) ví dụ:

/products : chứa thông tin sản phẩm (id, name, price, image, category, description)

/cart : chứa thông tin giỏ hàng (id, productId, quantity, userId)

/users : chứa thông tin người dùng (id, name, email, password)

Sau khi tạo xong, bạn sẽ có baseURL dạng:

https://<your-project>.mockapi.io/api/v1

# 3. Chỉnh code gọi API

Trong file JavaScript, thay các đường dẫn API thành:
url: "https://<your-project>.mockapi.io/api/v1",

# 🚀 Tính năng chính

 Xem danh sách sản phẩm từ mockAPI

 Xem chi tiết sản phẩm

 Thêm vào giỏ hàng

 Xoá/cập nhật giỏ hàng

 Thanh toán (giả lập)

# 📬 Liên hệ

Tác giả: Minh Hiếu

GitHub: @nmhieu32