/* eslint-disable */
import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';

function App() {

  //var a, b = [10, 100]; //ES6 destructuring 문법 

  let [글제목,글제목변경] = useState(['남자 코트 추천', '강남 우동 맛집','남자 여름 코디']); 
  let [따봉, 따봉변경] = useState(0);
  //state라는 변수 저장공간 만들기
  //이렇게 State를 만들면 array가 생성된다.
  //array안에는 [a,b]처럼 두가지 데이터가 들어있다.
  //a에는 '남자 코트 추천'이 들어있고 
  //b에는 a의 데이터를 수정하기 위한 함수가 들어있다. 
  //state는 변수 대신 쓰는 데이터 저장 공간 
  //useState()를 사용해서 만들어야 함
  //문자, 숫자, array, Object 다 저장 가능
  //state를 굳이 쓰는 이유는? 
  //react를 Web-app 처럼 만들고 싶으면 전부 state로 만들어라
  //데이터 변경시에 state로 만들어진 데이터라면 HTML이 저절로 재렌더링이 되므로
  //state로 만든 변수들이 엄청 용이하다. 
  //state변수 변경하려면 쌩으로 하지말고 변경함수를 사용하여야 정상적인 재렌더링이 이루어진다.
  let posts = '강남 고기 맛집';
  let [modal, modal변경] = useState(false); //모달창을 켜고 닫는 스위치
  let [누른제목, 누른제목변경] = useState(0);
  let [입력값, 입력값변경] = useState('');
  function 반복된UI(){
    var array = [];
    for(var i=0; i<3; i++){
      array.push(<div>안녕</div>);
    }
    
    return array;
  }
  function 제목바꾸기 (){
    var newArray = [...글제목]; //deep copy 스킬, ...연산자 사용
    newArray[0] = '여자 코트 추천';
    글제목변경(newArray);
  }
  const sort = (arr)=>{
    var temp; 
    temp = arr[0];
    arr[0] = arr[1];
    arr[1] = temp;
  }
  function 순서정렬(){
    var newArray = [...글제목];
    sort(newArray);
    글제목변경(newArray);
  }
  
   return(
    <div className="App">
        <div className="black-nav">
          <div>개발 blog</div>
        </div>
        <button onClick={제목바꾸기}>이름바꾸기버튼</button>
        <button onClick={순서정렬}>정렬버튼</button>
        {

          글제목.map((글,i)=>{  //여기서 i 파라미터는 0,1,2...iterator
            return (
              <div className="list" key={i}>
              <h3 onClick={ ()=>{ 누른제목변경(i) } }>{ 글 } <span onClick={()=>{따봉변경(따봉++)}}>👍 {따봉}</span></h3>
              <p>2월 18일 발행</p>
              <hr/>
              </div>
            )
          })
        }
        
        {/* 글 발행하는 UI를 만들어보자. 일단 서버와 DB가 없으므로
        페이지에 글이 영구저장되는 것은 아니다.     */}
        <div className="publish">
          <input onChange={ (e)=>{입력값변경(e.target.value) } }/>
          <button onClick={()=>{ 
            var arrayCopy = [...글제목];
            arrayCopy.unshift(입력값);//array맨앞에 자료 하나 추가하는 문법
            글제목변경(arrayCopy);
            
          }}>저장</button>
        </div>

        {/* onChange 이벤트 : 뭔가가 입력이 될 때 안의 함수가 실행됨 */}
        <input onChange={ (e)=>{입력값변경(e.target.value) } }/>
       
        <button onClick={()=>{ modal변경(!modal)} }>버튼</button>
        {
          modal == true
          ? <Modal 글제목={글제목} 누른제목={누른제목}></Modal> //부모컴포넌트는App, 자식컴포넌트가 Modal
          : null
        }
        {반복된UI()}
        <Profile></Profile>
    </div>
   );
}

//Component 생성하기 
//Component 생성 관습 : 
// 1.첫문자 대문자
// 2.return 소괄호 안에 div는 큰거 하나만(그안에는 태그들 많아도 됨)! 
// 3.function App또한 하나의 Component이다.
// 4.Component는 반복적으로 출현하는 UI들 위주로 만들어 준다. 
// 5.사이트 내에서 자주 바뀌는 UI들을 Component로 만들어 준다. 
// 단점 : State를 쓸 때 복잡해진다. (function App에서 변수를 만들기 때문에, 그 scope를 벗어난 Component에서 쓸려면 전달해줘야하므로 props라는 문법 이용해야함)
function Modal(props){
  //return 안에 있는 HTML이 위 App 안에 Modal 태그 안에 다 들어간다. 
  //App에 있는 state변수들 여기서 쓰려면 props문을 써서 데이터를 전송해줘야함.
  //props문 : <자식컴포넌트 작명={state명}/>
  //props로 자식에게 전송 후 쓰면 됨. 
  //위에 Modal컴포넌트 정의함수에 파라미터로 넘긴 props에 부모 컴포넌트로부터 
  //전송받은 모든 state들에 대한 정보가 있다. 하나의 Object라고 보면 된다. 
  // 참고1) props는 <Modal 이런거={이런거}  저런거={저런거}> 이렇게 10개 100개 1000개 무한히 전송이 가능합니다.
  // 참고2) props라는 파라미터엔 전송한 모든 props 데이터가 들어가있습니다. props.글제목 이런 식으로 원하는 것만 꺼내쓰시면 됩니다.
  // 참고3) props 전송할 땐 꼭 {} 중괄호로 전송해야하는건 아닙니다.
  // <Modal 글제목={변수명}> 이렇게 변수명을 넣고싶으면 중괄호를 쓰시고
  // <Modal 글제목="강남우동맛집"> 이렇게 일반 텍스트를 전송하고 싶으면 따옴표 써도 됩니다.
  return (
    <div className="modal">
      <h2>{ props.글제목[props.누른제목] }</h2>
      <p>날짜</p>
      <p>상세내용</p>
    </div>
  )
}

//옛날버전 리액트에서 컴포넌트 만드는 문법 class사용
class Profile extends React.Component{
  constructor(){
    //state는 constructor 안에 작성
    //constructor는 class의 변수, 초기값 저장할 때 쓴다. 
    super();
    this.state = { name: "Kim", age : 30 };
  }

  changeName(){
    this.setState( {name : "Park"});
  }
  render(){
    return(
      <div>
        <h3>프로필입니다</h3>
        <p>저는 {this.state.name} 입니다. </p>
        {/* setState()함수는 useState문법과 달라서 내용을 통채로 바꾸는게 아니고
        필요한 부분만 바꿔주는 메소드이다.  즉 위에 age는 안바뀜*/}
        <button onClick = { this.changeName.bind(this)} >변경버튼</button>
      </div>
    )
  }
}

export default App;
