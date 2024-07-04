import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    signupData: null,
    loading: false,
    token: localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null, //Yeh initialState object,  authentication slice ke initial state ko represent karta hai. Isme ek token key hai jo local storage se token ko retrieve karta hai. Agar token mojud hai toh use JSON.parse() se parse karta hai, nahi toh null rakhta hai.
}


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setToken: (state, value) => {         //Yahaan, "state" ka parameter current state ko represent karta hai, na ki initial state ko. Jab yeh reducer function call hota hai, "state" parameter current state ko represent karega, jo Redux store mein present state hota hai. Ismein initial state ka koi bhi reference nahi hota, sirf current state ka snapshot hota hai.   Jab Redux store initialize hota hai, initial state reducers ko provide kiya jaata hai, lekin jab bhi action dispatch hota hai aur reducer function call hota hai, tab "state" parameter current state ko represent karta hai, jo ki initial state se evolve kar chuka hai, agar koi action pehle execute hua hai aur state modify hua hai.
            //ye "value" parameter user pass kiya he kisi bhi component se jab ye reducer dispatch hoga and  user ka data value ke payload property me store hota he and fir us data ko hum token ke assign kar rahe he

            state.token = value.payload;      //jab function dispatch hota he to user se pass kiya huaa data ko payload kahte he yaha par action.payload bhi ho sakta tha jab value ki jagha action lete parameter me  
        },

        setSignupData(state, value) {
            state.signupData = value.payload;
        },
        
        setLoading(state, value) {
            state.loading = value.payload;
        },
    }

})


export const { setSignupData, setLoading, setToken } = authSlice.actions;       //1. Jab hum apne reducer ko configure store mein pass karte hain aur usko useDispatch hook se execute karte hain, tab hum export const {setToken} = authSlice.actions; isliye likhte hain taaki hum components mein action creators ko asani se access kar sakein.
//2.Is tareeke se, hum apne components mein import { setToken } from 'authSlice'; likh kar action ko import kar sakte hain aur dispatch(setToken(payload)); ke roop mein istemal kar sakte hain. Yah humare code ko sadev organised rakhta hai aur redundant code ko kam karta hai.
//3 example ke ruup me hum kuch bhi agar npm se download karte he to hmme use function ko use karne ke liye component me import karna padta he chahe bhale hi hum use download kar diye ho ussi trah yaha bhi agar humko kisi bhi slice ka function ko use karna he to use component me import karna hoga  isliye hum isko yaha par export kar rahe he aise export const {setToken} = authSlice.actions


export default authSlice.reducer;               //export default authSlice.reducer; ka istemal karte hain, toh aap slice ka hi reducer ko export kar rahe hain jo Redux store mein state ke changes ko handle karta hai.
//1. Reducer ko Pass karna: Hum configureStore function ke andar slice ke reducer ko pass karte hain. Iska ek udaharan aapka diya hua hai: export default authSlice.reducer;. Yeh reducer, Redux store ke liye state ko manage karta hai.
//2. Associated Initial State ko Extract karna: Redux Toolkit, jab hum slice ka reducer ko pass karte hain, toh uss slice ke sath associated initial state ko bhi extract kar leta hai. Yani ki, slice object se initial state ko nikal leta hai.
//3. Redux Store ko Initialize karna: Redux Toolkit, extracted reducer aur initial state ka istemal karke Redux store ko initialize karta hai. Ismein, initial state Redux store ke pehle state ke roop mein istemal hota hai, aur Redux store ke sath juda reducer actions ko handle karta hai aur state ko manage karta hai.
