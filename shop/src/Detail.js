import axios from 'axios';
import React, {useEffect, useState} from 'react';
import { useHistory, useParams } from 'react-router-dom';
import styled from 'styled-components';
import './Detail.scss';

//아래와 같이 CSS를 미리 입혀 놓은 컴포넌트를 만들 수 있음 (styled import후)
let 박스 = styled.div`
    padding: 20px;
    
`;

let 제목 = styled.h4`
    font-size: 25px;
    color: ${ props => props.색상 }
`;

// 컴포넌트의 Lifecycle
// 컴포넌트는 등장, 업데이트(재렌더링), 퇴장(사라짐)의 라이프사이클을 가진다. 
// 여기서 Hook이라는 것으로 컴포넌트의 인생 중간중간에 뭔가 명령을 줄 수 있다. 
// ex.<Detail>등장 전에 이것좀 해주세요 등등

// class Detail2 extends React.Component{

//     componentDidMount(){
//     //얘네가 옛날스타일 Hook이다. 
//     }
//     componentWillUnmount(){

//     }

// }







function Detail(props){
    
    let [ alert, alert변경 ] = useState(true);
    let [ inputData, inputData변경 ] = useState('');
    // useEffect Hook : 컴포넌트가 마운트 되었을 때 
    // 컴포넌트가 update될 때 
    // 특정코드를 실행할 수 있음. 
    // 콤마 이후 대괄호 안에는 useEffect가 실행될 조건을 적을 수 있다. 
    // useEffect()여러개 적으면 적은 순서대로 실행된다. AJAX사용 시 활용함
    useEffect(()=>{
        //이렇게 치면 컴포넌트가 update될 때 아래 코드가 실행된다. 
        //2초후에 alert창을 안보이게 해보자. 
        let timer = setTimeout(()=>{
            alert변경(false);
        }, 2000);     
        //return ()=>{실행할 코드} //detail이란 컴포넌트가 사라질 때 실행할 코드
        //setTimeout쓸 때 주의점 : 타이머를 끝나고 제거해주지 않으면
        // 버그가 발생 할 수도 있다. return으로 제거해주기
        return ()=>{clearTimeout(timer)};
      }, [alert]);
    // 위 처럼 [alert]라고 넣어주면 alert라는 state가 변결될때만 실행해주세요 라는 말.
    // 만약 []이라고 아무것도 안쓴다면, Detail컴포넌트가 최초로 등장할 때 
    // 그때 한 번만 실행된다. 
    
    let { id } = useParams();
    let 찾은상품 = props.shoes.find((상품)=>{
        return 상품.id == id;
    })
    let history = useHistory();
    
    return (
        <div className="container">
          <박스>
            <제목 className="red" 색상='green'>Detailed</제목>
          </박스>
          {inputData}
          <input onChange={(e)=>{ inputData변경(e.target.value)}}/>
          {/* e.target.value는 현재 입력되는 값을 의미한다. */}
          {/* 여기서 문제 : inputData가 바뀔 때마다 HTML이 재렌더링된다. 
          이렇게 되면 위에 만든 UI인 alert도 계속 재렌더링되는 것이다. 
          useEffect()가 계속 재실행되는 버그가 발생하는 것 
          그래서 useEffect에 파라미터로 마지막에 실행조건을 넣어주면 된다.*/}
          {
            alert === true 
            ?  (<div className="my-alert2">
                  <p>재고가 얼마 남지 않았습니다</p>
              </div>)
            : null
          }

          <div className="row">
            <div className="col-md-6">
              <img src={'https://codingapple1.github.io/shop/shoes' + (찾은상품.id + 1) + '.jpg'} width="100%" />
            </div>
            <div className="col-md-6 mt-4">
              <h4 className="pt-5">{찾은상품.title}</h4>
              <p>{찾은상품.content}</p>
              <p>{찾은상품.price}</p>
              <Info 재고={props.재고}></Info>
              <button className="btn btn-danger" onClick={()=>{
                props.재고변경([9,10,11]);
              }}>주문하기</button> 
              <button className="btn btn-danger" onClick={
                ()=>{ history.goBack();
                    //history.push('/xxx')이라 하면 특정 경로로 이동시킬 수 있다.
                }}>뒤로가기</button>
            </div>
          </div>
        </div> 

        
    )
}

function Info(props){
  return(
    <p>재고 : {props.재고[0]}</p>
  )
}

export default Detail;