
export const passwordCheck = (pass1: String,pass2: String) => {
    let result: boolean = false;

    if(pass1 === pass2) {
        result = true;
    }

    return result;
};