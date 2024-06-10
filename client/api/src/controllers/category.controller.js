import axios, { AxiosError } from "axios";

const instance = axios.create({
  // baseURL: `https://54.255.209.5/product`,
  baseURL: `${process.env.SERVER_API_ENDPOINT}/product`,
  timeout: 3000,
});

// const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJhZ25pZSIsImlhdCI6MTcxODA1NTY2MiwiZXhwIjoxNzE4MDY2NDYyfQ.P84STqCw3D-vvVNoXWAZgF1kFn3u_7asG9Vi4k7cgJM';

export async function getCategories() {
  const response = await instance.get("/get/categories");
  if (response.status === 200) {
    return response.data['categories'];
  }
  else throw new AxiosError(response.data.message, response.data.status);
}

export async function findProduct({ categoryId, shopId, name, productId }) {
  try {
    const res = await instance.get("/find", {
      params: {
        categoryId,
        shopId,
        name,
        productId,
      },
    });
    if (res.status == 200) {
      return res.data['products'] || res.data.product;
    }
    else return [];
  } catch (err) {
    if (err.response.status == 404) {
      return [];
    } else throw err
  }
}

export async function addProduct(form, onReject, onResolve) {
  try {
    const res = await instance.post("/add", form, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    if (res.status == 201) onResolve(res);
    else onReject(res);
  } catch (err) {
    onReject(err);
  }
}

export async function updateProduct(form, onReject, onResolve) {
  console.log(form)
  try {
    const res = await instance.put("/update", form, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    if (res.status == 200) onResolve(res);
    else onReject(res);
  } catch (err) {
    onReject(err);
  }
}

export async function removeProduct(productId, onReject, onResolve) {
  try {
    console.log({ productId })
    const res = await instance.delete(
      "/remove",
      {
        headers: {
          // Authorization: "Bearer " + token,
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        data: {
          productId: productId
        }
      },
    );
    if (res.status == 200) onResolve(res);
    else onReject(res);
  } catch (err) {
    onReject(err);
  }
}

export async function uploadImages(images, onReject, onResolve) {
  try {
    const res = await axios.post(
      `https://ducquan.id.vn/congngheweb/santhuongmai/uploadimages.php`,
      images,
      {
        headers: {
          "Content-Type": "multipart/form-data"
        },
      }
    );
    if (res.status === 200) { onResolve(res); }
    else onReject(res);
  } catch (err) {
    onReject(err);
  }
}
