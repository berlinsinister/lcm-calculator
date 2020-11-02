let input1 = document.querySelector('#input-1');
let input2 = document.querySelector('#input-2');
let x, y;

input1.addEventListener('input', () => x = parseInt(input1.value));
input2.addEventListener('input', () => y = parseInt(input2.value));

let button = document.querySelector('button');
let span = document.querySelector('span');
button.addEventListener('click', () => {
    let answer;
    if (x && y)
        answer = lcm([x, y]);
    span.innerText = answer;
    input1.value = '';
    input2.value = '';
    x = undefined;
    y = undefined;
});

function lcm(arr) {
    const primes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71];
    arr = arr.sort((a, b) => a - b)
    let row = [];
    let finalPrimes = [];
    let counter = 0;

    // creating a new array from first item to the last including
    for (let i = arr[0]; i <= arr[1]; i++)
        row.push(i);
    let len = row.length;

    // while row is divided by one of the primes
    let primesIndex = 0;
    let temp = [];

    while (onlyOne(row, row.length) == false) {
        for (let j = 0; j < len; j++) {
            if (row[j] % primes[primesIndex] == 0) {
                temp.push(row[j] / primes[primesIndex]);
            } else {
                temp.push(row[j]);
                counter++; // count how many weren't divided by %
            }
        }

        // copying new data in the same row, by first deleting the old one   
        row = [];
        row = temp.slice();
        temp = [];

        if (counter == len)
            primesIndex++;
        else
            finalPrimes.push(primes[primesIndex]);

        counter = 0;

        if (onlyOne(row, row.length))
            break;
    }

    let lcm = finalPrimes.reduce((product, item) => product * item);
    return lcm;
}

function onlyOne(arr, len) {
    let total = arr.reduce((sum, item) => sum + item);
    return total == len;
}