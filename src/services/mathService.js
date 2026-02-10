/**
 * Generate Fibonacci series
 * @param {number} n - Number of terms
 * @returns {Array<number>} Fibonacci series array
 */
const generateFibonacci = (n) => {
    if (n <= 0) return [];
    if (n === 1) return [0];
    if (n === 2) return [0, 1];

    const fibonacci = [0, 1];
    for (let i = 2; i < n; i++) {
        fibonacci.push(fibonacci[i - 1] + fibonacci[i - 2]);
    }
    return fibonacci;
};

/**
 * Check if a number is prime
 * @param {number} num - Number to check
 * @returns {boolean} True if prime, false otherwise
 */
const isPrime = (num) => {
    if (num <= 1) return false;
    if (num <= 3) return true;
    if (num % 2 === 0 || num % 3 === 0) return false;

    for (let i = 5; i * i <= num; i += 6) {
        if (num % i === 0 || num % (i + 2) === 0) return false;
    }
    return true;
};

/**
 * Filter prime numbers from array
 * @param {Array<number>} numbers - Array of integers
 * @returns {Array<number>} Array containing only prime numbers
 */
const filterPrimes = (numbers) => {
    return numbers.filter(num => isPrime(num));
};

/**
 * Calculate GCD of two numbers
 * @param {number} a - First number
 * @param {number} b - Second number
 * @returns {number} GCD of a and b
 */
const gcd = (a, b) => {
    a = Math.abs(a);
    b = Math.abs(b);
    while (b !== 0) {
        const temp = b;
        b = a % b;
        a = temp;
    }
    return a;
};

/**
 * Calculate LCM of two numbers
 * @param {number} a - First number
 * @param {number} b - Second number
 * @returns {number} LCM of a and b
 */
const lcm = (a, b) => {
    if (a === 0 || b === 0) return 0;
    return Math.abs(a * b) / gcd(a, b);
};

/**
 * Calculate HCF (GCD) of array of numbers
 * @param {Array<number>} numbers - Array of integers
 * @returns {number} HCF of all numbers
 */
const calculateHCF = (numbers) => {
    if (numbers.length === 0) throw new Error('Array cannot be empty');
    if (numbers.length === 1) return Math.abs(numbers[0]);

    return numbers.reduce((result, num) => gcd(result, num));
};

/**
 * Calculate LCM of array of numbers
 * @param {Array<number>} numbers - Array of integers
 * @returns {number} LCM of all numbers
 */
const calculateLCM = (numbers) => {
    if (numbers.length === 0) throw new Error('Array cannot be empty');
    if (numbers.length === 1) return Math.abs(numbers[0]);

    return numbers.reduce((result, num) => lcm(result, num));
};

module.exports = {
    generateFibonacci,
    filterPrimes,
    calculateHCF,
    calculateLCM
};
