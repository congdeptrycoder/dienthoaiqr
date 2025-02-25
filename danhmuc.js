// Ẩn màn hình loading khi trang tải xong
window.addEventListener('load', function () {
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
        loadingScreen.style.display = 'none';
    }
});
document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.querySelector(".menu-toggle");
    const menu = document.querySelector(".menu");

    menuToggle.addEventListener("click", function () {
        menu.classList.toggle("active"); // Thêm/xóa class 'active' để hiện/ẩn menu
    });

    // Xử lý submenu (nếu muốn bật/tắt bằng cách nhấn)
    const menuItems = document.querySelectorAll(".menu > li");
    menuItems.forEach(item => {
        item.addEventListener("click", function (e) {
            const submenu = item.querySelector(".submenu");
            if (submenu) {

                submenu.classList.toggle("active"); // Bật/tắt submenu
            }
        });
    });
});
// Hàm lấy giá trị tham số từ URL
function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

// Lấy giá trị tham số
var category = getParameterByName('category');
var subcategory = getParameterByName('subcategory');
var http = "http://smartphonequanrau.onlinewebshop.net/api/";
// Cập nhật tiêu đề
var titleElement = document.getElementById('page-title');
if (subcategory) {
    titleElement.textContent = subcategory; // Hiển thị danh mục con nếu có
    let apiName = subcategory.toLowerCase().replace(/\s+/g, "");
    http = http + apiName + ".php";
    console.log(http);
} else if (category) {
    titleElement.textContent = category; // Hiển thị danh mục chính nếu không có danh mục con
    let apiName = category.toLowerCase().replace(/\s+/g, "");
    http = http + apiName + ".php";
    console.log(http);
} else {
    titleElement.textContent = 'Danh sách sản phẩm'; // Tiêu đề mặc định
}
fetch(http)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        if (data.status === "success") {
            const products = data.products;
            const productList = document.getElementById("product-list");
            const loadMoreBtn = document.getElementById("load-more");
            let visibleProducts = 15;
            function formatCurrency(amount) {
                return Number(amount).toLocaleString("vi-VN"); // Định dạng giá theo tiền Việt Nam
            }
            function renderProducts() {
                productList.innerHTML = ""; // Xóa danh sách cũ
                products.slice(0, visibleProducts).forEach(product => {
                    const productDiv = document.createElement("div");
                    productDiv.classList.add("product_list_content_item");

                    productDiv.innerHTML = `
                        <div class="product_list_content_item_img" id="${product.id_sanpham}">
                            <img src="${product.src}" alt="${product.tensanpham}">
                        </div>
                        <div class="product_list_content_item_info">
                            <p class="product_name">${product.tensanpham}</p>
                            <div class="product_list_content_item_info_vip">
                                <p>HÀNG CHÍNH HÃNG</p>
                            </div>
                            <p class="product_price">${formatCurrency(product.giamoi)}<sup>đ</sup></p>
                            <p class="old_product_price"><span>${formatCurrency(product.giacu)}</span><sup>đ</sup></p>
                            <p>Bảo hành 24 tháng - Bảo hành cả rơi vỡ</p>
                            <p>Trả góp 0% - Trả trước 0đ - Duyệt hồ sơ chỉ trong 9 phút</p>
                        </div>
                    `;
                    productList.appendChild(productDiv);
                });

                // Kiểm tra nếu còn sản phẩm để hiển thị
                if (visibleProducts < products.length) {
                    loadMoreBtn.style.display = "flex"; // Hiện nút "Xem thêm"
                } else {
                    loadMoreBtn.style.display = "none"; // Ẩn nếu không còn sản phẩm
                }
            }

            renderProducts(); // Hiển thị sản phẩm ban đầu

            // Xử lý khi bấm "Xem thêm"
            loadMoreBtn.addEventListener("click", function () {
                visibleProducts += 15;
                renderProducts();
            });
        }
    })
    .catch(error => console.error("Lỗi:", error));
