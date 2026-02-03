const numberInput = document.querySelector('.target_number')
const guessInput = document.querySelector('.guess')
const iterationsInput = document.querySelector('.iterations')
const visualizeButton = document.querySelector('.visualize')
const outputContainer = document.querySelector('.output_container')

function doAppend(parentElem, item) {
    if (typeof item === 'string') {
        const elem = document.createElement('div')
        elem.textContent = item
        parentElem.append(elem)
    } else {
        parentElem.append(item)
    }
}

function handleArray(parentElem, arg) {
    if (Array.isArray(arg)) {
        for (const item of arg){
            doAppend(parentElem, item)
        }
    } else {
        doAppend(parentElem, arg)
    }
}

function createGroup(arr) {
    const rowElem = document.createElement('div')
    rowElem.classList.add('row')
    handleArray(rowElem, arr)
    return rowElem
}

function createFraction(top, bottom) {
    const container = document.createElement('div')
    container.classList.add('fraction')

    container.append(createGroup(top))

    const separator = document.createElement('div')
    separator.classList.add('separator')
    container.append(separator)

    container.append(createGroup(bottom))

    return container 
}

function addRow(i, targetNum, guessNum, resultNum) {
    const targetStr = String(targetNum)
    const guessStr = String(guessNum)
    const resultStr = String(resultNum)

    const iterNum = document.createElement('div')
    iterNum.classList.add('iter_num')
    iterNum.textContent = `(${i})`

    const group2 = createGroup([
        '=',
        createFraction([guessStr, '+', targetStr/guessStr], '2'),
        '=',
        createFraction(guessNum + (targetNum/guessNum), '2'),
        '=',
        resultStr,
    ])

    const group1 = createGroup([
        iterNum,
        createFraction(
            [guessStr, '+', createFraction(targetStr, guessStr)],
            '2'
        ),
        group2
    ])
    group1.style.alignItems = 'end'
    outputContainer.append(group1)

    iterNum.style.height = group2.offsetHeight + 'px'
}

function visualize() {
    const target = Number(numberInput.value)
    let guess = Number(guessInput.value)
    const iterationCount = Number(iterationsInput.value)
    for (let i = 0; i < iterationCount; i++) {
        const newGuess = (guess + target / guess) / 2
        addRow(i + 1, target, guess, newGuess)
        if (newGuess === guess) {
            return
        }
        guess = newGuess
    }
}

visualizeButton.onclick = () => {
    outputContainer.textContent = ''
    visualize()
}

function initialize() {
    numberInput.value = 25
    guessInput.value = 10
    iterationsInput.value = 10
    visualize()
}

initialize()
