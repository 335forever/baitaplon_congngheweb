export function setColor(state, action) {
    state.color = action.payload;
}

export function setSize(state, action) {
    state.size = action.payload;
}

export function decreaseCount(state) {
    if (state.count > 1) state.count--;
}

export function increaseCount(state) {
    state.count++;
}

export function setCount(state, action) {
    state.count = action.payload;
    if (state.count < 0) state.count = 0;
}

export function toggleWishlist(state) {
    state.isInWishlist = !(state.isInWishlist || false);
}

export function setWishlist(state, action) {
    state.isInWishlist = action.payload;
}