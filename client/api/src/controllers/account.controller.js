import axios from "axios";
const instance = axios.create({
  baseURL: `http://54.255.209.5/auth`,
  timeout: 3000,
});
export async function signIn(form, onResolve, onReject) {
  console.log(form);
  try {
    const res = await instance.post('/login', {
      ...form,
      action: "signin",
    });
    if (res.status === 200) onResolve(res);
    else onReject(res);
  } catch (err) {
    onReject(err);
  }
}

export async function signUp(form, onResolve, onReject) {
  try {
    const res = await instance.post('/signup', {
      ...form,
      action: "signup",
    });
    if (res.status === 201) onResolve(res);
    else onReject(res);
  } catch (err) {
    onReject(err);
  }
}

export async function getUserInfo() {
  const res = await instance.get("/getuserinfo", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  if (res.status === 200) return res.data.userInfo;
  else throw res;

}

export async function update(form, onResolve, onReject) {
  try {
    const res = await instance.put("/update", form, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    if (res.status == 200) onResolve(res);
    else onReject(res);
  } catch (err) {
    onReject(err);
  }
}

export function isSignedIn() {
  const result = localStorage.getItem("token")?.length > 0 || false;
  return result;
}

export function logout() {
  localStorage.removeItem("token");
}
