import { disableBtn } from "./disableBtn.js";
import { enableBtn } from "./enableBtn.js";

let domainAllowed = true;

export function validateInput(inputField) {
  let emptyInputArr = [];
  inputField.each(function (i) {
    if ($(this).val() !== "" && $(this).val() !== null) {
      emptyInputArr = emptyInputArr.filter((y) => y.input !== i);
    } else {
      if (!emptyInputArr.find((y) => y.input === i)) {
        emptyInputArr.push({ input: i });
      }
    }
  });
  const isInputFilled = emptyInputArr.length === 0;
  return isInputFilled;
}

function validateEmail(email, blockDomain) {
  const isValidEmailFormat = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,20})?$/.test(email);
  const domainEntered = email.includes("@")
    ? email.split("@")[1].split(".")[0]
    : "";

  let domainAllowed = true;
  if (blockDomain !== undefined) {
    const blockedDomains = blockDomain.split(",");
    domainAllowed = !blockedDomains.some((x) => x.includes(domainEntered));
  }

  return isValidEmailFormat && domainAllowed;
}

export function validation(
  x,
  steps,
  radioFilled,
  inputFilled,
  telFilled,
  dateFilled,
  selectFilled,
  emailFilled,
  fileFilled
) {
  if ($(steps[x]).data("card")) {
    enableBtn();
  }
  // console.log($(steps[x]).find(":input"));
  // console.log($("#BookLanguage").val());
  let currentStep = $(steps[x]);
  let textInput = currentStep.find('input[type="text"][required]:visible');
  let selectInput = currentStep.find("select[required]");
  let emailInput = currentStep.find('input[type="email"]:visible');
  let dateInput = currentStep.find('input[type="date"][required]:visible');
  let telInput = currentStep.find('input[type="tel"][required]:visible');
  let fileInput = currentStep.find('input[type="file"][required]:visible');
  let radioInput = currentStep.find('input[type="radio"][required]:visible');
  // radio button validation
  if (currentStep.find(":input[required]").is('[type="radio"]')) {
    if (radioInput.is(":checked")) {
      radioFilled = true;
    } else {
      radioFilled = false;
    }
  }

  // email input validation
  emailInput.each(function () {
    if ($(this).val() !== "") {
      emailFilled = validateEmail($(this).val(), $(this).data("block-domain"));
    } else {
      emailFilled = false;
    }
  });

  inputFilled = validateInput(textInput);
  telFilled = validateInput(telInput);
  dateFilled = validateInput(dateInput);
  selectFilled = validateInput(selectInput);
  fileFilled = validateInput(fileInput);

  // Happens when clicking the "remove" button on the file upload
  $(steps[x])
    .find(".w-icon-file-upload-remove")
    .on("click", function () {
      disableBtn();
    });

  // Happens when clicking the "remove" button on the file upload
  $(steps[x])
    .find(".link-5.w-file-remove-link")
    .on("click", function () {
      disableBtn();
    });

  $(steps[x])
    .find(".link-back.w-inline-block")
    .on("click", function () {
      enableBtn();
      setAllChecksToTrue();
    });

  function setAllChecksToTrue() {
    inputFilled = true;
    dateFilled = true;
    telFilled = true;
    radioFilled = true;
    emailFilled = true;
    domainAllowed = true;
    selectFilled = true;
    fileFilled = true;
  }

  if (
    inputFilled &&
    dateFilled &&
    telFilled &&
    radioFilled &&
    emailFilled &&
    domainAllowed &&
    selectFilled &&
    fileFilled
  ) {
    enableBtn();
  } else {
    disableBtn();
  }
}
