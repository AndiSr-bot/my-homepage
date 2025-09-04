import CryptoAES from "crypto-js/aes";
import CryptoENC from "crypto-js/enc-utf8";
import CryptoJS from "crypto-js";
import { SECRET_DECRYPT_KEY } from "../helpers/constant";

export const decrypt = (encryptedText) => {
    try {
        const decrypted = CryptoAES.decrypt(
            encryptedText,
            SECRET_DECRYPT_KEY
        ).toString(CryptoENC);
        return decrypted;
    } catch (error) {
        console.log(error);
        return null;
    }
};
export const encrypt = (plaintext) => {
    try {
        const encrypted = CryptoJS.AES.encrypt(
            plaintext,
            SECRET_DECRYPT_KEY
        ).toString();
        return encrypted;
    } catch (error) {
        console.log(error);
        return null;
    }
};

export const authorization = () => {
    try {
        return JSON.parse(
            CryptoAES.decrypt(
                localStorage.authorization,
                SECRET_DECRYPT_KEY
            ).toString(CryptoENC)
        );
    } catch (error) {
        console.log(error);
        return null;
    }
};
