let algorithms = [];
// const slider_value = document.getElementById("slider").value;

an_array = [5,1,9,7,8,3,6,2];

/**
 * Sorts an array using bubble sort algorithm
 * @param {*} an array 
 * @returns sorted array
 */
const bubble_sort = (an_array, blockSwapCallback) => {
    console.log("test1");
    make_bars(document.getElementById("slider").value, an_array);
    for (let i = 0; i < an_array.length -1; i++) {
        for (let j = 0; j < an_array.length -1 - i; j++) {
            if (an_array[j] > an_array[j+1]) {
                temp = an_array[j];
                an_array[j] = an_array[j+1];
                an_array[j+1] = temp;
                blockSwapCallback(j, j+1);
            }
        }
    }
}

const make_bars = (slider_value, an_array) => {
    let referenceToContainer = document.getElementById("screen");
    let max_value = Math.max(an_array);
    for(let i = 0 ; i < slider_value; i++) {
        let child = document.createElement("div");
        if(i == 0) {
            console.log(child);
        }
        child.style.height = ((an_array[i]/max_value) * 100).toString() + "%";
        child.style.width = (100/an_array.length).toString() + "%";
        child.style.border = "solid 1px black";
        child.style.display = "inline-block";
        referenceToContainer.appendChild(child);
    }
}

const blockSwapCallback = (i, j) => {
    let referenceToContainer = document.getElementById("screen");
    //console.log(referenceToContainer);
    let bar1 = referenceToContainer.childNodes.item(i);
    let bar2 = referenceToContainer.childNodes.item(j);
    let height1 = bar1.style.height;
    let height2 = bar1.style.height;
    bar1.style.height = height2;
    bar2.style.height = height1;
    setTimeout(function(){}, 1000);
}

console.log(bubble_sort(an_array, blockSwapCallback));