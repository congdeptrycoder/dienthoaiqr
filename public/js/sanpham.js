const container = document.querySelector(".product_content_left_small_img_content");
const images = document.querySelectorAll(".product_content_left_small_img_content img");
const prevBtn = document.querySelector(".btn_sanpham_left");
const nextBtn = document.querySelector(".btn_sanpham_right");
const containerWidth = document.querySelector(".product_content_left_small_img").clientWidth;
let check = 0;
let index = 0;
const imgWidth = images[0].clientWidth + 20; // Độ rộng của mỗi ảnh + margin
const visibleImages = Math.floor(containerWidth / imgWidth); // Số ảnh có thể hiển thị đầy đủ
const maxIndex = images.length - visibleImages; // Giới hạn trượt không bị mất ảnh cuối

function updatePosition() {
    container.style.transform = `translateX(${-index * imgWidth}px)`;
}

nextBtn.addEventListener("click", function () {

    if (index < maxIndex) {
        index++;
    } else {
        index = maxIndex;
        // Giữ ở ảnh cuối cùng
    }
    if (index < 0) index = 1;
    updatePosition();
});

prevBtn.addEventListener("click", function () {
    if (index > 0) {
        index--;
    } else {
        index = 0; // Giữ ở ảnh đầu tiên
    }
    console.log(index);
    updatePosition();
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
var titleElement = document.getElementById('pathsp');
var dmpath = document.getElementById('pathdm');
//Hiển thị sản phẩm dựa vào id
// Lấy tham số id từ URL
const urlParams = new URLSearchParams(window.location.search);
const productId = Number(urlParams.get('id'));
const pathdm = decodeURIComponent(urlParams.get('title'));
if (productId) {
    fetch(`https://smartphonequanrau.kesug.com/api/getsp.php?id=${productId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Sản phẩm không tồn tại');
            }
            return response.json();
        })
        .then(data => {
            const product = data.products[0];
            console.log('Thông tin sản phẩm:', product);
            titleElement.textContent = product.tensanpham;
            dmpath.textContent = pathdm;
            dmpath.href = `danhmuc.html?category=${pathdm}`;
            const productcontent = document.getElementById('product_content');
            const productsmall = document.getElementById('product_list_small');
            function formatCurrency(amount) {
                return Number(amount).toLocaleString("vi-VN");
            }
            function renderProducts() {
                productcontent.innerHTML = "";

                const productDivleft = document.createElement("div");
                productDivleft.classList.add("product_content_left");
                productDivleft.innerHTML = `
                <div class="product_content_left_big_img">
                        <img src="${"public/image/" + product.src}" alt="${product.tensanpham}">
                    </div>
                `;
                productcontent.appendChild(productDivleft);
                const productDivright = document.createElement("div");
                productDivright.classList.add("product_content_right");
                if (product.bonho == "") {
                    productDivright.innerHTML = `
                 <div class="product_content_right_name">
                        <h1>${product.tensanpham}</h1>
                    </div>
                    <div class="product_content_right_price">
                        <p>${formatCurrency(product.giamoi)}<sup>đ</sup><span class="old">${formatCurrency(product.giacu)}</span><sup class="old">đ</sup></p>
                    </div>
                    <div class="product_content_right_cauhinh">
                        <p>Tình trạng: <span class="tinhtrang" style="font-weight: bold; color:#9dc183">CÒN HÀNG
                            </span>( Liên hệ tại góc trái màn hình để biết
                            cơ
                            sở còn hàng gần bạn nhất )</p>
                        <p>Chất lượng sản phẩm: <span style="font-weight: bold; ">${product.chatluong}</span></p>
                        <a href="">(A+/A/B là gì)</a>
                        <p>Thời gian bảo hành:<span style="font-weight: bold; color:#ffd754;"> ${product.baohanh}</span></p>
                        <a href="">(Thông tin chi tiết)</a>
                        <p>Giao hàng tận nơi - Giao trong ngày đối với khách hàng tại Phú Thọ</p>
                        <p style="font-style:italic; font-size: 16px;">Liên hệ ngay để nhận được tư vấn và thời gian
                            giao
                            hàng chính xác</p>
                        <p style="font-weight: bold; color:#E56662">Hotline: 0210.650.50.50</p>

                    </div>
                    `;
                } else {
                    productDivright.innerHTML = `
                 <div class="product_content_right_name">
                        <h1>${product.tensanpham}</h1>
                    </div>
                    <div class="product_content_right_price">
                        <p>${formatCurrency(product.giamoi)}<sup>đ</sup><span class="old">${formatCurrency(product.giacu)}</span><sup class="old">đ</sup></p>
                    </div>
                    <div class="product_content_right_cauhinh">
                        <p>Bộ nhớ: ${product.bonho}</p>
                        <div class="product_content_right_cauhinh_bonho">
                        </div>
                        <p>Tình trạng: <span class="tinhtrang" style="font-weight: bold; color:#9dc183">CÒN HÀNG
                            </span>( Liên hệ tại góc trái màn hình để biết
                            cơ
                            sở còn hàng gần bạn nhất )</p>
                         <p>Chất lượng sản phẩm: <span style="font-weight: bold; ">${product.chatluong}</span></p>
                         <a href="">(A+/A/B là gì)</a>
                        <p>Thời gian bảo hành:<span style="font-weight: bold; color:#ffd754;"> ${product.baohanh}</span></p>
                        <a href="">(Thông tin chi tiết)</a>
                        <p>Giao hàng tận nơi - Giao trong ngày đối với khách hàng tại Phú Thọ</p>
                        <p style="font-style:italic; font-size: 16px;">Liên hệ ngay để nhận được tư vấn và thời gian
                            giao
                            hàng chính xác</p>
                        <p style="font-weight: bold; color:#E56662">Hotline: 0210.650.50.50</p>

                    </div>
                    `;
                };
                productcontent.appendChild(productDivright);
                productsmall.innerHTML = `
                <img src="${"public/image/" + product.src}" alt="Hình ảnh sản phẩm">
                    <img src="${"public/image/" + product.src}" alt="Hình ảnh sản phẩm">
                    <img src="${"public/image/" + product.src}" alt="Hình ảnh sản phẩm">
                    <img src="${"public/image/" + product.src}" alt="Hình ảnh sản phẩm">
                    <img src="${"public/image/" + product.src}" alt="Hình ảnh sản phẩm">
                    <img src="${"public/image/" + product.src}" alt="Hình ảnh sản phẩm">
                    <img src="${"public/image/" + product.src}" alt="Hình ảnh sản phẩm">
                    `;
            }
            renderProducts();
        })
        .catch(error => {
            console.error('Lỗi khi lấy thông tin sản phẩm:', error);
            alert('Không thể tải thông tin sản phẩm!');
        });
}