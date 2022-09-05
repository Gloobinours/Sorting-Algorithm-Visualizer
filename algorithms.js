//Question for Louan from Sam: Why do we need what is below?
let algorithms = [];
/**
 * Shows the value returned by the slider
 */
const showValue = (value) => {
    document.getElementById("rangeValueId").innerHTML = value;
}

/**
 * Shuffles an array 
 * @param {array} anArray 
 * @returns shuffled array
 */
const shuffleArray = (anArray) => {
    for (let i = 0; i < anArray.length; i++) {
        let j = Math.floor(Math.random() * (i + 1));
        [anArray[i], anArray[j]] = [anArray[j], anArray[i]];
    }

    return anArray;
}

/**
 * Creates an array using the given slider value as length and shuffles it
 * @param {integer} slider value 
 * @returns shuffled array
 */
const createArray = (value) => {
    let anArray = [value];
    for (let i = 0; i < value; i++) {
        anArray[i] = i+1;
    }

    return shuffleArray(anArray);
}

/**
 * Sorts an array using bubble sort algorithm
 * @param {array} an array 
 * @returns sorted array
 */
const bubbleSort = (anArray) => {
    // let timeoutDuration = 1;
    let sortAnimations = [];
    for (let i = 0; i < anArray.length -1; i++) {
        for (let j = 0; j < anArray.length -1 - i; j++) {
            if (anArray[j] > anArray[j+1]) {
                temp = anArray[j];
                anArray[j] = anArray[j+1];
                anArray[j+1] = temp;
                // let animationMatrix = 
                // [
                //     [j, j+1], 
                //     [j, j+1]
                // ];
                // sortAnimations.push(animationMatrix);
            } else {
                // let animationMatrix = 
                // [
                //     [j, j +1], 
                //     [0, 0]
                // ];
                // sortAnimations.push(animationMatrix); // add empty animation
            }
        }
    }
    return sortAnimations;
}

const selectionSort = (anArray) => {
    let sortAnimations = [];

    for(let firstNonePartitionIndex = 0; firstNonePartitionIndex < anArray.length; firstNonePartitionIndex++) {
        let currentMinimumIndex = firstNonePartitionIndex;
        for(let currentIndex = firstNonePartitionIndex; currentIndex < anArray.length; currentIndex++) {
            if (anArray[currentIndex] < anArray[currentMinimumIndex]){
                currentMinimumIndex = currentIndex;
            }
            // let animationMatrix = 
            // [
            //     [currentIndex, currentMinimumIndex],
            //     [0, 0]
            // ];
            // sortAnimations.push(animationMatrix);
        }
        let valueOriginallyAtFirstNonPartitionIndex = anArray[firstNonePartitionIndex];
        anArray[firstNonePartitionIndex] = anArray[currentMinimumIndex];
        anArray[currentMinimumIndex] = valueOriginallyAtFirstNonPartitionIndex;
        // let animationMatrix = 
        // [
        //     [firstNonePartitionIndex, currentMinimumIndex], 
        //     [firstNonePartitionIndex, currentMinimumIndex]
        // ];
        // sortAnimations.push(animationMatrix);
    }
    return sortAnimations;
}

const mergeSort = (anArray) => {
    //Return if the array has no elements or just one element.
    if(anArray.length < 2) return

    //Create the two halfs of the array
    let halfLength = Math.floor(anArray.length / 2);
    let leftHalf = Array(halfLength).fill(0);
    let rightHalf = Array(anArray.length - halfLength).fill(0);

    // debugger;

    for(let i = 0; i < halfLength; i++){
        leftHalf[i] = anArray[i];
    }

    for(let i = halfLength; i < anArray.length; i++){
        rightHalf[i - halfLength] = anArray[i];
    }
    // console.log("The array before mergesort has been called: " + anArray);
    // debugger;

    // console.log("Left half before mergesort has been recursively called: " + leftHalf);
    // console.log("Right half before mergesort has been recursively called: " + rightHalf);

    // //Recursively call mergesort on the two arrays
    mergeSort(leftHalf);
    mergeSort(rightHalf);
    // console.log("The array after mergesort has been called: " + anArray);
    // console.log("Left half after mergesort has been recursively called: " + leftHalf);
    // console.log("Right half after mergesort has been recursively called: " + rightHalf);

    merge(anArray, leftHalf, rightHalf);
    // console.log(anArray);
}

