import axios from "axios";
export async function signIn(form, onResolve, onReject) {
    try {
        const res = await axios.post(process.env.AUTH_API_ENDPOINT, {
                ...form,
                action: 'signin'});
        if (res.status === 200) onResolve(res);
        else onReject(res);           
    }
    catch (err) {
        onReject(err);
    }
}

export async function signUp(form, onResolve, onReject) {
    try { const res = await axios.post(process.env.AUTH_API_ENDPOINT, {
                ...form,
                action: 'signup'});
        if (res.status === 200) onResolve(res);
        else onReject(res);           
    }
    catch (err) {
        onReject(err);
    }
}

export function isSignedIn() {
    return localStorage.getItem('token') != null;
}

export function logout() {
    localStorage.removeItem('token');
}