import Category from "../models/category.model";

export async function getCategories() {
  await Promise.resolve((_resolve) => setTimeout(() => {}, 10000));
  return [
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
    new Category("Học tập")
  ];
}
