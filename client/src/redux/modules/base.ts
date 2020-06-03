import { Map } from "immutable";
import { handleActions, createAction } from "redux-actions";

const SET_HEADER_VISIBILITY = "base/SET_HEADER_VISIBILITY"; // 헤더 렌더링 여부 설정

export const setHeaderVisibility = createAction(SET_HEADER_VISIBILITY);
const today = new Date();
const dd = today.getDate() < 10 ? '0' + today.getDate() : today.getDate()
const mm = today.getMonth() + 1 < 10? '0' + (today.getMonth() + 1): today.getMonth(); 
const yyyy = String(today.getFullYear())

const initialState = Map({
  header: Map({
    visible: true,
  }),
  today: [yyyy,mm,dd],
  weatherKey: '0144ffa69b4e046111216cbc03bd23c0'
});

export default handleActions(
  {
    [SET_HEADER_VISIBILITY]: (state, action) =>
      state.setIn(["header", "visible"], action.payload),
  },
  initialState
);
