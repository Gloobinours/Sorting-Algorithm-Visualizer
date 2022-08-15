//Question for Louan from Sam: Why do we need what is below?
let algorithms = [];
/**
 * Shows the value returned by the slider
 */
const show_value = (value) => {
    document.getElementById("rangeValueId").innerHTML = value;
    // console.log("Test print show value: " + value);
}

/**
 * Shuffles an array 
 * @param {array} an_array 
 * @returns shuffled array
 */
const shuffle_array = (an_array) => {
    for (let i = 0; i < an_array.length; i++) {
        let j = Math.floor(Math.random() * (i + 1));
        [an_array[i], an_array[j]] = [an_array[j], an_array[i]];
    }

    return an_array;
}

/**
 * Creates an array using the given slider value as length and shuffles it
 * @param {integer} slider value 
 * @returns shuffled array
 */
const create_array = (value) => {
    let an_array = [value];
    for (let i = 0; i < value; i++) {
        an_array[i] = i+1;
    }

    return shuffle_array(an_array);
}

/**
 * Sorts an array using bubble sort algorithm
 * @param {array} an array 
 * @returns sorted array
 */
const bubble_sort = (an_array) => {
    // let timeoutDuration = 1;
    sortAnimations = [];
    make_bars(parseInt(document.getElementById("slider").value), an_array);
    for (let i = 0; i < an_array.length -1; i++) {
        for (let j = 0; j < an_array.length -1 - i; j++) {
            if (an_array[j] > an_array[j+1]) {
                temp = an_array[j];
                an_array[j] = an_array[j+1];
                an_array[j+1] = temp;
                sortAnimations.push([j, j+1]);
            } else {
                sortAnimations.push([0, 0]); // add empty animation
            }
        }
    }
    return sortAnimations;
}

/**
 * Creates the bars on the visualizer
 * @param {integer} slider_value 
 * @param {array} an_array 
 * @returns void
 */
const make_bars = (slider_value, an_array) => {
    let referenceToContainer = document.getElementById("screen");
    let max_value = Math.max(...an_array);
    let borderThickness = 1;
    for(let i = 0 ; i < slider_value; i++) {
        let child = document.createElement("div");
        child.style.height = `calc(${an_array[i] / max_value * 100}% - ${borderThickness*2}px)`;
        child.style.width = `calc(${(100/an_array.length)}% - ${borderThickness*2}px)`;
        child.style["background-color"] = "#FFB4B4";
        child.style.display = "inline-block";
        child.style.border = `solid ${borderThickness}px #B2A4FF`;
        referenceToContainer.appendChild(child);
    }
}

const timeout_debug = () => {
    console.log("timeout ended");
}

/**
 * Swaps the height of 2 adjacent bars
 * @param {integer} i
 * @param {integer} j 
 * @returns void
 */
const blockSwapCallback = (i, j) => {
    let referenceToContainer = document.getElementById("screen");
    let bar1 = referenceToContainer.children[i];
    let bar2 = referenceToContainer.children[j];
    let height1 = bar1.style.height;
    let height2 = bar2.style.height;
    bar1.style.height = height2;
    bar2.style.height = height1;
    currentWaitTarget++;
}

var arrayBeingSorted = [];
var screen = document.getElementById("screen");
var isAnimationRunning = false;
var sortAnimations = [];
var currentWaitTarget = 0;
var timeoutIdArray = [];

const playAnimation = () => {
    if(arrayBeingSorted.length == 0) {
        arrayBeingSorted = create_array(document.getElementById("slider").value);
        sortAnimations = bubble_sort(arrayBeingSorted);
        timeoutIdArray = Array(sortAnimations.length).fill(0);
        isAnimationRunning = true;
    }
    if(isAnimationRunning) {
        let timeoutDuration = 1000;
        let currentDuration = timeoutDuration;
        for (let i = currentWaitTarget; i < sortAnimations.length; i++) {
            setTimeout(blockSwapCallback, currentDuration, sortAnimations[i][0], sortAnimations[i][1]);
            currentDuration += timeoutDuration;
        }
    }

    // if(isSorting == false){
    //     isSorting = true;
    //     console.log(isSorting);
    //     while(screen.firstChild) {
    //         screen.removeChild(screen.firstChild);
    //     }
    //     console.log(isSorting);
    //     bubble_sort(create_array(document.getElementById("slider").value), blockSwapCallback);
    //     console.log(isSorting);
    // } else {
    //     /*From Sam to Everyone: Maybe we should throw an error here, and then handle it?
    //     I think that would be "good practice".*/
    //     console.log("Play button listen event execution was cancelled.");
    // }

}
document.getElementById("playButton").addEventListener("click", playAnimation);