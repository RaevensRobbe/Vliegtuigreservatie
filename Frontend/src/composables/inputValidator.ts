//Login validator
export const requiredValidator = (input:string) => {
    if(input === undefined || input.trim() === ''){
        return true
    }
}

export const emailValidator = (input:string) => {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const test = re.test(input)
    console.log(test)
    return test
}

export const confirmValidator = (pw1:string, pw2:string) => {
    if(pw1 === pw2){
        return true
    }
}

export const strenghtValidator = (pw:string) => {
    const commonPatterns = (pw:string) => {
        const  commonPasswordPatterns = /passw.*|12345.*|09876.*|qwert.*|asdfg.*|zxcvb.*|footb.*|baseb.*|drago.*/;
        const test = commonPasswordPatterns.test(pw)
        return test
    }

    const checkPasswordStrenght = (pw:string) => {

        let numberOfElements = 0;
        numberOfElements = /.*[a-z].*/.test(pw) ? ++numberOfElements : numberOfElements;      // Lowercase letters
        numberOfElements = /.*[A-Z].*/.test(pw) ? ++numberOfElements : numberOfElements;      // Uppercase letters
        numberOfElements = /.*[0-9].*/.test(pw) ? ++numberOfElements : numberOfElements;      // Numbers
        numberOfElements = /[^a-zA-Z0-9]/.test(pw) ? ++numberOfElements : numberOfElements;   // Special characters (inc. space)

        // Check then strenth of this password using some simple rules
        if (numberOfElements === 0 || numberOfElements === 1 || numberOfElements === 2 || numberOfElements === 4){
            return true
        }
        
    }

    if(pw.length <= 5){
        return 1
    }else if (commonPatterns(pw)){
        return 2
    }else if (checkPasswordStrenght(pw)){
        return 3
    }
}

// Flight search validator