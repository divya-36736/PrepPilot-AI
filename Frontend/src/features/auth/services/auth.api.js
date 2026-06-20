// import axios from "axios";

// // 1. Create the instance. 
// // Pro-tip: Let's include '/api/auth' in the baseURL to save even more typing!


// // 1. Create the instance with the FULL backend URL
// // const api = axios.create({
// //     baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000/api/auth", // Explicitly point to the backend
// //     withCredentials: true // Crucial: Ensures cookies are sent with the request
// // });



// // Pehle base URL decide karo
// const backendUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";

// const api = axios.create({
//     // Ab dono cases mein '/api/auth' zaroor add hoga
//     baseURL: `${backendUrl}/api/auth`, 
//     withCredentials: true 
// });

// export default api;

// // ... the rest of your register, login, logout functions remain exactly the same

// //we can also use the above api for not repeating like that
// // export async function register({username, email, password}){
// //     try{
// //        const response = await (here we put api instead of axios)api.post('http://localhost:3000/api/auth/register',{
// //         username, email, password
//     //    },{
//     //     withCredentials:true //remove this portion bcz we include this also in api
//     //    })

// //        return response.data

// //     }catch(err){
// //         console.log(err);
// //     }

// // }



// export async function register({ username, email, password }) {
//     try {
//         // 2. Just use the endpoint path now
//         const response = await api.post('/register', { username, email, password });
//         return response.data;
//     } catch (err) {
//         console.error("Registration error:", err);
//         throw err; // 3. Re-throw the error so your UI components can catch it!
//     }
// }

// export async function login({ email, password }) {
//     try {
//         const response = await api.post('/login', { email, password });
//         return response.data;
//     } catch (err) {
//         console.error("Login error:", err);
//         throw err;
//     }
// }

// export async function logout() {
//     try {
//         const response = await api.get('/logout');
//         return response.data;
//     } catch (err) {
//         console.error("Logout error:", err);
//         throw err;
//     }
// }

// export async function getMe() {
//     try {
//         const response = await api.get('/get-me');
//         return response.data;
//     } catch (err) {
//         console.error("GetMe error:", err);
//         throw err; 
//     }
// }


import axios from "axios";

// 1. Base URL aur Axios Instance set kiya
const backendUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";

const api = axios.create({
    baseURL: `${backendUrl}/api/auth`, 
    withCredentials: true 
});

export default api;

// ====================================================================
// 🛠 HELPER FUNCTION: Error message nikalne ke liye
// Yeh function backend se bheja gaya exact error message nikalega
// ====================================================================
const getErrorMessage = (err) => {
    // Agar backend ne specific error bheja hai (jaise res.status(400).json({message: "..."}))
    if (err.response && err.response.data && err.response.data.message) {
        return err.response.data.message;
    }
    // Agar server completely down hai ya internet nahi hai
    return err.message || "Something went wrong. Please try again.";
};


// ====================================================================
// 🚀 API CALLS
// ====================================================================

export async function register({ username, email, password }) {
    try {
        const response = await api.post('/register', { username, email, password });
        return response.data;
    } catch (err) {
        const exactError = getErrorMessage(err);
        console.error("Registration error:", exactError);
        
        // Error ko wapas React component ko bhej rahe hain taaki wahan alert/toast dikha sakein
        throw new Error(exactError); 
    }
}

export async function login({ email, password }) {
    try {
        const response = await api.post('/login', { email, password });
        return response.data;
    } catch (err) {
        const exactError = getErrorMessage(err);
        console.error("Login error:", exactError);
        throw new Error(exactError);
    }
}

export async function logout() {
    try {
        const response = await api.get('/logout');
        return response.data;
    } catch (err) {
        const exactError = getErrorMessage(err);
        console.error("Logout error:", exactError);
        throw new Error(exactError);
    }
}

export async function getMe() {
    try {
        const response = await api.get('/get-me');
        return response.data;
    } catch (err) {
        const exactError = getErrorMessage(err);
        // getMe usually background me chalta hai, isliye iska console.error chupa sakte hain
        // console.error("GetMe error:", exactError); 
        throw new Error(exactError); 
    }
}

