function toLowerCase(str) {
    let result = '';
    for (let i = 0; i < str.length; i++) {
        const char = str.charAt(i);
        if (char >= 'A' && char <= 'Z') {
            result += String.fromCharCode(char.charCodeAt(0) + 32);
        } else {
            result += char;
        }
    }
    return result;
}

module.exports={toLowerCase};