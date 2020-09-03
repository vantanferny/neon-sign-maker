let message
let color
let borderColor
let colorIntensity = 2
let borderColorIntensity = 2

let red = 255
let green = 0
let blue = 0

window.onload = function() {
    message = document.getElementById('message');
    color = "rgb(" + red + "," + green + "," + blue + ")"
    borderColor = "rgb(" + red + "," + green + "," + blue + ")"

    adjustLightIntensity()
    showPopUp()
}

const download = () => {
    domtoimage.toPng(document.getElementById('background'))
    .then (function (dataUrl) {
        let link = document.createElement('a')
        link.download = document.getElementById("message").innerText + '.png'
        link.href = dataUrl
        link.click();
    })
    .catch(function (error) {
        alert('oops, something went wrong!', error);
    });
}

const adjustColor = () => {
    const currentColorValue = document.getElementById('color-picker').value
    color = computeColorValue(currentColorValue)

    adjustLightIntensity()
}

const adjustBorderColor = () => {
    const currentBorderColorValue = document.getElementById('border-color-picker').value
    borderColor = computeColorValue(currentBorderColorValue)

    adjustBorderLightIntensity()
}

const adjustColorIntensity = () => {
    colorIntensity = 15 - document.getElementById('color-intensity-picker').value

    adjustLightIntensity()
}

const adjustBorderColorIntensity = () => {
    borderColorIntensity = 15 - document.getElementById('border-color-intensity-picker').value

    adjustBorderLightIntensity()
}

const adjustLightIntensity = () => {
    const light = document.getElementById('light-intensity-picker').value
    const textShadowValue = computeTextShadowValue(light)

    message.style.setProperty('text-shadow', textShadowValue)
}

const adjustBorderLightIntensity = () => {
    const light = document.getElementById('border-light-intensity-picker').value
    const borderShadowValue = computeBorderShadowValue(light)

    message.style.setProperty('box-shadow', borderShadowValue)
}

const adjustTextSize = () => {
    const size = document.getElementById('size-picker').value

    message.style.fontSize = size + 'px'
}

const adjustBorderHeight = () => {
    const size = document.getElementById('border-height-picker').value

    message.style.setProperty('padding-top', size + 'px')
    message.style.setProperty('padding-bottom', size + 'px')
}

const adjustBorderWidth = () => {
    const size = document.getElementById('border-width-picker').value

    message.style.setProperty('padding-left', size + 'px')
    message.style.setProperty('padding-right', size + 'px')
}

const adjustBorderSides = () => {
    const size = document.getElementById('size-picker').value

    message.style.fontSize = size + 'px'
}

const toggleBorder = () => {
    const borderOn = document.getElementById('border-toggle').checked

    if (borderOn) {
        message.classList.add("initial-flicker");
        message.style.setProperty('border', '1px solid white')
        adjustBorderLightIntensity()
    } else {
        message.style.setProperty('border', 'none')
        message.style.setProperty('box-shadow', 'none')
    }

    let borderControls = document.getElementsByClassName("border-control")

    for (setting of borderControls) {
        setting.disabled = !borderOn;
    }
}

const adjustFontFamily = () => {
    message.style.fontFamily = document.getElementById('font-picker').value
}

const updateMessage = () => {
    document.getElementById("message").innerText = document.getElementById("input").value;
}

const computeColorValue = (x) => {
    if (x >= 1 && x <= 256) {
        red = 255
        green = x - 1
        blue = 0
    } else if (x > 256 && x <= 511) {
        red = 511 - x
        green = 255
        blue = 0
    } else if (x > 511 && x <= 766) {
        red = 0
        green = 255
        blue = x - 511
    } else if (x > 766 && x <= 1021) {
        red = 0
        green = 1021 - x
        blue = 255
    } else if (x > 1021 && x <= 1276) {
        red = x - 1021
        green = 0
        blue = 255
    } else if (x > 1276 && x <= 1531) {
        red = 255
        green = 0
        blue = 1531 - x
    }

    return "rgb(" + red + "," + green + "," + blue + ")"
}

const computeTextShadowValue = (level) => {
    let textShadowValue = ""
    const base = 10

    for (i = 1; i <= level; i++) {
        const levelValue = base * i

        const levelColor = i < colorIntensity ? "white" :  color
        const levelString = "0 0 " + levelValue + "px " +  levelColor + ","

        textShadowValue += levelString
    }

    const parsedValue = textShadowValue.slice(0, -1)

    return parsedValue
}

const computeBorderShadowValue = (level) => {
    let borderShadowValue = ""
    const base = 10

    for (i = 1; i <= level; i++) {
        const levelValue = base * i
        const insetLevelValue = base * i * .75

        const levelColor = i < borderColorIntensity ? "white" :  borderColor
        const levelString = "0 0 " + levelValue + "px " +  levelColor + "," + "0 0 " + insetLevelValue + "px " +  levelColor + " inset,"

        borderShadowValue += levelString
    }

    const parsedValue = borderShadowValue.slice(0, -1)

    return parsedValue
}

const showPopUp = () => {
    let num = Math.floor(Math.random() * Math.floor(3)) + 1;
    let photo = "./images/me/me_" + num + ".png"
    document.getElementById('pop-up-img').style.backgroundImage = "url('" + photo + "')"
    document.getElementById('pop-up-container').style.animation = "showPopUp 1s ease-in 1"
    document.getElementById('pop-up-container').style.opacity = 100
}

const removePopUp = () => {
    document.getElementById('pop-up-container').style.animation = "removePopUp 1s ease-in 1"
    document.getElementById('pop-up-container').style.opacity = 0
}