const merge = (anArray, leftHalf, rightHalf) => {
    let i = 0;
    let j = 0;
    let k = 0;

    // debugger;

    while((i < leftHalf.length) && (j < rightHalf.length)){
        if (leftHalf[i] <= rightHalf[j]) {
            anArray[k] = leftHalf[i];
            i++;
        } else {
            anArray[k] = rightHalf[j];
            j++;
        }
        k++;
    }

    while(i < leftHalf.length){
        anArray[k] = leftHalf[i];
        i++;
        k++;
    }

    while(j < rightHalf.length){
        anArray[k] = rightHalf[j];
        j++;
        k++;
    }
}

const quickSort = (anArray, lowIndex, highIndex) => {

    if(lowIndex >= highIndex){
        return;
    }

    let pivotIndex = (Math.floor((Math.random() * (highIndex - lowIndex))) + lowIndex);
    let pivot = anArray[pivotIndex];
    swap(anArray, pivotIndex, highIndex);

    let leftPointer = lowIndex;
    let rightPointer = highIndex;

    while(leftPointer < rightPointer){
        while((anArray[leftPointer] <= pivot) && (leftPointer < rightPointer)){
            leftPointer++;
        }
        while((anArray[rightPointer] >= pivot) && (leftPointer < rightPointer)){
            rightPointer--;
        }
        swap(anArray, leftPointer, rightPointer);
    }

    swap(anArray, leftPointer, highIndex);

    quickSort(anArray, lowIndex, (leftPointer - 1));
    quickSort(anArray, (leftPointer + 1), highIndex);
}

const swap = (anArray, index1, index2) => {
    temp = anArray[index1];
    anArray[index1] = anArray[index2];
    anArray[index2] = temp;
}

const insertionSort = (anArray) => {
    for(let i = 1; i < anArray.length; i++){
        let currentValue = anArray[i];
        let j = i - 1;
        while(j >= 0 && anArray[j] > currentValue){
            anArray[j + 1] = anArray[j];
            j--;
        }
        anArray[j + 1] = currentValue;
    }
}

/**
 * Creates the bars on the visualizer
 * @param {integer} sliderValue 
 * @param {array} anArray 
 * @returns void
 */
const makeBars = (anArray) => {
    let referenceToContainer = document.getElementById("screen");
    let maxValue = Math.max(...anArray);
    let borderThickness = 1;
    for(let i = 0 ; i < anArray.length; i++) {
        let child = document.createElement("div");
        child.style.height = `calc(${anArray[i] / maxValue * 100}% - ${borderThickness*2}px)`;
        child.style.width = `calc(${(100/anArray.length)}% - ${borderThickness*2}px)`;
        child.style["background-color"] = "#FFB4B4";
        child.style.display = "inline-block";
        child.style.border = `solid ${borderThickness}px #B2A4FF`;
        referenceToContainer.appendChild(child);
    }
}

/**
 * Swaps the height of 2 adjacent bars
 * @param {integer} i
 * @param {integer} j 
 * @returns void
 */
const blockSwapCallback = (referenceToContainer, matrixArrayIndex, matrixArray) => {
    //Deselect
    if(matrixArrayIndex != 0){
    //Access the previously selected divs
        let bar1 = referenceToContainer.children[matrixArray[matrixArrayIndex - 1][0][0]];
        let bar2 = referenceToContainer.children[matrixArray[matrixArrayIndex - 1][0][1]];
        bar1.style["background-color"] = "#FFB4B4";
        bar2.style["background-color"] = "#FFB4B4";
    }

    //Select
    //Access the currently selected divs
    let bar1 = referenceToContainer.children[matrixArray[matrixArrayIndex][0][0]];
    let bar2 = referenceToContainer.children[matrixArray[matrixArrayIndex][0][1]];
    bar1.style["background-color"] = "#008000";
    bar2.style["background-color"] = "#008000";

    //Swap
    bar1 = referenceToContainer.children[matrixArray[matrixArrayIndex][1][0]];
    bar2 = referenceToContainer.children[matrixArray[matrixArrayIndex][1][1]];
    let height1 = bar1.style.height;
    let height2 = bar2.style.height;
    bar1.style.height = height2;
    bar2.style.height = height1;
    currentWaitTarget++;
    if(currentWaitTarget == sortAnimations.length){
        document.getElementById("playButton").innerHTML = "Play";
    }
}

