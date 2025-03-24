// Ẩn màn hình loading khi trang tải xong
window.addEventListener('load', function () {
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
        setTimeout(function () {
            loadingScreen.style.display = 'none';
        }, 3000); // 3000 milliseconds = 3 seconds
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
var http = "https://smartphonequanrau.kesug.com/api/";
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
async function fetchData() {
    try {
        // Gọi API một lần để thiết lập cookie
        await fetch("https://smartphonequanrau.kesug.com/api/danhmuc.php");

        // Chờ một chút để cookie được thiết lập
        setTimeout(async () => {
            const response = await fetch("https://smartphonequanrau.kesug.com/api/loa.php?i=1");
            const data = await response.json();
            console.log(data);
            console.log("1")
        }, 3000); // Chờ 3 giây
    } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
    }
}
let currentProducts = [];
let selectedSort = 'default';
let selectedPriceRange = 'all';

fetchData();
fetch(http)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        if (data.status === "success") {
            const products = data.products;
            currentProducts = [...products];
            const productList = document.getElementById("product-list");
            const loadMoreBtn = document.getElementById("load-more");
            let visibleProducts = 15;
            // Thêm các hàm xử lý
            function sortProducts(sortType) {
                if (sortType === 'price-high-low') {
                    currentProducts.sort((a, b) => b.giamoi - a.giamoi);
                } else if (sortType === 'price-low-high') {
                    currentProducts.sort((a, b) => a.giamoi - b.giamoi);
                }
            }

            function filterByPrice(range) {
                const [min, max] = range.split('-').map(Number);
                currentProducts = products.filter(product => {
                    return product.giamoi >= min && product.giamoi <= max;
                });
            }

            // Thêm event listener cho nút Áp dụng
            document.getElementById('apply-filters').addEventListener('click', function () {
                // Lấy giá trị từ dropdown
                selectedSort = document.getElementById('sort-select').value;
                selectedPriceRange = document.getElementById('price-range').value;

                // Reset về danh sách gốc
                currentProducts = [...products];

                // Áp dụng bộ lọc giá
                if (selectedPriceRange !== 'all') {
                    filterByPrice(selectedPriceRange);
                }

                // Áp dụng sắp xếp
                if (selectedSort !== 'default') {
                    sortProducts(selectedSort);
                }
                // Reset số lượng sản phẩm hiển thị
                visibleProducts = 15;
                // Render lại sản phẩm
                renderProducts();
            });
            function formatCurrency(amount) {
                return Number(amount).toLocaleString("vi-VN"); // Định dạng giá theo tiền Việt Nam
            }

            function renderProducts() {
                productList.innerHTML = ""; // Xóa danh sách cũ
                currentProducts.slice(0, visibleProducts).forEach(product => {
                    // Chuyển đổi giacu và giamoi từ text sang số
                    const giacu = parseFloat(product.giacu.replace(/[^0-9.-]+/g, ""));
                    const giamoi = parseFloat(product.giamoi.replace(/[^0-9.-]+/g, ""));

                    // Tính phần trăm giảm giá
                    const salePercentage = ((giacu - giamoi) / giacu) * 100;
                    const productDiv = document.createElement("div");
                    productDiv.classList.add("product_list_content_item");
                    // Thêm data-id bằng setAttribute
                    productDiv.setAttribute("data-id", product.id_sanpham);
                    productDiv.innerHTML = `
                        <div class="product_list_content_item_img" >
                            <img src="${product.src}" alt="${product.tensanpham}">
                        </div>
                        <div class="product_list_content_item_info">
                            <p class="product_name">${product.tensanpham}</p>
                            <div class="product_list_content_item_info_vip">
                                <p>CHẤT LƯỢNG: ${product.chatluong}</p>
                            </div>
                            <p class="product_price">${formatCurrency(product.giamoi)}<sup>đ</sup>
                            ${salePercentage > 0 ? `<span class="sale-badge">-${Math.round(salePercentage)}%</span>` : ''}</p>
                            
                            <p class="old_product_price"><span>${formatCurrency(product.giacu)}</span><sup>đ</sup></p>
                            <p>Bảo hành ${product.baohanh} - Bảo hành cả rơi vỡ</p>
                            <p>Trả góp 0% - Trả trước 0đ - Duyệt hồ sơ chỉ trong 9 phút</p>
                        </div>
                    `;
                    productList.appendChild(productDiv);
                });

                // Kiểm tra nếu còn sản phẩm để hiển thị
                if (visibleProducts < currentProducts.length) {
                    loadMoreBtn.style.display = "flex"; // Hiện nút "Xem thêm"
                } else {
                    loadMoreBtn.style.display = "none"; // Ẩn nếu không còn sản phẩm
                }
                console.log(document.querySelectorAll('.product_list_content_item'));
                const pageTitle = document.getElementById('page-title')?.textContent.trim();
                document.querySelectorAll('.product_list_content_item').forEach(item => {
                    item.addEventListener('click', function () {
                        const productId = this.getAttribute('data-id');// Lấy ID từ thuộc tính data-id
                        // Mã hóa tiêu đề để URL hợp lệ
                        const encodedTitle = encodeURIComponent(pageTitle);

                        window.location.href = `sanpham.html?id=${productId}&title=${encodedTitle}`;
                    });
                });
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
//Xem chi tiết sản phẩm
