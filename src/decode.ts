import zlibAndGzip from "zlibjs/bin/zlib_and_gzip.min.js";
import utf8 from "utf8"
import rawinflate from "zlibjs/bin/rawinflate.min.js";

const Zlib = zlibAndGzip.Zlib;



export function byteArrayToChars(byteArray){
    if(!byteArray) return "";
    let str = "";

    for(let i = 0; i < byteArray.length;) {
        str += String.fromCharCode(byteArray[i++]);
    }
    return str;
}

export function byteArrayToUtf8(byteArray){
    const str = byteArrayToChars(byteArray);
    try{
        const utf8Str = utf8.decode(str);
        return utf8Str;
    }catch(err){
        return str;
    }
}

export function fromBase64(data, alphabet="A-Za-z0-9+/=", returnType="string", removeNonAlphChars=true){
    if(!data) return returnType === "string" ? "" : [];

    alphabet = alphabet || "A-Za-z0-9+/=";
    const output = [];
    let chr1, chr2, chr3,
        enc1, enc2, enc3, enc4,
        i = 0;
    
        if(removeNonAlphChars) {
            const re = new RegExp("[^" + alphabet.replace(/[[\]\\\-^$]/g, "\\$&") + "]", "g");
            data = data.replace(re, "");
        }

        while(i < data.length) {
            enc1 = alphabet.indexOf(data.charAt(i++));
            enc2 = alphabet.indexOf(data.charAt(i++) || "=");
            enc3 = alphabet.indexOf(data.charAt(i++) || "=");
            enc4 = alphabet.indexOf(data.charAt(i++) || "=");

            enc2 = enc2 === -1 ? 64 : enc2;
            enc3 = enc3 === -1 ? 64 : enc3;
            enc4 = enc4 === -1 ? 64 : enc4;

            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;

            output.push(chr1);

            if (enc3 !== 64) {
                output.push(chr2);
            }
            if (enc4 !== 64) {
                output.push(chr3);
            }
        }

        return returnType === "string" ? byteArrayToChars(output) : output;
    
}

export const decode = (input:string) => {

    var rawData = fromBase64(input);
    return rawData;
    /*const inflate = new Zlib.RawInflate(new Uint8Array(rawData), {
        index: 0,
        bufferSize: 0,
        bufferType: Zlib.RawInflate.BufferType.ADAPTIVE,
        resize: false,
        verify: false
    }),
    result = new Uint8Array(inflate.decompress());


    return result.buffer;*/

    
}