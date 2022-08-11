let algorithms = [];
// const slider_value = document.getElementById("slider").value;

an_array = [5,1,9,7,8,3,6,2,4];

/**
 * Sorts an array using bubble sort algorithm
 * @param {array} an array 
 * @returns sorted array
 */
const bubble_sort = (an_array, blockSwapCallback) => {
    let timeoutDuration = 1;
    make_bars(parseInt(document.getElementById("slider").value), an_array);
    for (let i = 0; i < an_array.length -1; i++) {
        for (let j = 0; j < an_array.length -1 - i; j++) {
            if (an_array[j] > an_array[j+1]) {
                temp = an_array[j];
                an_array[j] = an_array[j+1];
                an_array[j+1] = temp;
                setTimeout(blockSwapCallback, timeoutDuration * 1000, j, j+1);
                timeoutDuration++;
            }
        }
    }
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
}

const playAnimation = () => {
    bubble_sort(an_array, blockSwapCallback);
}
document.getElementById("playButton").addEventListener("click", playAnimation);
