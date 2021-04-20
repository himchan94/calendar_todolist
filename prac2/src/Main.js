import React from "react";
import moment from "moment";

import { useSelector, useDispatch } from "react-redux";

import Calendar from "./Calendar";
import Popup from "./Popup";

import { Button } from "./Styles";

const _todo_list = {
  "2021-03-01": [
    {
      todo_id: 11,
      datetime: "2021-03-01 10:10:00",
      contents: "산책가기1",
      completed: false,
    },
    {
      todo_id: 155555,
      datetime: "2021-03-01 10:15:00",
      contents: "산책가기2",
      completed: true,
    },
  ],
  "2021-03-21": [
    {
      todo_id: 8,
      datetime: "2021-03-21 10:00:00",
      contents: "산책가기3",
      completed: false,
    },
    {
      todo_id: 4,
      datetime: "2021-03-21 10:10:00",
      contents: "산책가기4",
      completed: false,
    },
  ],
};

const Main = (props) => {
  const [today, setToday] = React.useState(moment());
  const [todo_list, setTodoList] = React.useState(_todo_list);
  // is_open 사용해서 팝업을 보였다가 안보이게 해줄거예요 :)
  const [is_open, setIsOpen] = React.useState(false);
  // 이 값에 선택한 일정 정보를 넣어줄거예요.
  // 없을 때는 null로!
  // 앗, 여기서 잠깐! 팝업을 닫을 때 이 값을 어떻게 해줘야할까요?
  // -> 그렇습니다 :) null로 다시 바꿔줘야죠!
  const [selected_todo, setSeletedTodo] = React.useState(null);

  //   완료된 일정만 보기 토글이에요!
  //   이 값은 캘린더에도 전달해줄거예요.
  //   그럼 캘린더가 이 값을 보고 완료된 일정만 보여주자! 앗 아니야, 전체를 보여주자! 결정할 수 있겠죠? :)
  const [show_completed, setShowCompleted] = React.useState(false);

  //   todo를 삭제하는 함수!
  /**
   *
   * @param {*} date 일정이 있는 날짜 / 형식은 꼭 YYYY-MM-DD여야겠죠! (string이여야해요!)
   * @param {*} todo_id 지울 일정의 아이디!
   */
  const deleteTodo = (date, todo_id) => {
    // date와 todo_id를 이용해서 삭제할 일정 찾아서 삭제하기
    // 하나 복사합시다!
    const _new_todo_list = { ...todo_list };

    // 지울 일정이 있는 날짜! 그 날짜에 어떤 일정이 있나 가져옵니다.
    let todos = _new_todo_list[date];

    // 해당 일자 데이터에서 지울 일정을 빼줍니다. (지울거 빼고 나머지만 가져오기)
    todos = todos.filter((t) => {
      // 지울 일정의 todo_id와 todos 안에 있던 값의 todo_id를 비교해요.
      // 만약 두 개가 같으면 지워야하는 것이니, 걸러줘야겠죠!
      // 두 개가 다르면? 그대로 todos에 남아 있어도 되고요.
      return t.todo_id !== todo_id;
    });

    // 이제 새로운 일정 데이터(전체!)를 만들어줄게요.
    const new_todo_list = { ..._new_todo_list, [date]: todos };

    // 새 일정을 state에 넣으면 끝!
    setTodoList(new_todo_list);
  };

  //   todo를 수정하는 함수!
  /**
   *
   * @param {*} date 일정이 있는 날짜 / 형식은 꼭 YYYY-MM-DD여야겠죠! (string이여야해요!)
   * @param {*} todo_id 일정의 id
   * @param {*} todo_data 고칠 내용! 딕셔너리({})로 받아옵니다. (text, completed, date가 고칠 수 있는 정보겠네요!)
   */
  const updateTodo = (date, todo_id, todo_data = {}) => {
    // date와 todo_id를 이용해서 삭제할 일정 찾아서 삭제하기
    // 하나 복사합시다!
    const _new_todo_list = { ...todo_list };

    // 지울 일정이 있는 날짜! 그 날짜에 어떤 일정이 있나 가져옵니다.
    let todos = _new_todo_list[date];

    // 새 전체 일정이 여기 들어갈거예요.
    let new_todo_list = {};
    // 만약 날짜가 달라졌다면? 해당 날짜에서 빼줘야해요! 그리고 새로운 날짜에 넣어줘야합니다. :)
    // 아래 주석을 풀고 콘솔로 날짜가 같은 지, 다른 지 보세요!
    // console.log(date === moment(todo_data.datetime).format("YYYY-MM-DD"));
    if (date === moment(todo_data.datetime).format("YYYY-MM-DD")) {
      // 날짜가 그대로라면?
      // 해당 일자 데이터에서 지울 일정을 고쳐줍니다.
      todos = todos.map((t) => {
        // 지울 일정의 todo_id와 todos 안에 있던 값의 todo_id를 비교해요.
        // 만약 두 개가 같으면 고칠 데이터겠죠! 그럼 이 친구를 새로 받아온 데이터로 덮어씌워야겠다!
        // 두 개가 다르면? 그대로 return해준다!
        if (t.todo_id === todo_id) {
          //   기존 내용에 고칠 내용을 덮어씌워요 :)
          return { ...t, ...todo_data };
        } else {
          return t;
        }
      });

      // 이제 새로운 일정 데이터(전체!)를 만들어줄게요.
      new_todo_list = { ..._new_todo_list, [date]: todos };
    } else {
      // 날짜가 변했다면?
      // 원래 일자에서 빼주고, 바뀐 일자엔 넣어주고!
    //   이번엔 좀 한 번에 써볼게요 :) (상세하게 보고 싶으면 삭제 코드, 추가 코드 참고하기!)
    // 새 일자를 상수에 넣어주고,
    const _new_date = moment(todo_data.datetime).format("YYYY-MM-DD");
    // 해당 일자에 일정이 있었나 확인해요! 있었다면, 원래 배열을 유지하고, 없었다면 빈 배열로!
    const _new_date_todos = _new_todo_list[_new_date]? _new_todo_list[_new_date] : [];
      new_todo_list = {
        ..._new_todo_list,
        [date]: _new_todo_list[date].filter((t) => t.todo_id !== todo_id),
        [_new_date]: [..._new_date_todos, { ...todo_data }],
      };
    }

    // 확인해보자!
    // console.log(new_todo_list);

    // 새 일정을 state에 넣으면 끝!
    setTodoList(new_todo_list);
  };

  console.log(is_open);

  return (
    <React.Fragment>
      <Calendar
        todo_list={todo_list}
        today={today}
        _changeMonth={setToday}
        show_completed={show_completed}
        _showPopup={setIsOpen}
        _setSeletedTodo={setSeletedTodo}
      />
      {is_open && (
        <Popup
          type="todo_detail"
          selected_todo={selected_todo}
          _deleteTodo={deleteTodo}
          _updateTodo={updateTodo}
          _showPopup={setIsOpen}
        />
      )}
      <Button
        float
        right="20px"
        bottom="20px"
        onClick={() => {
          // 버튼을 눌렀을 때 페이지 이동이 잘되나 한 번 봅시다!
          // 잘 된다면 아랫줄은 주석처리!
          // 주석처리해놓고 가짜 데이터를 바로 추가하도록 하는 부분을 넣어서 가짜 데이터도 잘 들어가나 볼거예요.
          // props.history.push('/write');

          // 가짜 데이터 넣는 부분! (이 부분은 리덕스 붙이기 전까지 임시로 쓰는 부분입니다!)
          // 1. 가짜 데이터 맹근다!
          const new_todo_date = "2021-03-25"; // 가짜 데이터를 넣을 날짜
          const new_todo_data = {
            todo_id: new Date().getTime(), // 임시 아이디!
            datetime: "2021-03-25 10:10:00",
            contents: "산책가기5",
            completed: false,
          }; // 가짜 일정 데이터

          // 2. 원본 데이터랑 합친다!
          let new_todo_list = {}; // 여기에 원본 데이터 + 추가할 일정을 넣을 겁니다!

          // Object.keys(todo_list) : todo_list에서 키값만 가져다 배열을 만들거야
          // Object.keys(todo_list).indexOf(new_todo_data) 근데, todo_list 키값 배열에 가짜 데이터 넣을 날짜로 된 키가 있나?
          //   ㄴ있으면 어디있나 인덱스가 나오고, 없으면? -1이 나옵니다.
          // Object.keys(todo_list).indexOf(new_todo_data) !== -1 : todo_list 키값 배열에 가짜 데이터 넣을 날짜 키가 있으면 true, 없으면 false
          if (Object.keys(todo_list).indexOf(new_todo_date) !== -1) {
            //   있으면, 원래 있던 배열이랑 합쳐주자!
            new_todo_list = {
              ...todo_list,
              [new_todo_date]: [...todo_list[new_todo_date], new_todo_data],
            };
          } else {
            // 없으면 그냥 넣어주자!
            new_todo_list = { ...todo_list, [new_todo_date]: [new_todo_data] };
          }

          console.log(new_todo_list);
          // 3. 합친 걸 넣자! (state로 쓸 때는? useState에서 만든 그 칭구로 :)!)
          setTodoList(new_todo_list);
        }}
      >
        추가하기
      </Button>
      <Button
        float
        right="20px"
        bottom="60px"
        onClick={() => {
          //   !를 변수 앞에 붙여주면 무슨 뜻일까요? :) 찾아보기!
          setShowCompleted(!show_completed);
        }}
      >
        {show_completed ? "전체 일정 보기" : "완료된 일정만 보기"}
      </Button>
    </React.Fragment>
  );
};

export default Main;
