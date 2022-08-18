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
                let animationMatrix = 
                [
                    [j, j+1], 
                    [j, j+1]
                ];
                sortAnimations.push(animationMatrix);
            } else {
                let animationMatrix = 
                [
                    [j, j +1], 
                    [0, 0]
                ];
                sortAnimations.push(animationMatrix); // add empty animation
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
            let animationMatrix = 
            [
                [currentIndex, currentMinimumIndex],
                [0, 0]
            ];
            sortAnimations.push(animationMatrix);
        }
        let valueOriginallyAtFirstNonPartitionIndex = anArray[firstNonePartitionIndex];
        anArray[firstNonePartitionIndex] = anArray[currentMinimumIndex];
        anArray[currentMinimumIndex] = valueOriginallyAtFirstNonPartitionIndex;
        let animationMatrix = 
        [
            [firstNonePartitionIndex, currentMinimumIndex], 
            [firstNonePartitionIndex, currentMinimumIndex]
        ];
        sortAnimations.push(animationMatrix);
    }

    return sortAnimations;
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

const timeoutDebug = () => {
    console.log("timeout ended");
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
    const button = document. querySelector('button');
    button.disabled = true;
    if(currentWaitTarget >= sortAnimations.length) {
        //Reset all the globals
        arrayBeingSorted = [];
        isAnimationRunning = false;
        sortAnimations = [];
        currentWaitTarget = 0;
        timeoutIdArray = [];
        sortAnimations = [];
        // colorChangeIdArray = [];
        // colorChangeIdArray2 = [];
        //Manually destroy the old divs
        while(screen.firstChild) {
            screen.removeChild(screen.lastChild);
        }
    }
    if(arrayBeingSorted.length == 0) {
        arrayBeingSorted = createArray(document.getElementById("slider").value);
        //Need linear iteration regardless (because if we don't recreate bars, we will iterate through the array that is going to be sorted)
        makeBars(arrayBeingSorted);
        dropDownList = document.getElementById("algorithms");
        if(dropDownList.value == "Bubble Sort") {
            sortAnimations = bubbleSort(arrayBeingSorted);
        } else if(dropDownList.value == "Selection Sort") {
            sortAnimations = selectionSort(arrayBeingSorted);
        }
        console.log(sortAnimations);
        timeoutIdArray = Array(sortAnimations.length).fill(0);
        isAnimationRunning = true;
    }
    if(isAnimationRunning) {
        isAnimationRunning = false;
        document.getElementById("playButton").innerHTML = "Pause";
        let timeoutDuration = 100;
        let currentDuration = timeoutDuration;
        let referenceToContainer = document.getElementById("screen");
        for (let i = currentWaitTarget; i < sortAnimations.length; i++) {
            let id = setTimeout(blockSwapCallback, currentDuration, referenceToContainer, i, sortAnimations);
            timeoutIdArray[i] = id;
            console.log("Called setTimeout: " + currentDuration + "ms, id = " + id);
            currentDuration += timeoutDuration;
        }
    } else if (!isAnimationRunning) {
        isAnimationRunning = true;
        document.getElementById("playButton").innerHTML = "Play";
        for (let i = currentWaitTarget; i < sortAnimations.length; i++) {
            console.log("Called clear timeout: " + timeoutIdArray[i]);
            clearTimeout(timeoutIdArray[i]);
        }
    }
    button.disabled = false;
}
document.getElementById("playButton").addEventListener("click", playAnimation);