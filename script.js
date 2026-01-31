const numberInput = document.querySelector('.target_number')
const guessInput = document.querySelector('.guess')
const iterationsInput = document.querySelector('.iterations')
const visualizeButton = document.querySelector('.visualize')
const outputContainer = document.querySelector('.output_container')
outputContainer.style.display = 'flex'
outputContainer.style.flexDirection = 'column'
outputContainer.style.gap = '10px'
outputContainer.style.fontFamily = 'sans-serif'

function createRow(i, target, guess, result) {
    const rowContainer = document.createElement('div')
    rowContainer.style.display = 'flex'
    rowContainer.style.gap = '10px'
    rowContainer.style.alignItems = 'center'
    outputContainer.append(rowContainer)

    const iterNum = document.createElement('div')
    iterNum.textContent = `(${i})`
    rowContainer.append(iterNum)

    const outerFraction = document.createElement('div')
    outerFraction.style.display = 'flex'
    outerFraction.style.flexDirection = 'column'
    outerFraction.style.alignItems = 'center'
    rowContainer.append(outerFraction)

    const formulaTop = document.createElement('div')
    formulaTop.textContent = `${guess} + ${target} / ${guess}`
    outerFraction.append(formulaTop)

    const separator = document.createElement('div')
    separator.style.height = '1px'
    separator.style.width = '100%'
    separator.style.backgroundColor = 'black'
    outerFraction.append(separator)

    const formulaBottom = document.createElement('div')
    formulaBottom.textContent = 2
    outerFraction.append(formulaBottom)

    const equalsElem = document.createElement('div')
    equalsElem.textContent = '='
    rowContainer.append(equalsElem)

    const resultElem = document.createElement('div')
    resultElem.textContent = result
    rowContainer.append(resultElem)
}

function visualize() {
    const target = Number(numberInput.value)
    let guess = Number(guessInput.value)
    const iterationCount = Number(iterationsInput.value)
    for (let i = 0; i < iterationCount; i++) {
        const newGuess = (guess + target / guess) / 2
        if (newGuess === guess) {
            return
        }
        createRow(i + 1, target, guess, newGuess)
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
