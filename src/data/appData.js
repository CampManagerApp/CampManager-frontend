export class LocalStorageManager {

    static register_new_item(key, value) {
        localStorage.setItem(key, value)
    }
    
    static  get_item(key, value) {
        localStorage.get(key)
    }
    
    static remove_item(key) {
        localStorage.removeItem(key)
    }
}