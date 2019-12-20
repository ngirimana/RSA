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
    const cipherText = []
    for (let i = 0; i < plainText.length; i++) {
        cipherText.push(Math.pow(plainText.charCodeAt(i), key) % n); //chaging  every letter into number
    }
    return cipherText; //return cipher  text
}

//decrypt
const decrypt = (key, n, cipherText) => {
    const plainText = [];
    for (let i = 0; i < cipherText.length; i++) {
        plainText.push(String.fromCharCode(bigInt(cipherText[i]).modPow(key, n))); //decryptig every number to corresponding letters
    }
    return plainText
}

//main  function
const mainFun = (event) => {
    event.preventDefault(); //preeting auto-refresh
    const pValue = document.querySelector('#p'); //   variable to hold  value of p from input box
    const qValue = document.querySelector('#q'); //   variable to hold  value of q from input box
    const message = document.querySelector('#msg'); //   variable to hold  value of message  from input box
    const error = document.querySelector('#error'); //   variable to hold  value of error  from headig 3
    const p = pValue.value; //   value of p
    const q = qValue.value; // value of  q

    /*checking if  p  ,q   and  message input box   are empty */
    if (parseInt(p) === '' || parseInt(q) === '' || message.value === '') {
        error.innerHTML = 'Fill the  form above'; //setting text to error  heading
    }
    //checking  if  q and   p are  prime
    else if (!isPrime(parseInt(p)) || !isPrime(parseInt(q))) {
        error.innerHTML = 'Wrong input provided, Enter a number divisable by 1 and itself'; //setting text to error  heading
    } else {
        error.innerHTML = ""; //setting  error  heading to empty
        const n = parseInt(p) * parseInt(q); // calculating n
        const qN = (p - 1) * (q - 1); //calculating  Q(n)
        document.querySelector('#n').innerHTML = `Value of n: ${n}`; //displaying  n
        document.querySelector('#qn').innerHTML = `Value of qN: ${qN}`; // displaying Q(n)
        const e = calculateE(qN); //calling  e using  Q(n)
        const d = calculateD(e, qN); // calling    d using  e and Q(n)
        document.querySelector('#e').innerHTML = `Value of e: ${e}`; //displaying  e
        document.querySelector('#d').innerHTML = `Value of d: ${d}`; //displaying  d
        const encryptedMessage = encrypt(e, n, message.value); // calling  encryptmessage function
        const fakeMessage = []; //  declrinng fakeMesage
        for (let i = 0; i < encryptedMessage.length; i++) {
            fakeMessage.push(String.fromCharCode(Math.pow(Math.pow(encryptedMessage[i], 2) / 7, 3))); //encrypt encrypted message
        }
        document.querySelector('#encrypted').innerHTML = `Encryted message: ${fakeMessage}`; // displaying fakeMessage
        const decryptedMessage = decrypt(d, n, encryptedMessage); //calling   decrypting  function
        document.querySelector('#decrypted').innerHTML = `Decrypted message: ${decryptedMessage.join('')}`; //displaying decrypted message
    }
}

// clear data i  input  field
const reset = () => {
    const pValue = document.querySelector('#p');
    const qValue = document.querySelector('#q');
    const message = document.querySelector('#msg');
    qValue.value = '';
    pValue.value = '';
    message.value = '';
}