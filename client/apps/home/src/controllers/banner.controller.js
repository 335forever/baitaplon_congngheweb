

function wait(milliseconds) {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
}

export async function getBanners() {
  await wait(1000)
  return [
    "https://cdn.iphonedoc.vn/thumbs/2%20banner/banner-iphone-15-pro-max-iphonedoc-dat-hang_thumb_720.png",
    "https://i.pinimg.com/originals/ea/bd/aa/eabdaadef69a169117a2900e77bfde9f.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2zYGUrVua8qLJb1PThjSM3sUAnrv5YS2y3r6N-g-rtg&s",
    "https://nanufoods.vn/wp-content/uploads/2021/05/Banner-nho-website-1-1400x497.jpg"
  ];
}
