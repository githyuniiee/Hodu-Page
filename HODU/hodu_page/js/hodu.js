/** 무한 스크롤 */
const imageList = document.querySelector(".hodu_scroll_img");
let pageToFetch = 1;
let showMoreClicked = false;
let isLoading = false;

document.addEventListener('DOMContentLoaded', () => {
    initialImages = [
        "../png/hodu_1.png",
        "../png/hodu_2.png",
        "../png/hodu_3.png",
        "../png/hodu_4.png",
        "../png/hodu_5.png",
        "../png/hodu_6.png",
    ];
    makeImageList(initialImages);
});

async function fetchImages(pageNum){
    isLoading = true; // 이미지 로딩을 시작합니다.
    try {
        const response = await fetch('https://picsum.photos/v2/list?page=' + pageNum);
        if (!response.ok) {
            throw new Error('네트워크 응답에 문제가 있습니다.');
        }
        const datas = await response.json();
        makeImageList(datas);
    } catch (error) {
        console.error('데이터를 가져오는데 문제가 발생했습니다 :', error);
    } finally {
         isLoading = false;
    }
}

function makeImageList(datas){
    datas.forEach((item) => {
        const listItem = document.createElement("li");
        const img = document.createElement("img");
        img.src = typeof item === 'string' ? item : item.download_url;
        img.alt = '';
        listItem.appendChild(img);
        imageList.appendChild(listItem);
    });
}

const scrollLayout = document.querySelector('.scroll_layout'); //스크롤 레이아웃 선택
scrollLayout.addEventListener('scroll', ()=>{
    if(!isLoading && showMoreClicked && scrollLayout.scrollTop + scrollLayout.clientHeight >= scrollLayout.scrollHeight) {
        fetchImages(++pageToFetch);
    }
});

document.querySelector('.show').addEventListener('click', function() {
    showMoreClicked = true;
    fetchImages(++pageToFetch);
});





/** 모달 창 */
const modal = document.getElementById("modal");
const subscribe = document.getElementById("subscribe");
subscribe.addEventListener("click", e=> {
    e.preventDefault();
    modal.style.display = "flex"
})

/**모달 창 닫기 자바스크립트*/
const modalButton = modal.querySelector(".modal_button")
modalButton.addEventListener("click", e=> {
    e.preventDefault();
    modal.style.display = "none"
})

/** 카카오 맵*/
var mapContainer = document.getElementById('map'),
    mapOption = {
        center: new kakao.maps.LatLng(33.450701, 126.570667),
        level: 3 // 지도의 확대 레벨
    };

var map = new kakao.maps.Map(mapContainer, mapOption);

var iwContent = '<div style="padding:5px;">Hodu Page!</div>',
    iwPosition = new kakao.maps.LatLng(33.450701, 126.570667),
    iwRemoveable = true;


var infowindow = new kakao.maps.InfoWindow({
    map: map,
    position : iwPosition,
    content : iwContent,
    removable : iwRemoveable
});

/** sns 이동*/
document.querySelector('.blog').addEventListener('click', function() {
    window.location.href = 'https://section.blog.naver.com/';
});
document.querySelector('.instagram').addEventListener('click', function() {
    window.location.href = 'https://www.instagram.com/';
});
document.querySelector('.facebook').addEventListener('click', function() {
    window.location.href = 'https://www.facebook.com/';
});
document.querySelector('.youtube').addEventListener('click',
    function () {
        window.location.href = 'https://www.youtube.com/';
    });

/**hover*/
document.querySelector('.hover1').addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});
