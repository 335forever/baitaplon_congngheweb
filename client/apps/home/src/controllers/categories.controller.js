import Category from "../models/category.model";

function wait(milliseconds) {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
}

export async function getCategories() {
  await wait(1000)
  return [
    new Category("BÙA QUA MÔN, HẾT FA"),
    new Category("Thời trang nữ", [
        new Category("Quần áo nữ"), new Category("Đồ lót nữ"), new Category("Phụ kiện")
      ]),
    new Category("Thời trang nam", [
      new Category("Quần áo nam"), new Category("Đồ lót nam"), new Category("Phụ kiện")
    ]),
    new Category("Điện tử"),
    new Category("Gia dụng"),
    new Category("Dược phẩm"),
    new Category("Đồ thể thao"),
    new Category("Đồ chơi trẻ em"),
    new Category("Thú cưng"),
    new Category("Sức khỏe & làm đẹp"),
    new Category("Học tập", [
      
    ])
    
  ];
}
