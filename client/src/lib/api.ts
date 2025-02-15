import axios from "axios"

const BASE_URL = "http://i02b208.p.ssafy.io:8000"
// axios.interceptors.request.use(
//   function (config) {
//     console.log(config)
//     return config
//   },
//   function (error) {
//     return Promise.reject(error)
//   }
// )
export const checkEmailExists = (email) =>
  axios.get(`${BASE_URL}/accounts/exists/email/` + email + "/")
export const checkUsernameExists = (username) =>
  axios.get("/exists/username/" + username)

export const localRegister = ({ email, username, password }) =>
  axios.post(`${BASE_URL}/accounts/user/`, { email, username, password })
export const localLogin = ({ email, password }) =>
  axios.post(`${BASE_URL}/accounts/login/`, { email, password })

export const checkStatus = () => 0
export const logout = () => 0

// perfume
export const getPerfumes = (q) =>
  axios.get(`${BASE_URL}/perfumes/`, {
    params: {
      page: q.page,
      sort: q.sort,
      category: q.category,
      gender: q.gender,
      include: q.include,
      exclude: q.exclude,
      brand: q.brand,
    },
  })
export const getPerfumeDetail = (id: number) =>
  axios.get(`${BASE_URL}/perfumes/${id}`)

export const getSearch = (keywords: string) =>
  axios.get(`${BASE_URL}/search/?keywords=${keywords}`)

// review
export const postReview = (
  content: string,
  rate: number,
  id: number,
  token: string
) =>
  axios.post(
    `${BASE_URL}/perfumes/${id}/reviews/`,
    { content: content, rate: rate },
    { headers: { token: token } }
  )

export const getRand = () =>
  axios.get(`${BASE_URL}/perfumes/famous?gender=2&sample=1`)


// weather 
export const getCurrentWeather = (lat:number,lon:number,key:string) => axios.get(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}`)