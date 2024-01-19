/** 무한 스크롤 */
const imageList = document.querySelector(".hodu_scroll_img");
let pageToFetch = 1;
let showMoreClicked = false; //show more 버튼이 클릭되었는지

//초기 이미지
document.addEventListener('DOMContentLoaded', () => {

    const initialImages = [
        "hodu_1.png",
        "hodu_2.png",
        "hodu_3.png",
        "hodu_4.png",
        "hodu_5.png",
        "hodu_6.png",
    ];

    makeImageList(initialImages);
});

async function fetchImages(pageNum){
    try {
        const response = await fetch('https://picsum.photos/v2/list?page=' +pageNum+'&limit=6');
        if (!response.ok) {
            throw new Error('네트워크 응답에 문제가 있습니다.');
        }

        const datas = await response.json();
        console.log(datas);

        makeImageList(datas);
        console.log("사진 나옴");

    } catch (error) {
        console.error('데이터를 가져오는데 문제가 발생했습니다 :', error);
    }
}



function makeImageList(datas){
    datas.forEach((item) => {
        const listItem = document.createElement("li");
        const img = document.createElement("img");

        if (typeof item === 'string') {
            img.src = item;
        } else if (item.download_url) {
            img.src = item.download_url;
        } else {
            console.error('예상하지 못한 데이터 형식:', item);
            return;
        }

        img.alt = '';
        listItem.appendChild(img);
        imageList.appendChild(listItem);
    });
}

window.addEventListener('scroll', ()=>{
    //스크롤이 상단으로부터 얼마나 이동했는지 알아야함 (뷰포트 높이 + 스크롤된 길이)
    //화면에 로딩된 페이지의 전체 높이
    //뷰포트의 높이 + 스크롤된 높이 + 10 === 화면에 로딩된 페이지의 전체 높이
    //show more 버튼 클릭하지 않으면, 무한 스크롤 x

    if(!showMoreClicked) return;

    if(window.innerHeight + document.documentElement.scrollTop + 10 >= document.documentElement.offsetHeight) {

        fetchImages(pageToFetch += 1, 6);
    }

});
fetchImages(pageToFetch, 6);

document.querySelector('.show').addEventListener('click', function() {
    showMoreClicked = true;
    fetchImages(pageToFetch += 1, 6); // 버튼 클릭 시 추가 이미지 6개씩 로드
});


/** 모달 창 */
const modal = document.getElementById("modal");
const subscribe = document.getElementById("subscribe");
subscribe.addEventListener("click", e=> {
    e.preventDefault();
    modal.style.display = "flex"
})

//모달 창 닫기 자바스크립트
const modalButton = modal.querySelector(".modal_button")
modalButton.addEventListener("click", e=> {
    e.preventDefault();
    modal.style.display = "none"
})

/** 카카오 맵*/
var mapContainer = document.getElementById('map'), // 지도를 표시할 div
    mapOption = {
        center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
        level: 3 // 지도의 확대 레벨
    };

var map = new kakao.maps.Map(mapContainer, mapOption);

var iwContent = '<div style="padding:5px;">Hodu Page!</div>', // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
    iwPosition = new kakao.maps.LatLng(33.450701, 126.570667), //인포윈도우 표시 위치입니다
    iwRemoveable = true; // removeable 속성을 ture 로 설정하면 인포윈도우를 닫을 수 있는 x버튼이 표시됩니다

// 인포윈도우를 생성하고 지도에 표시합니다
var infowindow = new kakao.maps.InfoWindow({
    map: map, // 인포윈도우가 표시될 지도
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