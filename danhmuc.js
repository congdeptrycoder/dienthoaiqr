document.addEventListener('DOMContentLoaded', function () {
    const menuToggle = document.querySelector('.menu-toggle');
    const menu = document.querySelector('.menu');
    console.log(menuToggle);
    console.log(menu);
    menuToggle.addEventListener('click', function (e) {
        e.stopPropagation();
        menu.classList.toggle('active');
        this.classList.toggle('active');
        console.log("checked");
        // Ẩn tất cả submenu khi menu mobile hiện
        document.querySelectorAll('.submenu').forEach(sub => {
            sub.style.display = 'none';
        });
    });

    // Đóng menu khi click ra ngoài
    document.addEventListener('click', function (e) {
        if (!menu.contains(e.target) && !menuToggle.contains(e.target)) {
            menu.classList.remove('active');
            menuToggle.classList.remove('active');
        }
    });

    // Ngăn click vào menu item có submenu
    // document.querySelectorAll('.menu > li').forEach(item => {
    //     item.addEventListener('click', function (e) {
    //         if (window.innerWidth <= 1120) {
    //             e.preventDefault();
    //             e.stopPropagation();
    //         }
    //     });
    // });
});