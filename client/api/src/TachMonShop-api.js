// Anything exported from this file is importable by other in-browser modules.
import {
    signIn,
    signUp,
    isSignedIn,
    logout,
    getUserInfo,
    update as updateUser
} from "./controllers/account.controller";
import { getSearchSuggestions } from "./controllers/search.controller";
import {
    getCategories,
    findProduct,
    addProduct,
    updateProduct,
    removeProduct,
    uploadImages
} from "./controllers/category.controller";
import {
    addProductToCart,
    getCart,
    updateCart
} from "./controllers/cart.controller";
import {
    getVouchers,
    createVoucher,
    deleteVoucher,
    updateVoucher
} from "./controllers/voucher.controller";

export {
    signIn, signUp, isSignedIn, logout,
    getSearchSuggestions,
    getUserInfo, updateUser,
    getCategories,
    findProduct, addProduct, updateProduct, removeProduct, addProductToCart,
    uploadImages,
    getCart, updateCart,
    getVouchers, createVoucher, deleteVoucher, updateVoucher
};
