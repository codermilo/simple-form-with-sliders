window.onload = resetRanges;

//setting up the concentration bar
const meter = document.getElementById("meter");
meter.disabled = true;

//collecting all the numbers and ranges into queryselect array of objects and also the final concentration value
const concentration = document.getElementById("concentration");

//reset the ranges on window load
function resetRanges() {
    const testR = document.querySelectorAll(".range");
    const testN = document.querySelectorAll(".num");

    for (let i = 0; i < testR.length; i++) {
        testR[i].value = 20;
        testN[i].value = 20;
    }
    meter.value = 60;
}

//adding all the values of each Product to create the value of the concentration
const sumOfAll = () => {
    const testR = document.querySelectorAll(".range");

    var newArr = [];
    testR.forEach(element => {
        newArr.push(parseInt(element.value));
    });
    const sum = newArr.reduce((a, b) => a + b, 0);

    document.getElementById("concentration").innerHTML = sum;

    meter.value = sum;
    var color = '';
    if (sum != 100) {
        color = 'linear-gradient(90deg, red ' + sum + '%, white ' + sum + '%)';
    } else {
        color = 'linear-gradient(90deg, green ' + sum + '%, white ' + sum + '%)';
    }
    meter.style.backgroundImage = color;
}

//creating a counter to assign id to each new form element. Starting at 3 because there are 3 Products already created
var count = 3;

//button function to make new Product
function createNewProduct() {
    //incrementing the count var and adding that value to this form label
    count++;
    

    const list = document.getElementById("product-container");
    let divR = document.createElement("div");
    divR.setAttribute("class", "row");
    list.append(divR);

    //first column in form component where label is stored
    let divC1 = document.createElement("div");
    divC1.setAttribute("class", "col");
    divR.append(divC1);

    let label = document.createElement("label");

    const setAttributes = (element, attributes) => {
        Object.keys(attributes).forEach(attr => {
            element.setAttribute(attr, attributes[attr]);
        });
    }

    const attributes1 = {
        for: `Product ${count}`,
        class: 'form-label',
    };

    setAttributes(label, attributes1);
    label.textContent = `Product ${count} :`;
    divC1.append(label);

    //second column in form component where both number and range slider are stored
    let divC2 = document.createElement("div");
    divC2.setAttribute("class", "col");
    divR.append(divC2);

    let input1 = document.createElement("input");


    const attributes2 = {
        type: 'number',
        name: `Product ${count}`,
        class: 'slider num',
        id: `num ${count}`,
        value: '20',
        max: '100',
        step: '0.1',
        style: 'width:25%; float: right;',
        oninput: 'updateRange(this)'
    };

    setAttributes(input1, attributes2);
    divC2.append(input1);

    let input2 = document.createElement("input");


    const attributes3 = {
        type: 'range',
        class: 'slider range',
        name: 'slidervalue',
        value: '20',
        min: '1',
        max: '100',
        id: `range ${count}`,
        step: '0.1',
        oninput: 'updateNum(this)'
    };

    setAttributes(input2, attributes3);
    divC2.append(input2);

    //call sumOfAll to register new Product added
    sumOfAll();

}

//function to update the value of the num input
function updateNum(val) {

    const child = val.parentNode.firstElementChild;
    const value = val.value;
    child.value = value;

    //call sumOfAll to update value of concentration
    sumOfAll();


}

//function to update the value of the range input
function updateRange(val) {
    const child = val.parentNode.lastElementChild;
    const value = val.value;
    child.value = value;

    //call sumOfAll to update value of concentration
    sumOfAll();

}

//