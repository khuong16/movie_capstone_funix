
/**
 * 
 * @param {string} nameStorage  : string
 * @param {*} value : any
 * @returns 
 */
export const setLocaleStorage = (nameStorage = "", value) => {
    let valueJSON = JSON.stringify(value);
    localStorage.setItem(nameStorage, valueJSON);
    let result = getLocaleStorage(nameStorage) ? true : false;
    return result;
}

/**
 * @param {*} nameStorage: string
 * @returns value || null
 */
export const getLocaleStorage = (nameStorage = "") => {
    let value = localStorage.getItem(nameStorage);
    let data = (value != null) ? JSON.parse(value) : false;
    return data;
}
/**
 * 
 * @param {string} date:  (default: "")
 * @param {string} locales:  (default: en-BG)
 * @returns 
 */
export const changeToSortDate = (date = "", locales = "en-GB") => {
    let sortDate;
    if (date != "") {
        let option = { day: '2-digit', month: '2-digit', year: 'numeric' };
        sortDate = new Date(date).toLocaleDateString(locales, option);
    }
    return sortDate;
}