export const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return {
            isValid: false,
            message: "Invalid email address format"
        };
    }
    return {isValid: true};
};

export const validateUsername = (username) => {
    if (/^[a-zA-Z0-9]*$/.test(username)) {
        return {
            isValid: false,
            message: "Username must not contain special characters"
        };
    }
    if (username.lenght < 4) {
        return {
            isValid: false,
            message: "Username must have at least 4 characters"
        };
    }
    return {isValid: true};
};

export const validatePassword = (password) => {
    if (password.lenght < 6) {
        return {
            isValid: false,
            message: "Password must have at least 6 characters"
        };
    }
    return {isValid: true};
};
