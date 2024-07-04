import {combineReducers} from "@reduxjs/toolkit";
import authReducer from '../slices/authSlice'
import profileReducer from '../slices/profileSlice'
import cartReducer from '../slices/cartSlice'
import courseReducer from '../slices/courseSlice' 
import viewCourseReducer from '../slices/viewCourseSlice'

const rootReducer = combineReducers({       // Yeh code Redux mein multiple reducers ko ek sath combine karne ke liye kiya jata hai. Jab aapki application ka size bada hota hai aur aap multiple slices ya multiple parts mein state ko manage karte hain, tab aap multiple reducers ka istemal karte hain.
    auth : authReducer,                     //NOTE:  yaha humlog easyness ke liye pahle sara reducer ya slice dono ek hi chij he ko combine kar rahe he aur bhir usko rootreducer me assign kar rahe he aur bhir store banane ke liye rootreducer ko hi pass kardenge configure store ke parameter me 
    profile: profileReducer,
    cart : cartReducer,
    course: courseReducer,
    viewCourse: viewCourseReducer
})

export default rootReducer;