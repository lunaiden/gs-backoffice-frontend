export const isEmail = (email: string) => {
    const emailRegex = new RegExp(/^[ ]*([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})[ ]*$/, "gm");

    return emailRegex.test(email);
}