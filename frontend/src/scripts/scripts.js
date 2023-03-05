// const myModal = document.getElementById('myModal')
// const myInput = document.getElementById('myInput')

// $(document).ready(function(){
//     //jquery for toggle sub menus
//     $('.sub-btn').click(function(){
//       $(this).next('.sub-menu').slideToggle();
//       $(this).find('.dropdown').toggleClass('rotate');
//     });

//     //jquery for expand and collapse the sidebar
//     $('.menu-btn').click(function(){
//       $('.side-bar').addClass('active');
//       $('.menu-btn').css("visibility", "hidden");
//     });

//     $('.close-btn').click(function(){
//       $('.side-bar').removeClass('active');
//       $('.menu-btn').css("visibility", "visible");
//     });
//   });

document.addEventListener("DOMContentLoaded", function() {
    var myOffcanvas = document.getElementById('myOffcanvas');
    myOffcanvas.addEventListener('hidden.bs.offcanvas', function () {
        var offcanvasBackdrop = document.querySelector('.offcanvas-backdrop');
        if (offcanvasBackdrop) {
        offcanvasBackdrop.parentNode.removeChild(offcanvasBackdrop);
        }
    });
});