document.addEventListener("DOMContentLoaded", function () {
    // Search logic
    const searchIcon = document.getElementById("search_icon");
    const searchHeader = document.getElementById("search_header");

    searchHeader.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            const encodedTitle = encodeURIComponent(searchHeader.value.trim());
            if (encodedTitle) {
                window.location.href = `danhmuc.html?search=${encodedTitle}`;
            }
        }
    });

    // Menu toggle logic from slide.js
    const menuToggle = document.querySelector(".menu-toggle");
    const menu = document.querySelector(".menu");

    if (menuToggle) {
        menuToggle.addEventListener("click", function () {
            menu.classList.toggle("active");
        });
    }

    const menuItems = document.querySelectorAll(".menu > li");
    menuItems.forEach(item => {
        item.addEventListener("click", function (e) {
            const submenu = item.querySelector(".submenu");
            if (submenu) {
                submenu.classList.toggle("active");
            }
        });
    });

    // Random products logic
    const productsContainer = document.querySelector(".dienthoai_noibat_content_items");

    if (productsContainer) {
        fetch('https://smartphonequanrau.kesug.com/api/randomsp.php')
            .then(response => response.json())
            .then(data => {
                if (data.status === 'success') {
                    productsContainer.innerHTML = ''; // Xóa nội dung cũ
                    data.products.forEach(product => {
                        const productItem = document.createElement('div');
                        productItem.classList.add('dienthoai_noibat_content_item');
                        productItem.setAttribute('data-id', product.id_sanpham);

                        const oldPrice = parseFloat(product.giacu);
                        const newPrice = parseFloat(product.giamoi);
                        let discount = 0;
                        if (oldPrice > 0 && oldPrice > newPrice) {
                            discount = Math.round(((oldPrice - newPrice) / oldPrice) * 100);
                        }

                        productItem.innerHTML = `
                            <img src="${"public/image/" + product.src}" alt="${product.tensanpham}">
                            <div class="dienthoai_noibat_content_item_info">
                                <li><img src="public/image/san_pham/sale/sticker.png"></li>
                                <li>${product.tensanpham}</li>
                                <li>Ưu đãi cho bạn</li>
                                <li><a>${newPrice.toLocaleString('vi-VN')}</a><sup>đ</sup>${discount > 0 ? `<span>-${discount}%</span>` : ''}</li>
                                <li>${oldPrice > 0 ? oldPrice.toLocaleString('vi-VN') + '<sup>đ</sup>' : ''}</li>
                                <li>Bấm để xem chi tiết sản phẩm, bảo hành,...</li>
                                <li><i class="fa-solid fa-star"></i>5</li>
                            </div>
                        `;
                        productsContainer.appendChild(productItem);
                        productItem.addEventListener('click', function () {
                            const productId = this.getAttribute('data-id');
                            window.location.href = `sanpham.html?id=${productId}`;
                        });
                    });
                } else {
                    console.error("Lỗi khi lấy dữ liệu sản phẩm: " + data.message);
                }
            })
            .catch(error => console.error('Lỗi fetch:', error));
    }
});