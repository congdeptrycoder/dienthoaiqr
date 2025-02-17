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

