// 투두 입력 변수 선언
const todoform = document.querySelector("#todoform");
const state = document.querySelector("#state");
// todolist 카운트 1) DOM 가져와서 사용용
const count = document.querySelector("#state1");
// todolist 카운트 2) 카운트 변수 사용용
let listChecked = 0;
let listAll = 0;

// 투두 버튼 클릭 시 이벤트
todoform.addEventListener("submit", todoinput);

// 투두 입력 함수
function todoinput(event) {
    // submit 버튼은 자동 새로고침 있으므로 preventDefault 사용
    event.preventDefault();
    
    // to do 리스트 (ul 태그)
    // 입력 받은 투두 값을 li로 출력
    // (체크박스 + 투두값 + 삭제버튼) 함께 생성 해서 하나의 li로
    const li = document.createElement("li");
    // checkbox
    const check = document.createElement("input");
    check.type = "checkbox";
    // todovalue
    const todovalue = todoform.firstElementChild.value;
    //  const text = document.createTextNode(todovalue);
    //  span으로 스타일 빼내기
    const text = document.createElement("span");
    text.innerHTML = todovalue;
    // button
    const btn = document.createElement("button");
    btn.innerHTML = "X";
    
    // li에 생성한 요소 넣기
    li.appendChild(check);
    li.appendChild(text);
    li.appendChild(btn);
    
    // ul에 li 넣기
    const todolist = document.querySelector("#todolist");
    todolist.appendChild(li);

    // 투두 입력 submit 후 입력창 초기화
    todoform.firstElementChild.value = "";

    // checkbox, 삭제버튼 이벤트 추가
    check.addEventListener("click", todoCheck);
    btn.addEventListener("click", todoDelete);
    
    // to do list 추가할 때 실행
    // 1) 전체 할일 (DOM function으로 센다)
    count.innerHTML = `전체 할일 : ${getAllCount()} | 완료한 할일 : ${getCheckedCount()}`

    // 2) 전체 할일 (추가된 todo 총 개수 - 카운트 변수)
    listAll++;
    return state.innerHTML = `전체 할일 ${listAll} | 완료한 할일 ${listChecked}`;
}

// checkbox 설정
function todoCheck(event) {
    const li = event.target.parentNode;
    const span = li.children[1];
    if (event.target.checked){
        span.style.color = "rgba(255,255,255,0.3)";
        span.style.textDecoration = "line-through";
        span.style.fontStyle = "italic";
        listChecked+=1;
    }
    else {
        span.style.color = "";
        span.style.textDecoration = "none"
        span.style.fontStyle = "normal";
        listChecked-=1;
    }
    // 1) 완료한 할일 (DOM)
    count.innerHTML = `전체 할일 : ${getAllCount()} | 완료한 할일 : ${getCheckedCount()}`
    // 2) 완료한 할일 (카운트 변수)
    return state.innerHTML = `전체 할일 ${listAll} | 완료한 할일 ${listChecked}`;
}


// 삭제 버튼 설정
function todoDelete(event){
    event.target.parentNode.remove();
    // to do list 삭제할 때 실행
    // 1) 전체 할일 (DOM function으로 센다)
    count.innerHTML = `전체 할일 : ${getAllCount()} | 완료한 할일 : ${getCheckedCount()}`
    // 2) 전체 할일 (카운트 변수) - 삭제 조건: 체크X -> 0, 체크O -> -1
    listAll--;
    const checkbox = event.target.parentNode.firstElementChild;
    if (checkbox.checked){
        listChecked--;
    }
    // 이것만 하면 오류!!! 체크된 항목 삭제 시 완료한 일 카운트 X
    return state.innerHTML = `전체 할일 ${listAll} | 완료한 할일 ${listChecked}`;
}



/////////// 1) DOM - querySelector, querySelectorAll  /////////////////
// 추가, 삭제, 체크 할 때마다 개수 확인
// 함수 만들어서 확인
// 전체 개수 확인
function getAllCount() {
    const todolist = document.querySelector("#todolist");
    console.log(todolist.childElementCount);
    // 1) return을 통해서 값을 전달
    // 2) getAllCount 함수에서 DOM 가져와 바로 출력
    return todolist.childElementCount;
}
// 체크된 DOM 개수 가져오기
function getCheckedCount() {
    const checkedlist =
        document.querySelectorAll("#todolist li input[type='checkbox']:checked");
    console.log(checkedlist.length);
    return checkedlist.length;
}
/////////// 2) Count 변수 사용  /////////////////
// 항목 추가 > 전체 카운트 +
// 항목 체크 > 완료한 카운트 +-
// 항목 삭제 > 전체 카운트 - , 체크된 항목일 시 완료한 카운트도 -