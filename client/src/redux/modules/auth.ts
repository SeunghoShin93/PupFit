import { createAction, handleActions } from "redux-actions"
import { pender } from "redux-pender"
import * as API from "../../lib/api"
import { Map } from "immutable"

const CHANGE_INPUT = "auth/CHANGE_INPUT"
const INITIALIZE_FORM = "auth/INITIALIZE_FORM"
const CHECK_EMAIL_EXISTS = "auth/CHECK_EMAIL_EXISTS"
const CHECK_USERNAME_EXISTS = "auth/CHECK_USERNAME_EXISTS"
const SET_ERROR = "auth/SET_ERROR"
const LOCAL_REGISTER = "auth/LOCAL_REGISTER"
const LOCAL_LOGIN = "auth/LOCAL_LOGIN"

export const changeInput = createAction(CHANGE_INPUT)
export const initializeForm = createAction(INITIALIZE_FORM)
export const checkEmailExists = createAction(
  CHECK_EMAIL_EXISTS,
  API.checkEmailExists
)
export const checkUsernameExists = createAction(
  CHECK_USERNAME_EXISTS,
  API.checkUsernameExists
)
export const setError = createAction(SET_ERROR)
export const localRegister = createAction(LOCAL_REGISTER, API.localRegister)
export const localLogin = createAction(LOCAL_LOGIN, API.localLogin)

const initialState = Map({
  register: Map({
    form: Map({
      email: "",
      username: "",
      password: "",
      passwordConfirm: "",
    }),
    exists: Map({
      email: false,
      password: false,
    }),
    error: null,
  }),
  login: Map({
    form: Map({
      email: "",
      password: "",
    }),
    error: null,
  }),
  result: Map({}),
})

export default handleActions(
  {
    [CHANGE_INPUT]: (state = initialState, action) => {
      const { form, name, value } = action.payload
      return state.setIn([form, "form", name], value)
    },
    ...pender({
      type: CHECK_EMAIL_EXISTS,
      onSuccess: (state = initialState, action) =>
        state.setIn(
          ["register", "exists", "email"],
          action.payload.data.exists
        ),
    }),
    [INITIALIZE_FORM]: (state = initialState, action) => {
      const initialForm = initialState.get(action.payload)
      return state.set(action.payload, initialForm)
    },
    ...pender({
      type: CHECK_USERNAME_EXISTS,
      onSuccess: (state: Map<any, any>, action) =>
        state.setIn(
          ["register", "exists", "username"],
          action.payload.data.exists
        ),
    }),
    [SET_ERROR]: (state = initialState, action) => {
      const { form, message } = action.payload
      return state.setIn([form, "error"], message)
    },
    ...pender({
      type: LOCAL_LOGIN,
      onSuccess: (state = initialState, action) =>
        state.set("result", Map(action.payload.data)),
    }),
    ...pender({
      type: LOCAL_REGISTER,
      onSuccess: (state = initialState, action) =>
        state.set("result", Map(action.payload.data)),
    }),
  },
  initialState
)
