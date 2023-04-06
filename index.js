function swap(a, b) {
  let temp = a.style.height;
  a.style.height = b.style.height;
  b.style.height = temp;
}

function disableSortingBtn() {
  document.querySelector(".bubbleSort").disabled = true;
  document.querySelector(".selectionSort").disabled = true;
  document.querySelector(".InsertionSort").disabled = true;
  document.querySelector(".quickSort").disabled = true;
  document.querySelector(".mergeSort").disabled = true;
}

function enableSortingBtn() {
  document.querySelector(".bubbleSort").disabled = false;
  document.querySelector(".selectionSort").disabled = false;
  document.querySelector(".InsertionSort").disabled = false;
  document.querySelector(".quickSort").disabled = false;
  document.querySelector(".mergeSort").disabled = false;
}

function disableSizeSlider() {
  document.querySelector("#arrsize").disabled = true;
}

function enableSizeSlider() {
  document.querySelector("#arrsize").disabled = false;
}

function disableNewArrayBtn() {
  document.querySelector(".newArray").disabled = true;
}

function enableNewArrayBtn() {
  document.querySelector(".newArray").disabled = false;
}

function waitforme(milisec) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("");
    }, milisec);
  });
}

let arraySize = document.querySelector("#arrsize");

arraySize.addEventListener("input", function () {
  createNewArray(parseInt(arraySize.value));
});

let delay = 260;

let delayElement = document.querySelector("#speedinp");

delayElement.addEventListener("input", function () {
  delay = 360 - parseInt(delayElement.value);
});

let array = [];

createNewArray();

function createNewArray(noOfBars = 60) {
  deleteChild();
  array = [];
  for (i = 0; i < noOfBars; i++) {
    array.push(Math.floor(Math.random() * 250) + 1);
  }
  const bars = document.querySelector("#bars");
  for (i = 0; i < noOfBars; i++) {
    const bar = document.createElement("div");
    bar.style.height = `${array[i] * 2}px`;
    bar.classList.add("bar");
    bar.classList.add("flex-item");
    // bar.classList.add(`barNo${i}`);
    bars.appendChild(bar);
  }
}

function deleteChild() {
  const bars = document.querySelector("#bars");
  bars.innerHTML = "";
}

const newArray = document.querySelector(".newArray");

newArray.addEventListener("click", function () {
  createNewArray(arraySize.value);
  enableSortingBtn();
  enableSizeSlider();
});

// bubble sort

async function bubble() {
  const element = document.querySelectorAll(".bar");
  for (let i = 0; i < element.length - 1; i++) {
    for (let j = 0; j < element.length - i - 1; j++) {
      element[j].style.background = "blue";
      element[j + 1].style.background = "blue";
      if (
        parseInt(element[j].style.height) >
        parseInt(element[j + 1].style.height)
      ) {
        await waitforme(delay);
        swap(element[j], element[j + 1]);
      }
      element[j].style.background = "cyan";
      element[j + 1].style.background = "cyan";
    }
    element[element.length - 1 - i].style.background = "green";
  }
  element[0].style.background = "green";
}

const bubbleSort = document.querySelector(".bubbleSort");
bubbleSort.addEventListener("click", async function () {
  disableSortingBtn();
  disableSizeSlider();
  disableNewArrayBtn();
  await bubble();
  enableSortingBtn();
  enableSizeSlider();
  enableNewArrayBtn();
});

//selection sort

async function selection() {
  const element = document.querySelectorAll(".bar");
  for (i = 0; i < element.length; i++) {
    let min_index = i;
    element[i].style.background = "blue";

    for (let j = i + 1; j < element.length; j++) {
      element[j].style.background = "red";

      await waitforme(delay);
      if (
        parseInt(element[j].style.height) <
        parseInt(element[min_index].style.height)
      ) {
        if (min_index !== i) {
          element[min_index].style.background = "cyan";
        }
        min_index = j;
      } else {
        element[j].style.background = "cyan";
      }
    }
    await waitforme(delay);
    swap(element[min_index], element[i]);
    element[min_index].style.background = "cyan";
    element[i].style.background = "green";
  }
}

const selectionSort = document.querySelector(".selectionSort");
selectionSort.addEventListener("click", async function () {
  disableSortingBtn();
  disableSizeSlider();
  disableNewArrayBtn();
  await selection();
  enableSortingBtn();
  enableSizeSlider();
  enableNewArrayBtn();
});

// insertion sort

async function insertion() {
  const element = document.querySelectorAll(".bar");
  element[0].style.background = "green";
  for (i = 1; i < element.length; i++) {
    let j = i - 1;

    let a = element[i].style.height;
    element[i].style.background = "blue";
    await waitforme(delay);
    while (j >= 0 && parseInt(element[j].style.height) > parseInt(a)) {
      element[i].style.background = "blue";
      element[j + 1].style.height = element[j].style.height;
      j--;
      await waitforme(delay);
      for (let k = i; k >= 0; k--) {
        element[k].style.background = "green";
      }
    }
    element[j + 1].style.height = a;
    element[i].style.background = "green";
  }
}

