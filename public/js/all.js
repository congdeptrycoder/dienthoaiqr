document.addEventListener("DOMContentLoaded", function () {
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



});