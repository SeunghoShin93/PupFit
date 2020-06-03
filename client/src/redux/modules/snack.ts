import { handleActions, createAction } from "redux-actions";
import {Map} from 'immutable'

const SET_FEED_COUNT = "snack/SET_FEED_COUNT"; // 헤더 렌더링 여부 설정

export const setFeedCount = createAction(SET_FEED_COUNT);

const initialState = Map({
  feedCount: 0,
  maximumFeedCount: 12,
})
export default handleActions(
  {
    [SET_FEED_COUNT]: (state, action) =>
      state.setIn(['feedCount'], action.payload)
  },
  initialState
);
