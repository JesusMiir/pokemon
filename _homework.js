/*
    Higher-order array method practice:
    The challenge is to pretend that the higher-order array methods do not exist, 
    as was the case in earlier versions of JavaScript. 
    You must define the following methods yourself:

        forEach
        map
        filter
        find
        findIndex
        every
        some

    Check MDN web docs to see what thes methods are supposed to do.

    Test this by runnning
        node _homework
            or
        node --watch _homework
*/

function forEach(arr, callback) {
  for (let i = 0; i < arr.length; i++) {
    callback(arr[i]);
  }
}

function map(arr, callback) {
  let newArr = [];
  for (let i = 0; i < arr.length; i++) {
    newArr.push(callback(arr[i]));
  }
  return newArr;
}

function filter(arr, callback) {
  let newArr = [];
  for (let i = 0; i < arr.length; i++) {
    if (callback(arr[i])) newArr.push(arr[i]);
  }
  return newArr;
}

function find(arr, callback) {
  let value = undefined;
  let i = 0;
  while (value === undefined && i < arr.length) {
    if (callback(arr[i])) value = arr[i];
    i++;
  }
  return value;
}

function findIndex(arr, callback) {
  let index = -1;
  let i = 0;
  while (index === -1 && i < arr.length) {
    if (callback(arr[i])) index = i;
    i++;
  }
  return index;
}

function every(arr, callback) {
  let result = true;
  let i = 0;
  while (result && i < arr.length) {
    result = callback(arr[i]);
    i++;
  }
  return result;
}

function some(arr, callback) {
  let result = false;
  let i = 0;
  while (!result && i < arr.length) {
    result = callback(arr[i]);
    i++;
  }
  return result;
}

// forEach(["apple", "banana", "cherry"], console.log);

// console.log(
//   map([1, 2, 3], function (x) {
//     return x * 2;
//   })
// );

// const evens = filter([1, 2, 3, 4], function (x) {
//   return x % 2 === 0;
// });
// console.log(evens);

// const firstEven = find([1, 3, 5, 8, 10], function (x) {
//   return x % 2 === 0;
// });
// console.log(firstEven);

// const idx = findIndex([1, 3, 5, 8, 10], function (x) {
//   return x % 2 === 0;
// });
// console.log(idx);

// const allPositive = every([1, 2, 3], function (x) {
//   return x > 0;
// });
// console.log(allPositive);

// const hasNegative = some([1, -2, 3], function (x) {
//   return x < 0;
// });
// console.log(hasNegative);
