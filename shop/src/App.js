import { Button,NavDropdown, Nav,Navbar,Container, Jumbotron } from 'react-bootstrap';
import logo from './logo.svg';
import React, {useState} from 'react';
import './App.css';
import Data from './data.js';
import Detail from './Detail.js';
import axios from 'axios';

import { Link, Route, Switch } from 'react-router-dom';

//내보내기 : export default 변수명
//가져오기 : import 변수명 from 경로 

function App() {

  let [ shoes, shoes변경 ] = useState(Data);
  let [ 재고, 재고변경 ] = useState([10,11,12]);


  return (
    <div className="App">
      <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="#home">Shoe Shop</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {/* <Nav.Link><Link to="/">Home</Link></Nav.Link>
            <Nav.Link><Link to="/detail">Detail</Link></Nav.Link> */}
            {/* as={}문법 : {}안에 있는 태그명 처럼 이 태그를 사용해주세요랑 비슷한 말 */}
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/detail/0">Detail</Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
      </Navbar>

    <Switch>
      <Route exact path="/">
        <Jumbotron className="background">
          <h1>20% Season Off!</h1>
          <p>
            This is a simple hero unit, a simple jumbotron-style component for calling
            extra attention to featured content or information.
          </p>
          <p>
            <Button variant="primary">Learn more</Button>
          </p>
        </Jumbotron>
        <div className="container">
          <div className="row">
            {
              shoes.map(function(a, i){
                return (
                  <Card shoes={shoes[i]} i={i}></Card>
                )
              })
            }
          </div>
          <button className="btn btn-primary" onClick={()=>{
            //서버에게 get요청을 하는 코드
            //더보기 버튼 누르면 axios.get(데이터요청할 URL) 
            //그러면 서버가 새로고침 없이 데이터 가져온다. 
            //성공하면 .then()
            //실패하면 .catch()실행
            //ajax로 가져온 자료 출력하는 법 
            //.then((가져온자료)=>{가져온자료출력, 또는 어쩌구})
            // post요청 할 경우 axios.post('서버URL', { id : 'codingapple', pw: 1234})
            axios.get('https://codingapple1.github.io/shop/data2.json')
            .then((result)=>{   
              shoes변경([...shoes, ...result.data]);  //...은 대괄호를 벗겨주세요란 뜻
              //즉 [...shose]는 shoes의 복사본인것
              //그럼 ...result.data또한 벗겨저 다시 대괄호 넣은 것.
              //즉 위에 []안에 있는 애들은 shoes와 result.data가 merge된 상태라고 보면 된다. 
            })
            .catch(()=>{console.log('실패했어요')})
          
          }}>더보기</button>
        </div>
      </Route>

      {/* Detail 컴포넌트 모듈화 */}
      {/* path에 /:이 땡땡 표시는 뭘 적든간에 이곳으로 안내해라라는 것. 
      여기서 'id'는 URL 파라미터로, 변수명 처럼 자유롭게 암거나 적어도 된다. 
      예를 들어 /detail/:id:/id2 이런식도 가능하다.  */}
      <Route path="/detail/:id">
        <Detail shoes={shoes} 재고={재고} 재고변경={재고변경}/>
      </Route>
      {/* <Route path="/어쩌구" component={Modal}></Route> */}
      {/* 위처럼 써도 됨. 한줄에 가능 */}

      {/* /:id 라는 경로는 /뒤에 어떠한 문자열이 온다 라는 뜻. 즉 암거나 적으면 /:id인것. */}
      <Route path="/:id">
        <div>아무거나 적었을 때 이거 보여주세요</div>
      </Route>
    </Switch>
          


    </div>
  );
}

function Card(props){
  return(
    <div className="col-md 4">
      <img src={'https://codingapple1.github.io/shop/shoes' + (props.i+1) + '.jpg'} width="100%"></img>
      <h4>{ props.shoes.title }</h4>
      <p>{ props.shoes.content } & {props.shoes.price}</p>
    </div>
  )
}


export default App;
