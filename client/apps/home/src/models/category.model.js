export default class Category {
    constructor(id, name, sub) {
        this.id = id;
        this.name = name;
        this.sub = sub ?? [];
    }

    get getLink() {
        return `/search?categoryID=${encodeURIComponent(this.id)}`
    }
}