// <!-- Initialize Swiper -->
var swiper = new Swiper(".mySwiper", {
    slidesPerView: 3,
    spaceBetween: 30,
    freeMode: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
});

// ================ buycar =================//
// Select the DOM elements
let btnShop = document.querySelector('#btnShop');
let classOrder = document.querySelector('#orderSection');
let btnClose = document.querySelector('#close');
let btnCancel = document.querySelector('#cancel');
let btnCheck = document.querySelector('#check');


// Show order section when 'Shop' button is clicked
btnShop.addEventListener('click', function() {
    classOrder.style.display = 'block';    
});

// Hide order section when 'Close' button is clicked
btnClose.addEventListener('click', function() {
    classOrder.style.display = 'none';
});

// Hide order section when 'Cancel' button is clicked
btnCancel.addEventListener('click', function() {
    classOrder.style.display = 'none';
});

btnCheck.addEventListener('click', function() {
    if (window.confirm('Are you sure you want to check this product?')) {
        classOrder.style.display = 'none';
    } else {
        alert('You canceled the deletion.');
    }
});

// ======= Start Product Item ======= //
let products = [
    {
        image: './img/imgcar/1.jpg',
        title: 'Car 1',
        price: 250
    },
    {
        image: './img/imgcar/2.jpg',
        title: 'Car 2',
        price: 300
    },
    {
        image: './img/imgcar/3.jpg',
        title: 'Car 3',
        price: 350
    },
    {
        image: './img/imgcar/4.jpg',
        title: 'Car 4',
        price: 400
    },
    {
        image: './img/imgcar/car/14.jfif',
        title: 'Car 5',
        price: 450
    },
    {
        image: './img/imgcar/car/6.jfif',
        title: 'Car 6',
        price: 500
    },
    {
        image: './img/imgcar/7.jfif',
        title: 'Car 7',
        price: 550
    },
    {
        image: './img/car12.jfif',
        title: 'Car 8',
        price: 600
    },
    {
        image: './img/imgcar/car/11.jfif',
        title: 'Car 9',
        price: 650
    },
     {
        image: './img/imgcar/car/7.jfif',
        title: 'Car 10',
        price: 650
    },
    {
     image: './img/img2/car2.jpg',
     title: 'Car 11',
     price: 650
    }, 
    {
     image: './img/imgcar/car/4.jpg',
     title: 'Car 12',
     price: 650
   },
   {
     image: './img/imgcar/car/5.jpg',
     title: 'Car 13',
     price: 650
   },
   {
     image: './img/img2/car1.jpg',
     title: 'Car 14',
     price: 650
   },
   {
     image: './img/car11.jfif',
     title: 'Car 15',
     price: 650
   },
];

let getItem = '';
let i = 0;

function inputProduct() {
    products.forEach(el => {
        getItem += `
        <section class="parts" id="parts">
            <!-- =========== -->
            <div class="parts-container container">
                <!-- ======== -->
                <div class="box">
                    <img src="${el.image}" alt="${el.title}">
                    <h3>${el.title}</h3>
                    <span>${el.price}.00$</span>
                    <div class="reviews">
                        <i class='bx bxs-star'></i> (6 Reviews)
                    </div>
                    <a href="#" class="btn" onclick="addCart(${i})">Buy Now</a>
                    <a href="#" class="details">View Details</a>
                </div>
                <!-- ======== -->
            </div>
        </section>`;
        i++;
    });

    document.querySelector('#proitem').innerHTML = getItem;
}

inputProduct();
// ================//
let productStore = [...new Set(products.map(item => item))];
let cart = [];

function addCart(index) {
    cart.push(productStore[index]);
    Display();
}

function Display() {
    let total = 0;
    let getcart = '';
    let count = document.querySelector('.count');
    
    count.innerHTML = cart.length;

    cart.map((el, index) => {
        let { image, title, price } = el;
        total += price;

        getcart += `
        <div class="col-10">
            <div class="row d-flex align-items-center">
                <div class="col-4"> 
                    <img src="${image}" alt="" class="img-thumbnail w-100">
                </div>
                <div class="col-4">
                    <h6 class="text-primary">${title}</h6>
                </div>
                <div class="col-4"> 
                    <h6 class="text-danger">${price}.00$</h6>
                </div>
            </div>
        </div>
        <div class="col-2">
            <button type="button" class="btn float-start" onClick='Delete(${index})'>
                <i class="fa-solid fa-trash-can text-danger fs-4"></i> 
            </button>
        </div>`;
    });

    document.querySelector('#showCart').innerHTML = getcart;
    document.querySelector('.total').innerHTML = `${total}.00$`;
}

function Delete(index) {
    if (window.confirm('Are you sure you want to delete this product?')) {
        cart.splice(index, 1);
        Display();
    } else {
        alert('You canceled the deletion.');
    }
}

let displayItem = (items) => {
    document.getElementById('proitem').innerHTML = items.map((item) => {
        const { image, title, price } = item;
        return (
            `<section class="parts" id="parts">
<!-- =========== -->
<div class="parts-container container">
    <!-- ======== -->
    <div class="box">
        <img src="${image}" alt="${title}">
        <h3>${title}</h3>
        <span>${price}.00$</span>
        <div class="reviews">
            <i class='bx bxs-star'></i> (6 Reviews)
        </div>
        <a href="#" class="btn" onclick="addCart(${products.indexOf(item)})">Buy Now</a>
        <a href="#" class="details">View Details</a>
    </div>
    <!-- ======== -->
</div>
</section>`
        );
    }).join('');
};

document.getElementById('searchBar').addEventListener('keyup', (e) => {
    let searchData = e.target.value.toLowerCase();
    let filteredData = products.filter((item) => {
        return item.title.toLowerCase().includes(searchData);
    });
    displayItem(filteredData);
});

displayItem(products);