var arrayBeingSorted = [];
var screen = document.getElementById("screen");
var isAnimationRunning = false;
/*
Sort animations i is a matrix defined as
[
    [0, 1] //This will be what is selected/highlighted before its swapped.
    [0, 1] //These will be swappped (if necessary; if the indexes are the same then there will be no swapping).

]

The selection two-length array will be used for deselection for the subsequent selection.

In other words, we will follow this 3 step process in chronological order:
- Deselect
- Select
- Swap if necessary
*/
var sortAnimations = [];
var currentWaitTarget = 0;
var timeoutIdArray = [];

const playAnimation = () => {
    // array1 = createArray(10);
    // array2 = createArray(10);

    // console.log("Array 1 before it is sorted, and before the merging: " + array1);
    // console.log("Array 2 before it is sorted, and before the merging: " + array2);

    // bubbleSort(array1);
    // bubbleSort(array2);

    // console.log("Array 1 after it is sorted, but before the merging: " + array1);
    // console.log("Array 2 after it is sorted, but before the merging: " + array2);

    // anArray = Array(6).fill(0);
    // merge(anArray, array1, array2);

    // console.log("The array that results from merging the aforementioned arrays: " + anArray);

    let arrayBeingSorted = createArray(document.getElementById("slider").value);
    console.log("Array before it has been sorted: " + arrayBeingSorted);
    insertionSort(arrayBeingSorted, 0, (arrayBeingSorted.length - 1));
    console.log("Array after it has been sorted: " + arrayBeingSorted);


    // const button = document. querySelector('button');
    // button.disabled = true;
    // if(currentWaitTarget >= sortAnimations.length) {
    //     //Reset all the globals
    //     arrayBeingSorted = [];
    //     isAnimationRunning = false;
    //     sortAnimations = [];
    //     currentWaitTarget = 0;
    //     timeoutIdArray = [];
    //     sortAnimations = [];
    //     // colorChangeIdArray = [];
    //     // colorChangeIdArray2 = [];
    //     //Manually destroy the old divs
    //     while(screen.firstChild) {
    //         screen.removeChild(screen.lastChild);
    //     }
    // }
    // if(arrayBeingSorted.length == 0) {
    //     arrayBeingSorted = createArray(document.getElementById("slider").value);
    //     //Need linear iteration regardless (because if we don't recreate bars, we will iterate through the array that is going to be sorted)
    //     makeBars(arrayBeingSorted);
    //     dropDownList = document.getElementById("algorithms");
    //     if(dropDownList.value == "Bubble Sort") {
    //         sortAnimations = bubbleSort(arrayBeingSorted);
    //     } else if(dropDownList.value == "Selection Sort") {
    //         sortAnimations = selectionSort(arrayBeingSorted);
    //     }
    //     console.log(sortAnimations);
    //     timeoutIdArray = Array(sortAnimations.length).fill(0);
    //     isAnimationRunning = true;
    // }
    // if(isAnimationRunning) {
    //     isAnimationRunning = false;
    //     document.getElementById("playButton").innerHTML = "Pause";
    //     let timeoutDuration = 100;
    //     let currentDuration = timeoutDuration;
    //     let referenceToContainer = document.getElementById("screen");
    //     for (let i = currentWaitTarget; i < sortAnimations.length; i++) {
    //         let id = setTimeout(blockSwapCallback, currentDuration, referenceToContainer, i, sortAnimations);
    //         timeoutIdArray[i] = id;
    //         console.log("Called setTimeout: " + currentDuration + "ms, id = " + id);
    //         currentDuration += timeoutDuration;
    //     }
    // } else if (!isAnimationRunning) {
    //     isAnimationRunning = true;
    //     document.getElementById("playButton").innerHTML = "Play";
    //     for (let i = currentWaitTarget; i < sortAnimations.length; i++) {
    //         console.log("Called clear timeout: " + timeoutIdArray[i]);
    //         clearTimeout(timeoutIdArray[i]);
    //     }
    // }
    // button.disabled = false;
}
document.getElementById("playButton").addEventListener("click", playAnimation);