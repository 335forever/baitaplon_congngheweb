export function setUsername(state, action) {
    state.username = action.payload;
}

export function setPassword(state, action) {
    state.password = action.payload;
}

export function setRetypePassword(state, action) {
    state.retypePassword = action.payload;
}

export function checkPassword(state) {
    state.validPassword = state.password === state.retypePassword;
}

export function setName(state, action) {
    state.name = action.payload;
}

export function setDob(state, action) {
    state.dob = action.payload;
}

export function setPhoneNumber(state, action) {
    state.phoneNumber = action.payload;
}

export function setEmail(state, action) {
    state.email = action.payload;
}

export function setAddress(state, action) {
    state.address = action.payload;
}

export function validate(state) {
    state.nameError = /^\w{6,}$/.test(state.username ?? "") ? null : "Tên đăng nhập phải dài từ 6 ký tự trở lên"
    state.passwordError = (/^.{8,26}/).test(state.password ?? "") ? null : "Mật khẩu dài từ 8 ký tự trở lên"
    checkPassword(state)
    state.retypeError = state.validPassword ? null : "Mật khẩu không khớp"
    state.isValid = !(state.nameError || state.passwordError || state.retypeError)
}