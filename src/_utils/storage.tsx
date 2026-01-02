
export default {
    setItem(key: any, value: any) {
        value = JSON.stringify(value);
        window.localStorage.setItem(key, value)
    },
    getItem(key: any, defaultValue?: any) {
        let value: any = window.localStorage.getItem(key)
        try {
            value = JSON.parse(value);
        } catch (e) { }
        return value || defaultValue
    },
    removeItem(key: any) {
        window.localStorage.removeItem(key)
    },
    clear() {
        window.localStorage.clear()
    }
}
    
    
    
  