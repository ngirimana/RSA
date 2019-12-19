//check prime  number
const isPrime = (prime) => {
    let i, j;
    j = parseInt(Math.sqrt(prime))
    for (i = 2; i <= j; i++) {
        if (prime % i === 0) {
            return false;
        }
    }
    return true;
}


//gcd
const greatestCommonDivisor = (i, t) => {
    while (i > 0) {
        temp = i;
        i = t % i;
        t = temp;
    }
    return t;
}

//  calculate E
const calculateE = (n) => {
    for (let i = 2; i <= n; i++) {
        if (greatestCommonDivisor(i, n) === 1) {
            return i;
            break;
        }
    }
}

// calculate_D
const calculateD = (e, n) => {
    let k = 1;
    let d = 0;
    while (true) {
        k = k + n;
        if (k % e === 0) {
            d = k / e;
            break;
        }
    }
    return d;
}

//encrypt
const encrypt = (key, n, plainText) => {
    let a = 156;
    let b = 53
    let c = 299
    const cipherText = []
    for (let i = 0; i < plainText.length; i++) {
        cipherText.push(Math.pow(plainText.charCodeAt(i), key) % n);
    }
    return cipherText;
}

//decrypt
const decrypt = (key, n, cipherText) => {
    const plainText = [];
    for (let i = 0; i < cipherText.length; i++) {
        plainText.push(String.fromCharCode(bigInt(cipherText[i]).modPow(key, n)));
    }
    return plainText
}

//main  function
const mainFun = (event) => {

    event.preventDefault();
    const pValue = document.querySelector('#p');
    const qValue = document.querySelector('#q');
    const message = document.querySelector('#msg');
    const error = document.querySelector('#error');
    const p = pValue.value;
    const q = qValue.value;
    if (parseInt(p) === '' || parseInt(q) === '' || message.value === '') {
        error.innerHTML = 'Fill the  form above';
    } else if (!isPrime(parseInt(p)) && isPrime(parseInt(q))) {
        error.innerHTML = 'Wrong input provided, Enter a number divisable by 1 and itself';
    } else {
        error.innerHTML = "";
        const n = parseInt(p) * parseInt(q);
        const qN = (p - 1) * (q - 1);
        document.querySelector('#n').innerHTML = `Value of n: ${ n }`;
        document.querySelector('#qn').innerHTML = `Value of qN: ${ qN }`;
        const e = calculateE(qN);
        const d = calculateD(e, qN);
        document.querySelector('#e').innerHTML = `Value of e: ${ e }`;
        document.querySelector('#d').innerHTML = `Value of d: ${ d }`;
        const encryptedMessage = encrypt(e, n, message.value);
        const fakeMessage = [];
        for (let i = 0; i < encryptedMessage.length; i++) {
            fakeMessage.push(String.fromCharCode(Math.pow(encryptedMessage[i], 8)));
        }
        document.querySelector('#encrypted').innerHTML = `Encryted message: ${ fakeMessage.join('') }`;
        const decryptedMessage = decrypt(d, n, encryptedMessage);
        document.querySelector('#decrypted').innerHTML = `Decrypted message: ${ decryptedMessage.join('') }`;
    }
}

const reset = () => {
    const pValue = document.querySelector('#p');
    const qValue = document.querySelector('#q');
    const message = document.querySelector('#msg');
    qValue.value = '';
    pValue.value = '';
    message.value = '';
}