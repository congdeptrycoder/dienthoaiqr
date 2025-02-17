let count = 0;
let start = 0;
const slideContent = document.querySelector('.slide_content_left_top');
const slideContainer = document.querySelector('.slide_sanpham_sale_content_items');
const slideItems = document.querySelectorAll('.slide_sanpham_sale_content_item');
const maxList = document.querySelectorAll('.slide_content_left_bottom li');
const maxImg = document.querySelectorAll('.slide_content_left_top img').length;
const btn_right = document.querySelector('.fa-chevron-right')
const btn_left = document.querySelector('.fa-chevron-left')
const btn_right2 = document.querySelector('.fa-chevron-right-2')
const btn_left2 = document.querySelector('.fa-chevron-left-2')
function removeslideactive() {
    let imgactive = document.querySelector('.slide_active');
    imgactive.classList.remove('slide_active');
}
function removes_add_active(count) {
    removeslideactive();
    maxList[count].classList.add('slide_active');
}
btn_right.addEventListener("click", function () {
    if (count < maxImg - 1) count += 1; else count = 0
    removeslideactive(count);
    maxList[count].classList.add('slide_active');
    slideContent.style.right = count * 100 + "%";
})

btn_left.addEventListener("click", function () {
    if (count > 0) count -= 1; else count = maxImg - 1;
    removes_add_active(count)
    slideContent.style.right = count * 100 + "%";
})
maxList.forEach((item, index) => {
    item.addEventListener('click', () => {
        count = index;
        removes_add_active(count)
        slideContent.style.right = count * 100 + "%";
    })
})
function imgAuto() {
    if (count < maxImg - 1) count += 1; else count = 0
    slideContent.style.right = count * 100 + "%";
    removes_add_active(count)
}
let intervalSlide = setInterval(imgAuto, 3000);
slideContent.addEventListener('mouseover', () => {
    clearInterval(intervalSlide);
});
slideContent.addEventListener('mouseout', () => {
    intervalSlide = setInterval(imgAuto, 3000);
});
/*sanphamsale*/
// Hàm tính số items có thể hiển thị
const itemWidth = slideContainer.querySelector('.slide_sanpham_sale_content_item').offsetWidth + 10;
function calculateVisibleItems() {
    const containerWidth = slideContainer.parentElement.offsetWidth;
    const itemWidth = slideContainer.querySelector('.slide_sanpham_sale_content_item').offsetWidth + 10; // Bao gồm gap
    return Math.floor(containerWidth / itemWidth);
}

// Khởi tạo các biến
let i = 0;
let visibleItems = calculateVisibleItems();

// Cập nhật số items hiển thị khi resize window
window.addEventListener('resize', () => {
    const previousVisible = visibleItems;
    visibleItems = calculateVisibleItems();

    // Điều chỉnh vị trí slide nếu cần
    const maxIndex = slideItems.length - visibleItems;
    if (i > maxIndex) {
        i = maxIndex;
        slideContainer.style.transform = `translateX(-${i * itemWidth}px)`;
    }
});

// Xử lý nút next
btn_right2.addEventListener("click", function () {
    const itemWidth = slideContainer.querySelector('.slide_sanpham_sale_content_item').offsetWidth + 10;
    const maxIndex = slideItems.length - visibleItems;

    if (i < maxIndex) {
        i++;
        slideContainer.style.transform = `translateX(-${i * itemWidth}px)`;
    }
});

// Xử lý nút previous
btn_left2.addEventListener("click", function () {
    const itemWidth = slideContainer.querySelector('.slide_sanpham_sale_content_item').offsetWidth + 10;

    if (i > 0) {
        i--;
        slideContainer.style.transform = `translateX(-${i * itemWidth}px)`;
    }
});

// Thêm transition cho smooth sliding
slideContainer.style.transition = 'transform 0.3s ease-in-out';

// Ẩn/hiện nút điều hướng dựa trên vị trí slide
function updateNavigationButtons() {
    const maxIndex = slideItems.length - visibleItems;
    btn_left2.style.opacity = i === 0 ? '0.2' : '1';
    btn_right2.style.opacity = i === maxIndex ? '0.2' : '1';
}

// Cập nhật trạng thái nút khi click
btn_right2.addEventListener("click", updateNavigationButtons);
btn_left2.addEventListener("click", updateNavigationButtons);

// Khởi tạo trạng thái nút ban đầu
updateNavigationButtons();
function togglePopup() {
    var popup = document.getElementById("chatPopup");
    var chatIcon = document.getElementById("chaticon");
    var chatButton = document.getElementById("chatButton");

    if (popup.style.display === "block") {
        popup.style.display = "none";
        chatIcon.className = "fa-regular fa-comment fa-2xl";
        chatIcon.classList.remove("rotate");
        chatButton.classList.add("blink");
    } else {
        popup.style.display = "block";
        chatIcon.className = "fa-solid fa-x fa-lg"; // Icon thay thế khi mở popup
        chatIcon.classList.add("rotate");
        chatButton.classList.remove("blink");
    }

}