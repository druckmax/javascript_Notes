// const ordersSet = new Set([1, 2, 5, 1, 2 ,5])
// const ordersSet02 = new Set('maximilian')

// console.log(ordersSet02);


// function capitalizeName(name) {
//     const words = name.split(' ');
//     const nameUpper = [];

//     for(const word of words) {
//         // nameUpper.push(word[0].toUpperCase() + word.slice(1));

//         nameUpper.push(word.replace(word[0], word[0].toUpperCase()));
//     }
//     console.log(nameUpper.join(' '));
// }

// capitalizeName('jessica ann smith davis');

// console.log('Go to gate 23!'.padStart(25, '+')); 


// function maskCreditCard(number) {
//     const str = number + '';
//     const last = str.slice(-4);
//     return last.padStart(str.length, '*')
// }

// console.log(maskCreditCard(12345678));

// setInterval(function() {
//     const now = new Date();
//     console.log(`${now.getHours()} : ${`${now.getMinutes()}`.padStart(2, '0')} : ${`${now.getSeconds()}`.padStart(2, '0')}` );
// }, 1000);