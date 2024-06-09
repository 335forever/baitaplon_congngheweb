export default class Category {
    constructor(name, sub) {
        this.name = name;
        this.sub = sub ?? [];
    }

    get getLink() {
        return `/category?name=${encodeURIComponent(this.name)}`
    }
}

