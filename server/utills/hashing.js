import bcrypt from 'bcryptjs'
import crypto from "crypto"

export const doHash =  (value, saltValue) => {
    const result=  bcrypt.hash(value, saltValue);
    return result
};

export const dohashValidation= (value, HashedValue)=>{
    const result = bcrypt.compare(value,HashedValue)
    return result
}

export const hmacProcess = (value, key) => {
    return crypto.createHmac("sha256", key).update(value).digest("hex");
};

