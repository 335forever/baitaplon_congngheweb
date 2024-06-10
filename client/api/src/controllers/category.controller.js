import axios, { AxiosError } from "axios";

const instance = axios.create({
  baseURL: `${process.env.SERVER_API_ENDPOINT}/product`,
  timeout: 3000,
});
export async function getCategories() {
  const response = await instance.get("/get/categories");
  if (response.status === 200) {
    return response.data['categories'];
  }
  else throw new AxiosError(response.data.message, response.data.status);

}

export async function findProduct(
  { categoryId, shopId, name, productId },
) {
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
    else throw res;
  } catch (err) {
    throw err;
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
  try {
    const res = await instance.put("/update", form, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
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
    const res = await instance.delete(
      "/remove",
      { productId },
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
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
      `${process.env.MEDIA_API_ENDPOINT}/uploadimages.php`,
      images,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
    if (res.status == 200) onResolve(res);
    else onReject(res);
  } catch (err) {
    onReject(err);
  }
}