const InsertionSort = document.querySelector(".InsertionSort");
InsertionSort.addEventListener("click", async function () {
  disableSortingBtn();
  disableSizeSlider();
  disableNewArrayBtn();
  await insertion();
  enableSortingBtn();
  enableSizeSlider();
  enableNewArrayBtn();
});

//quick sort

async function partetion(a, b, c) {
  let i = b - 1;
  a[c].style.background = "red";

  for (let j = 1; j <= c - 1; j++) {
    a[j].style.background = "yellow";
    await waitforme(delay);
    if (parseInt(a[j].style.height) < parseInt(a[c].style.height)) {
      i++;
      swap(a[i], a[j]);
      a[i].style.background = "orange";
      if (i != j) a[j].style.background = "orange";

      await waitforme(delay);
    } else {
      a[j].style.background = "pink";
    }
  }
  i++;
  await waitforme(delay);
  swap(a[i], a[c]);
  a[c].style.background = "pink";
  a[i].style.background = "green";
  await waitforme(delay);

  for (let k = 0; k < a.length; k++) {
    if (a[k].style.background != "green") a[k].style.background = "cyan";
  }

  return i;
}

async function quick(a, b, c) {
  if (b < c) {
    let data = await partetion(a, b, c);
    await quick(a, b, data - 1);
    await quick(a, data + 1, c);
  } else {
    if (b >= 0 && c >= 0 && b < a.length && c < a.length) {
      a[c].style.background = "green";
      a[b].style.background = "green";
    }
  }
}

const quickSort = document.querySelector(".quickSort");
quickSort.addEventListener("click", async function () {
  let a = document.querySelectorAll(".bar");
  let b = 0;
  let c = a.length - 1;
  disableSortingBtn();
  disableSizeSlider();
  disableNewArrayBtn();
  await quick(a, b, c);
  enableSortingBtn();
  enableSizeSlider();
  enableNewArrayBtn();
});


// merge sort

async function merge(ele, low, mid, high){
    console.log('In merge()');
    console.log(`low=${low}, mid=${mid}, high=${high}`);
    const n1 = mid - low + 1;
    const n2 = high - mid;
    console.log(`n1=${n1}, n2=${n2}`);
    let left = new Array(n1);
    let right = new Array(n2);

    for(let i = 0; i < n1; i++){
        await waitforme(delay);
        console.log('In merge left loop');
        console.log(ele[low + i].style.height + ' at ' + (low+i));
        // color
        ele[low + i].style.background = 'orange';
        left[i] = ele[low + i].style.height;
    }
    for(let i = 0; i < n2; i++){
        await waitforme(delay);
        console.log('In merge right loop');
        console.log(ele[mid + 1 + i].style.height + ' at ' + (mid+1+i));
        // color
        ele[mid + 1 + i].style.background = 'yellow';
        right[i] = ele[mid + 1 + i].style.height;
    }
    await waitforme(delay);
    let i = 0, j = 0, k = low;
    while(i < n1 && j < n2){
        await waitforme(delay);
        console.log('In merge while loop');
        console.log(parseInt(left[i]), parseInt(right[j]));
        
        // To add color for which two r being compared for merging
        
        if(parseInt(left[i]) <= parseInt(right[j])){
            console.log('In merge while loop if');
            // color
            if((n1 + n2) === ele.length){
                ele[k].style.background = 'green';
            }
            else{
                ele[k].style.background = 'lightgreen';
            }
            
            ele[k].style.height = left[i];
            i++;
            k++;
        }
        else{
            console.log('In merge while loop else');
            // color
            if((n1 + n2) === ele.length){
                ele[k].style.background = 'green';
            }
            else{
                ele[k].style.background = 'lightgreen';
            } 
            ele[k].style.height = right[j];
            j++;
            k++;
        }
    }
    while(i < n1){
        await waitforme(delay);
        console.log("In while if n1 is left");
        // color
        if((n1 + n2) === ele.length){
            ele[k].style.background = 'green';
        }
        else{
            ele[k].style.background = 'lightgreen';
        }
        ele[k].style.height = left[i];
        i++;
        k++;
    }
    while(j < n2){
        await waitforme(delay);
        console.log("In while if n2 is left");
        // color
        if((n1 + n2) === ele.length){
            ele[k].style.background = 'green';
        }
        else{
            ele[k].style.background = 'lightgreen';
        }
        ele[k].style.height = right[j];
        j++;
        k++;
    }
}

async function mergeSort(ele, l, r){
    console.log('In mergeSort()');
    if(l >= r){
        console.log(`return cause just 1 elemment l=${l}, r=${r}`);
        return;
    }
    const m = l + Math.floor((r - l) / 2);
    console.log(`left=${l} mid=${m} right=${r}`, typeof(m));
    await mergeSort(ele, l, m);
    await mergeSort(ele, m + 1, r);
    await merge(ele, l, m, r);
}

const mergeSortbtn = document.querySelector(".mergeSort");
mergeSortbtn.addEventListener('click', async function(){
    let ele = document.querySelectorAll('.bar');
    let l = 0;
    let r = parseInt(ele.length) - 1;
    disableSortingBtn();
    disableSizeSlider();
    disableNewArrayBtn();
    await mergeSort(ele, l, r);
    enableSortingBtn();
    enableSizeSlider();
    enableNewArrayBtn();
});