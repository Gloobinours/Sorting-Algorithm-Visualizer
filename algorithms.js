let algorithms = [];
var isCanceled = false;
/**
 * Shows the value returned by the slider
 */
const show_value = (value) => {
    document.getElementById("rangeValueId").innerHTML = value;
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
const bubble_sort = (an_array, blockSwapCallback) => {
    let timeoutDuration = .125;
    make_bars(parseInt(document.getElementById("slider").value), an_array);
    for (let i = 0; i < an_array.length -1; i++) {
        for (let j = 0; j < an_array.length -1 - i; j++) {
            // console.log(isCanceled);
            // if (isCanceled) {
            //     console.log("oui oui", isCanceled);
            //     return;
            // }
            if (an_array[j] > an_array[j+1]) {
                temp = an_array[j];
                an_array[j] = an_array[j+1];
                an_array[j+1] = temp;
                setTimeout(blockSwapCallback, timeoutDuration * 1000, j, j+1);
                timeoutDuration+=.125;
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
    let screen = document.getElementById("screen");
    // isCanceled = true;
    // debugger;
    while(screen.firstChild) {
        screen.removeChild(screen.firstChild);
    }
    // isCanceled = false;
    bubble_sort(create_array(document.getElementById("slider").value), blockSwapCallback);
}
document.getElementById("playButton").addEventListener("click", playAnimation);