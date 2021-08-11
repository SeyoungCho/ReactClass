export default [
    {
        id : 0,
        title : "White and Black",
        content : "Born in France",
        price : 120000
    },

    {
        id : 1,
        title : "Red Knit",
        content : "Born in Seoul",
        price : 110000
    },

    {
        id : 2,
        title : "Grey Yordan",
        content : "Born in the States",
        price : 130000
    }
] 
// src 폴더에 App.js와 나란히 data.js를 만들었습니다.

// 이 파일에서 중요한 변수를 export하고 싶을 땐 export default라는 문법을 쓰시고 우측에 배출을 원하는 변수를 담아줄 수 있습니다.

// - 변수명, 함수명, 자료형 전부 배출가능합니다.

// - 파일마다 export default 라는 키워드는 하나만 사용가능합니다.

// 끝입니다.

//변수 내보내기와 같은 기능이라고 보면 됨. 

//export default는 한 파일당 한번만 쓸 수 있음. 
//그럼 2개 이상 내보내고 싶으면? 
//export { 변수1, 변수2, ...}로 가능
//마찬가지로 가져오기도 import { 변수1, 변수2, ... } from 경로