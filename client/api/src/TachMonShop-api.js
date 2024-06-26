// Anything exported from this file is importable by other in-browser modules.
export {
    signIn,
    signUp,
    isSignedIn,
    logout,
    getUserInfo,
    getShopInfo,
    updateShop,
    changePassword,
    update as updateUser,
    upToShop,
    findShop,
    findShopInfo,
    findUser
} from "./controllers/account.controller";
export { getSearchSuggestions } from "./controllers/search.controller";
export {
    getCategories,
    findProduct,
    addProduct,
    updateProduct,
    removeProduct,
    uploadImages
} from "./controllers/category.controller";
export {
    addProductToCart,
    getCart,
    updateCart
} from "./controllers/cart.controller";
export {
    getVouchers,
    createVoucher,
    deleteVoucher,
    updateVoucher
} from "./controllers/voucher.controller";
export {
    getIncome,
    getOrderNumber,
    getCustomerNumber
} from "./controllers/statistics.controller";
export {
    getAllCategory
} from "./controllers/manage_products.controller";

export {
    createOrder,
    getOrders,
    manageOrders,
    approveOrders
} from "./controllers/order.controller";
