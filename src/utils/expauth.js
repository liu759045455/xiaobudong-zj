const TokenKey = "tokenE";
const UserKey = "userInfoE";
const UserCode = "userInfoCode";
const editor = "editor";


export function getTokenE() {
    return sessionStorage.getItem(TokenKey);
}

export function setTokenE(token) {
    return sessionStorage.setItem(TokenKey, token);
}

export function removeTokenE() {
    return sessionStorage.removeItem(TokenKey);
}

export function getUserE() {
    return sessionStorage.getItem(UserKey);
}

export function setUserE(userInfo) {
    return sessionStorage.setItem(UserKey, userInfo);
}

export function removeUserE() {
    return sessionStorage.removeItem(UserKey);
}


export function getUserCode() {
    return sessionStorage.getItem(UserCode);
}

export function setUserCode(userInfo) {
    return sessionStorage.setItem(UserCode, userInfo);
}

export function removeUserCode() {
    return sessionStorage.removeItem(UserCode);
}

export function getEditor() {
    return sessionStorage.getItem(editor);
}

export function setEditor(type) {
    return sessionStorage.setItem(editor, type);
}

export function removeEditor() {
    return sessionStorage.removeItem(editor);
}
