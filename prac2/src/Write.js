import React from "react";
import { Grid, Button, Text, Input } from "./Styles";
import moment from "moment";
import styled from "styled-components";

const Write = (props) => {
    // 작성할 내용과 시간을 ref로 넣을거예요. :) 
    const contents = React.useRef(null);
    const datetime = React.useRef(null);

    // 일정데이터가 지금은 Main 컴포넌트에 있죠!
    // 아직은 그 데이터를 수정하기가 곤란해요. 
    // 리덕스를 붙이기 전까지는 우리 콘솔로 데이터 형식에 맞게 추가가 잘 되었나만 확인해봐요!
    const writeTodo = () => {
        // 콘솔로 내가 선택한 데이터가 잘 왔나 확인해볼까요? :)
        // console.log(contents.current.value);
        // console.log(datetime.current.value);

        let _new_todo = {
            todo_id: 'dummy_id1111', // 아이디는 나중에 디비에 저장되면, 그때 가져와야죠! 일단 가짜로 둡니다!
            datetime: moment(datetime.current.value).format("YYYY-MM-DD hh:mm:ss"), // 우리 데이터 형식대로 맞춰줍니다.
            contents: contents.current.value,
            completed: false // 지금 만들었으니 당연히 false겠죠!
        }

        console.log(_new_todo);

        // 추가로 하나만 더! 일정을 추가했으면 원래 페이지로 돌아가야죠! replace 사용해봅시다!
        props.history.replace("/");
    }

  return (
    <Grid margin="auto" flex_direction="column" width="80vw" height="80vh">
      <Text type="title">일정 만들기</Text>
      <Grid bg="#ffffff" flex_direction="column" width="80vw" padding="16px" margin="8px auto">
        <Text type="label">- 내용 -</Text>
        <Input type="text" ref={contents} />

        <Text type="label">- 날짜 -</Text>
        <Input type="datetime-local" ref={datetime} />

        <Button onClick={writeTodo}>일정 추가하기</Button>
      </Grid>
    </Grid>
  );
}



export default Write;
