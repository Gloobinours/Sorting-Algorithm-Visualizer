let algorithms = [];

an_array = [5,1,9,7,8,3,6,2];

/**
 * Sorts an array using bubble sort algorithm
 * @param {*} an array 
 * @returns sorted array
 */
const bubble_sort = (an_array) => {
    for (let i = 0; i < an_array.length; i++) {
        if (an_array[i] > an_array[i+1]) {
            let a = an_array[i];
            let b = an_array[i + 1];
            temp = a;
            a = b;
            b = temp;
        }
    }

    return an_array;
}

console.log(bubble_sort(an_array));