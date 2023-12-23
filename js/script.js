//   header
var prevScrollpos = window.pageYOffset;
var header = document.getElementById("header");

window.onscroll = function() {
    var currentScrollPos = window.pageYOffset;

    if (prevScrollpos > currentScrollPos) {
        header.style.top = "0";
    } else {
        header.style.top = "-80px"; // Sesuaikan dengan tinggi header
    }

    prevScrollpos = currentScrollPos;
};

// banner
const bannerContainer = document.querySelector('.banner-container');

window.addEventListener('scroll', function() {
  const scrollValue = window.scrollY;
  bannerContainer.style.transform = `translateY(-${scrollValue * 0.4}px)`;
});


const apiUrl = 'https://suitmedia-backend.suitdev.com/api/ideas';

const requestData = {
  'page[number]': 1,
  'page[size]': 10,
  append: ['small_image', 'medium_image'],
  sort: '-published_at',
};

const itemsContainer = document.getElementById('itemsContainer');
const showingCountElement = document.getElementById('showingCount');
const totalCountElement = document.getElementById('totalCount');

let currentPage = requestData['page[number]'];
let itemsPerPage = requestData['page[size]'];
let sortBy = 'newest';
//let sortBy = requestData.sort;

renderItems();

function renderItems(){
    itemsContainer.innerHTML = '';

    const dummyData = [
        { id: 1, time: '21 Agustus 2023', title: 'Manfaat Layanan Digital Agency Untuk Memajukan Bisnis', image: 'https://suitmedia.static-assets.id/storage/files/6239/conversions/shutterstock_758829157-medium.jpg' },
        { id: 2, time: '21 Agustus 2023', title: 'Mockup Design: Pengertian, Manfaat, dan Contoh', image: 'https://suitmedia.static-assets.id/storage/files/6237/conversions/shutterstock_1565680594-medium.jpg' },
        { id: 3, time: '5 september 2023', title: 'Color RGB vs. DYMK: Apa Perbedaannya?', image: 'https://suitmedia.static-assets.id/storage/files/6235/conversions/Shutterstock_2162975745-medium.jpg' },
        { id: 4, time: '5 september 2023', title: 'Pentingnya Prorecrutment untuk Transformasi Digital', image: 'https://suitmedia.static-assets.id/storage/files/6217/conversions/shutterstock_622728959-medium.jpg' },
        { id: 5, time: '7 september 2023', title: 'Berikut Langkah-langkah Membuat Content Plan', image: 'https://suitmedia.static-assets.id/storage/files/6120/conversions/shutterstock_2206075211-medium.jpg' },
        { id: 6, time: '7 september 2023', title: 'Manfaat Layanan Digital Agency Untuk Memajukan Bisnis', image: 'https://suitmedia.static-assets.id/storage/files/6239/conversions/shutterstock_758829157-medium.jpg' },
        { id: 7, time: '8 september 2023', title: 'Mockup Design: Pengertian, Manfaat, dan Contoh', image: 'https://suitmedia.static-assets.id/storage/files/6237/conversions/shutterstock_1565680594-medium.jpg' },
        { id: 8, time: '8 september 2023', title: 'Color RGB vs. DYMK: Apa Perbedaannya?', image: 'https://suitmedia.static-assets.id/storage/files/6235/conversions/Shutterstock_2162975745-medium.jpg' },
        { id: 9, time: '8 september 2023', title: 'Pentingnya Prorecrutment untuk Transformasi Digital', image: 'https://suitmedia.static-assets.id/storage/files/6217/conversions/shutterstock_622728959-medium.jpg' },
        { id: 10, time: '11 september 2023', title: 'Berikut Langkah-langkah Membuat Content Plan', image: 'https://suitmedia.static-assets.id/storage/files/6120/conversions/shutterstock_2206075211-medium.jpg' },
        { id: 11, time: '11 september 2023', title: 'Manfaat Layanan Digital Agency Untuk Memajukan Bisnis', image: 'https://suitmedia.static-assets.id/storage/files/6239/conversions/shutterstock_758829157-medium.jpg' },
        { id: 12, time: '11 september 2023', title: 'Mockup Design: Pengertian, Manfaat, dan Contoh', image: 'https://suitmedia.static-assets.id/storage/files/6237/conversions/shutterstock_1565680594-medium.jpg' },
        // ... data lainnya
    ];

    const sortedData = sortData(dummyData, sortBy);
    const paginatedData = paginateData(sortedData, currentPage, itemsPerPage);

    paginatedData.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.classList.add('item');
        itemElement.innerHTML = `
            <a href="#">
                <img src="${item.image}" alt="${item.title}">
                <div class="text">
                    <h3 class="time">${item.time}</h3>
                    <h3 clas="title">${item.title}</h3>
                </div>
            </a>
        `;
        itemsContainer.appendChild(itemElement);
    });

    document.getElementById('currentPage').textContent = currentPage;

    showingCountElement.textContent = paginatedData.length; // Jumlah item yang ditampilkan
    totalCountElement.textContent = sortedData.length; // Jumlah total item

    document.getElementById('showingCount').textContent = paginatedData.length; // Jumlah item yang ditampilkan

}

function sortPosts() {
    sortBy = document.getElementById('sort').value;
    currentPage = 1;
    renderItems();
}

function showPerPage() {
    itemsPerPage = parseInt(document.getElementById('perPage').value);
    currentPage = 1;
    renderItems();
}

function changePage(direction) {
    if (direction === 'prev' && currentPage > 1) {
        currentPage--;
    } else if (direction === 'next') {
        currentPage++;
    }

    renderItems();
}

function sortData(data, sortBy) {
    // Implement your sorting logic here (e.g., based on published date)
    return sortBy === 'newest' ? data.reverse() : data;
}

function paginateData(data, currentPage, itemsPerPage) {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return data.slice(startIndex, endIndex);
}