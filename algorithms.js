let algorithms = [];

an_array = [5,1,9,7,8,3,6,2];

/**
 * Sorts an array using bubble sort algorithm
 * @param {*} an array 
 * @returns sorted array
 */
const bubble_sort = (an_array) => {
    for (let i = 0; i < an_array.length -1; i++) {
        for (let j = 0; j < an_array.length -1 - i; j++) {
            if (an_array[j] > an_array[j+1]) {
                temp = an_array[j];
                an_array[j] = an_array[j+1];
                an_array[j+1] = temp;
            }
        }
    }

    return an_array;
}

console.log(bubble_sort(an_array));