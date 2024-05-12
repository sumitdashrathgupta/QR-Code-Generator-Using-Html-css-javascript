const containerr = document.querySelector(".containerr");
const userInput = document.getElementById("userInput");
const submitBtn = document.getElementById("submit");
const downloadBtn = document.getElementById("download");
const sizeOptions = document.querySelector(".sizeOptions");
const BGColor = document.getElementById("BGColor");
const FGColor = document.getElementById("FGColor");
let QR_Code;
let sizeChoice, BGColorChoice, FGColorChoice;

//Set size
sizeOptions.addEventListener("change", () => {
    sizeChoice = sizeOptions.value;
});

//Set background color
BGColor.addEventListener("input", () => {
    BGColorChoice = BGColor.value;
});

//Set foreground color
FGColor.addEventListener("input", () => {
    FGColorChoice = FGColor.value;
});

//Format input
const inputFormatter = (value) => {
    value = value.replace(/[^a-z0-9A-Z]+/g, "");
    return value;
};

submitBtn.addEventListener("click", async () => {
    containerr.innerHTML = "";
    //QR code genertion
    QR_Code = await new QRCode(containerr, {
        text: userInput.value,
        width: sizeChoice,
        height: sizeChoice,
        colorDark: FGColorChoice,
        colorLight: BGColorChoice,
    });

    //Set url for download
    const src = containerr.firstChild.toDataURL("image/pmg");
    downloadBtn.href = src;
    let userValue = userInput.value;
    try {
        userValue = new URL(userValue).hostname;
    } catch (_) {
        userValue = inputFormatter(userValue);
        downloadBtn.download = `${userValue}QR`;
        downloadBtn.classList.add("");
    }
});

userInput.addEventListener("input", () => {
    if (userInput.value.trim().length < 1) {
        submitBtn.disabled = true;
        downloadBtn.href = "";
        downloadBtn.classList.add("");
    } else {
        submitBtn.disabled = false;
    }
});

window.onload = () => {
    containerr.innerHTML = "";
    sizeChoice = 100;
    sizeOptions.value = 100;
    userInput.value = "";
    BGColor.vavlue = BGColorChoice = "#ffffff";
    FGColor.value = FGColorChoice = "#377dff";
    downloadBtn.classList.add("");
    submitBtn.disabled = true;
};

//Popup

const section = document.querySelector("section"),
    show_QR = document.querySelector(".show_QR"),
    closed = document.querySelector(".closed");
show_QR.addEventListener("click", () => section.classList.add("active"));
closed.addEventListener("click", () => section.classList.remove("active"));


