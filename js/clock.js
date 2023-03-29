// Clock 시 : 분 : 초 작성하기

const clock = document.querySelector("#clock");
clock.innerHTML = "09:54:42" // 테스트용

// 현재 시각 받아오는 함수
// padStart로 항상 두자리수로 보이게 하기 (빈자리 0) 
function getClock() {
    let date = new Date();
    let hour = String(date.getHours()).padStart(2,"0");
    let minutes = String(date.getMinutes()).padStart(2,"0");
    let seconds = String(date.getSeconds()).padStart(2,"0");

    return `${hour}:${minutes}:${seconds}`;
}

// 1초마다 현재 시간 불러 와 화면에 출력
// setInterval 이용
// 함수는 안에 작성
setInterval(function (){
    clock.innerHTML = getClock();
}
, 1000)
// 1초 딜레이 없애기
clock.innerHTML = getClock();