// 1. 액션 타입 정하기
//  - 우리한테 필요한 액션이 뭐뭐 있을까요?
//  - 어딘가에서 값을 가져다가 넣는 거(나중에 파이어스토어에서 가져오겠죠!), 
//    일정 만들기, 수정하기(완료도 수정에 포함인거 아시죠!), 삭제하기, 완료일정보기 true, false 바꾸는 거,
//    앗! 이전, 다음 달을 움직이기 위해서 기준일을 바꿔주는 것도 있어야겠네요!
// const LOAD = "todo/LOAD";

// 2. 액션 생성자 만들기
//  - 액션을 반환할 액션 생성자를 만들어줘요.
//  - 액션을 하기 위해(뭔가 바꾸기 위해) 필요한 데이터가 뭔지 잘 생각해서 파라미터를 받아옵시다! :)
// export const loadTodo = (todo_list) => {
//     return {type: LOAD, todo_list}
// }

// 3. 기본 값 정해주기
const initialState = {
// 여기에 기본 값을 넣어주세요! 뭐뭐가 필요한 지 곰곰히 생각해보세요.
};


// +) 5. 파이어스토어 연결하기! 미들웨어 thunk를 쓸거예요!
//     - 데이터를 받아오고, 수정도 하고 생성도 하고..! 화이팅!


// 4. 리듀서 만들기
//  - 이제 액션 별로 해야할 것(수정하고, 생성하고, ...)을 합시다!
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    
    // 액션 별로 처리할 내용 넣기!
    // case "todo/~~~":
    //     return state;
    default:
      return state;
  }
}