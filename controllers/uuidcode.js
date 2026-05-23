const getCode = code => {
    // console.log(code.replace("/r", "-"));
    return code.split("-").join("");
   };
   
   module.exports = getCode;