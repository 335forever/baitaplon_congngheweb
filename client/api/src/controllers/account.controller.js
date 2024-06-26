import axios from "axios";
const instance = axios.create({
  // baseURL: `https://54.255.209.5/auth`,
  baseURL: `${process.env.SERVER_API_ENDPOINT}/auth`,
  timeout: 3000,
});

// const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJhZ25pZSIsImlhdCI6MTcxODA3MzExNCwiZXhwIjoxNzE4MDgzOTE0fQ.iUZygtZiTIR4_R3joTntN9CpXS8JxD6nRl_bUbNVa4s';

export async function signIn(form, onResolve, onReject) {
  try {
    const res = await instance.post('/login', {
      ...form,
      action: "signin",
    });
    if (res.status === 200) {
      onResolve(res);
      try {
        const info = await getUserInfo();
        if (info.isShoper) localStorage.setItem('isShoper', 't');
      }
      finally {

      }
    }
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
  const res = await instance.get("/user/getinfo", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      // Authorization: `Bearer ${token}`,
    },
  });
  if (res.status === 200) return res.data.userInfo;
  else throw res;

}

export async function getShopInfo(onReject) {
  try {
    const res = await instance.get("/shop/getinfo", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
        // Authorization: `Bearer ${token}`
      }
    })

    if (res.status === 200) return res.data.shopInfo[0];
  } catch (error) {
    console.log(error)
  }
}

export async function update(form, onResolve, onReject) {
  try {
    const res = await instance.put("/user/update", form, {
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
  localStorage.removeItem("isShoper");
}

export async function upToShop(form, onResolve, onReject) {
  try {
    const res = await instance.put("/user/uptoshop", form, {
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

export async function updateShop(form, onResolve, onReject) {
  try {
    const res = await instance.put("/shop/update", form, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (res.status == 200) onResolve(res);
    else onReject(res);
  } catch (error) {
    onReject(err);
  }
}

export async function changePassword(form, onResolve, onReject) {
  try {
    const res = await instance.put("/changepassword", form, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })

    if (res.status == 200) onResolve(res);
    else onReject(res);
  } catch (error) {
    onReject(error);
  }
}

export async function findShop(form, onResolve, onReject) {
  try {
    const res = await instance.get("/findshop", {
      params: form
    }, {
      headers: {
        "Content-Type": "application/json"
      },
    })

    if (res.status == 200) onResolve(res.data.shop);
    else onReject(res);
  } catch (error) {
    onReject(error);
  }
}

export async function findUser(form, onResolve, onReject) {
  try {
    const res = await instance.get("/finduser", form, {
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (res.status == 200) onResolve(res);
    else onReject(res);
  } catch (error) {
    onReject(error);
  }
}

export async function uploadImages(images, onReject, onResolve) {
  try {
    const res = await axios.post(
      `https://ducquan.id.vn/congngheweb/santhuongmai/uploadimages.php`,
      images,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    if (res.status == 200) onResolve(res);
    else onReject(res);
  } catch (err) {
    onReject(err);
  }
}

export async function findShopInfo({ shopId }) {
  const res = await instance.get("/findshop", {
    params: {
      shopId
    },
  });
  if (res.status == 200) {
    return res.data.shop[0];
  }
  else throw res;
}