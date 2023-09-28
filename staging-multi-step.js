//22-2-23 Update Push

import { changeImage } from "./components/changeImage";
import { validation } from "./components/validation.js";
import "./components/location";
import "./components/countryNumberAutocomplete";
import "./components/submitForm";

let x = 0;
let curStep = 0;
let steps = $('[data-form="step"]'); // node elements with data-form="step" attribute (divs)
let progressbarClone = $('[data-form="progress-indicator"]').clone();
let progressbar;
let fill = false;
let inputFilled = true;
let selectFilled = true;
let radioFilled = true;
let checkboxFilled = true;
let emailFilled = true;
let textareaFilled = true;
let telFilled = true;
let dateFilled = true;
let fileFilled = true;
let answer = "";
let selections = [];
let selection = [];
let empReqInput = [];
let empReqSelect = [];
let empReqTextarea = [];
let empReqfile = [];
let empReqTel = [];
let empReqDate = [];
let reinitIX = $("[data-reinit]").data("reinit");
let textareaLength = 0;
let textInputLength = 0;
let emailInputLength = 0;
let selectInputLength = 0;
let checkboxInputLength = 0;
let filledInput = [];
let savedFilledInput = JSON.parse(localStorage.getItem("filledInput"));
let memory = $("[data-memory]").data("memory");
let quiz = $("[data-quiz]").data("quiz");
let progress = 0;
const urlFormly = new URL(window.location.href);
let params = $("[data-query-param]").data("query-param");
let skipTo = 0;
let next = false;
let selArr = [];
let selString = [];
let emptyInput = 0;
let searchQ = [];
let image_changed = false;
let is_boy = true;

// added new variables
const host = urlFormly.host;
const port = urlFormly.port; // if live server is used, then the port is not empty
const bookLang = document.getElementById("BookLanguage");
const dateInput = document.getElementById("HeroDOB");

const detectBookLang = () => {
  const splittedHost = host.split(".");
  if (splittedHost[0] === "www") {
    bookLang.value = "en";
  } else {
    bookLang.value = splittedHost[0];
  }
};

detectBookLang();

// restrict ability to order books for children under 10 month
function restrictAge() {
  const today = new Date();
  const minDate = new Date(today);
  minDate.setMonth(today.getMonth() - 10); // Subtract 10 months from the current date
  dateInput.setAttribute("max", minDate.toISOString().split("T")[0]); // Set max date as 10 months ago
}

restrictAge();

$(progressbarClone).removeClass("current");
$('[data-form="progress"]').children().remove();
$('[data-text="total-steps"]').text(steps.length);
$('[data-form="submit-btn"]').hide();
curStep = curStep + 1;
$('[data-text="current-step"]').text(curStep);
steps.hide();

$('[data-form="next-btn"][type="submit"]').each(function () {
  $(this).attr("type", "button");
});

function getParams() {
  urlFormly.searchParams.forEach(function (val, key) {
    searchQ.push({ val, key });
    console.log(searchQ);
  });
}
function getSafe(fn, defaultVal) {
  try {
    return fn();
  } catch (e) {
    return defaultVal;
  }
}

if (savedFilledInput && memory) {
  savedFilledInput.forEach((x) => {
    console.log("Pre-fill: ", x.inputName, x.value, x.type, x.inputType);

    if (
      $(`input[name="${x.inputName}"][value="${x.value}"]`).attr("type") ===
      "radio"
    ) {
      $(`input[name="${x.inputName}"][value="${x.value}"]`).click();
      $(`input[name="${x.inputName}"][value="${x.value}"]`)
        .siblings(".w-radio-input")
        .addClass("w--redirected-checked");
    } else if (x.value === "on") {
      $(`input[name="${x.inputName}"]`).click();
      $(`input[name="${x.inputName}"]`)
        .siblings(".w-checkbox-input")
        .addClass("w--redirected-checked");
    } else {
      $(`input[name="${x.inputName}"]`).val(x.value);
      $(`textarea[name="${x.inputName}"]`).val(x.value);
      $(`select[name="${x.inputName}"]`)
        .find(`option[value="${x.value}"]`)
        .prop("selected", true);
    }
  });
}

if (params) {
  getParams();
  searchQ.forEach((y) => {
    console.info("Query param: ", y.key, y.val);
    console.log(y, $(`input[value="${y.val}"]`).attr("type"));
    if (
      $(`input[name="${y.key}"][value="${y.val}"]`).attr("type") === "radio"
    ) {
      $(`input[name="${y.key}"][value="${y.val}"]`).click();
      $(`input[name="${y.key}"][value="${y.val}"]`)
        .siblings(".w-radio-input")
        .addClass("w--redirected-checked");
    } else if (y.val === "on") {
      $(`input[name="${y.key}"]`).click();
      $(`input[name="${y.key}"]`)
        .siblings(".w-checkbox-input")
        .addClass("w--redirected-checked");
    } else {
      $(`input[name="${y.key}"]`).val(y.val);
      $(`textarea[name="${y.key}"]`).val(y.val);
      $(`select[name="${y.key}"]`)
        .find(`option[value="${y.val}"]`)
        .prop("selected", true);
    }
  });
}

if (quiz) {
  steps.each(function () {
    $(this).children().attr("data-radio-skip", true);
    $(this).children().attr("data-radio-delay", 250);
  });
}

function saveFilledInput() {
  $('form[data-form="multistep"] :input')
    .not('[type="submit"]')
    .each(function () {
      if (
        $(this).attr("type") === "checkbox" ||
        $(this).attr("type") === "radio"
      ) {
        if ($(this).prop("checked")) {
          if (filledInput.some((e) => e.inputName === $(this).attr("name"))) {
            filledInput = filledInput.filter(
              (e) => e.inputName !== $(this).attr("name")
            );

            if ($(this).val() !== "") {
              filledInput.push({
                inputName: $(this).attr("name"),
                value: $(this).val(),
              });
            }
          } else {
            if ($(this).val() !== "") {
              filledInput.push({
                inputName: $(this).attr("name"),
                value: $(this).val(),
              });
            }
          }
        }
      } else {
        if (filledInput.some((e) => e.inputName === $(this).attr("name"))) {
          filledInput = filledInput.filter(
            (e) => e.inputName !== $(this).attr("name")
          );

          if ($(this).val() !== "") {
            filledInput.push({
              inputName: $(this).attr("name"),
              value: $(this).val(),
            });
          }
        } else {
          if ($(this).val() !== "") {
            filledInput.push({
              inputName: $(this).attr("name"),
              value: $(this).val(),
            });
          }
        }
      }
    });
  // console.log(filledInput);
  if (filledInput) {
    filledInput.forEach((x) => {
      //console.log(x)
      urlFormly.searchParams.delete(x.inputName);
      urlFormly.searchParams.set(x.inputName, x.value);
      window.history.replaceState(null, null, urlFormly); // or pushState
    });
  }

  localStorage.removeItem("filledInput");
  localStorage.setItem("filledInput", JSON.stringify(filledInput));
}

function scrollTop() {
  $("html, body").animate(
    {
      scrollTop: $('[data-form="multistep"]').offset().top - 300,
    },
    400
  );
}

function updateStep() {
  inputFilled = true;
  radioFilled = true;
  checkboxFilled = true;
  selectFilled = true;
  textareaFilled = true;
  emailFilled = true;
  emptyInput = 0;
  empReqInput = [];
  empReqSelect = [];
  empReqTextarea = [];
  selections = [];

  // custom clickable progress indicator
  if ($("[data-clickable]").data("clickable")) {
    console.log("clickable indicator");
    steps.find(":input[required]").each(function () {
      $(
        $('[data-form="custom-progress-indicator"]')[
          $(this).parents('[data-form="step"]').index()
        ]
      ).text(
        $(
          $('[data-form="custom-progress-indicator"]')[
            $(this).parents('[data-form="step"]').index()
          ]
        )
          .text()
          .replace("*", "")
      );
      if ($(this).val() === "") {
        emptyInput++;
        $(
          $('[data-form="custom-progress-indicator"]')[
            $(this).parents('[data-form="step"]').index()
          ]
        ).append("*");
      }
    });
    if (emptyInput > 0) {
      $('input[type="submit"]').addClass("disabled");
    } else {
      $('input[type="submit"]').removeClass("disabled");
    }
  }

  $('[data-form="custom-progress-indicator"]').removeClass("current");
  $($('[data-form="custom-progress-indicator"]')[x]).addClass("current");

  //conditional logic
  selection = selections.filter((y) => y.step === x - 1);

  if (next) {
    x = getSafe(() => selection[0]["skipTo"])
      ? parseInt(getSafe(() => selection[0]["skipTo"]))
      : x;
  }

  $("[data-answer]").hide();

  //hide unhide steps
  steps.hide();
  if (reinitIX === true) {
    window.Webflow.destroy();
  }

  $(progressbar).removeClass("current");

  for (let i = 0; i <= x; i++) {
    $(progressbar[i]).addClass("current");
  }
  if (reinitIX === true) {
    window.Webflow && window.Webflow.require("ix2").init();
    document.dispatchEvent(new Event("readystatechange"));
    $(steps[x]).show();
  } else {
    $(steps[x]).fadeIn("slow");
  }

  if (x === 0 && !$(steps[x]).data("card")) {
    console.log("First step");
    $(steps[x]).find(`[data-answer]`).show();
  }

  if (selection.length > 0) {
    console.log("Selection 1", selection[0].selected);
    $(steps[x]).find(`[data-answer="${selection[0].selected}"]`).show();
  } else {
    console.log("Selection 2", answer);
    $(steps[x]).find(`[data-answer="${answer}"]`).show();
  }

  //hide unhide button depanding on step
  if (x === 0) {
    $('[data-form="back-btn"]').hide();
    $('[data-form="next-btn"]').show();
  } else if (
    x === steps.length - 1 ||
    $(steps[x]).find('[data-form="submit"]:visible').length > 0
  ) {
    $('[data-form="next-btn"]').hide();
    $('[data-form="submit-btn"]').show();
    $('[data-form="back-btn"]').show();
  } else {
    $('[data-form="next-btn"]').show();
    $('[data-form="back-btn"]').show();
    $('[data-form="submit-btn"]').hide();
  }

  //focus first input in every step
  $($(steps[x]).find("input[autofocus]")[0]).focus();
  $($(steps[x]).find("textarea[autofocus]")[0]).focus();
  validation(
    x,
    steps,
    radioFilled,
    inputFilled,
    telFilled,
    dateFilled,
    selectFilled,
    emailFilled,
    fileFilled
  );

  for (let idx = 0; idx <= progress; idx++) {
    $($('[data-form="custom-progress-indicator"]')[idx]).removeClass(
      "disabled"
    );
  }
}

function nextStep() {
  x++;
  if (x > progress) {
    progress = x;
  }
  if (x <= steps.length - 1) {
    updateStep();
    if (memory) {
      saveFilledInput();
    }
    $('[data-text="current-step"]').text(
      $(steps[x]).data("card") ? (curStep = x + 0) : (curStep = x + 1)
    );
  }
  return x;
}

function backStep() {
  if (x > 0) {
    $(progressbar[x]).removeClass("current");
    selections.filter((sk) => sk.skipTo === x).length > 0
      ? (x = parseInt(
          getSafe(() => selections.filter((sk) => sk.skipTo === x)[0].backTo)
        ))
      : x--;

    updateStep();
  }
  $('[data-text="current-step"]').text((curStep = x + 1));
}

$("body").on("keypress", function (e) {
  if (e.keyCode === 13 && fill) {
    if ($("[data-enter]").data("enter")) {
      $('[data-form="next-btn"]')[0].click();
      e.preventDefault();
      e.stopPropagation();
    } else {
      e.preventDefault();
      e.stopPropagation();
    }
  }
});

$("body").keydown(function (e) {
  if ((e.metaKey || e.ctrlKey) && e.keyCode == 13) {
    if (x >= steps.length - 1 && fill) {
      $('[data-form="submit-btn"]').click();
    } else {
      event.preventDefault();
      event.stopPropagation();
    }
  }
});

function selectionQuiz() {
  if ($(this).find('[data-btn="check"]')) {
    $("[data-selection]").hide();
    if ($(`[data-selection="${selString}"]`).data("selection")) {
      $(`[data-selection="${selString}"]`).fadeIn();
    } else {
      $('[data-selection="other"]').fadeIn();
    }
  }
}

$('[data-form="next-btn"]').on("click", function () {
  console.log("Clicked to continue");
  scrollTop();
  next = true;
  let step_number = nextStep();
  console.log("Step number: ", step_number);
  selectionQuiz();
});

$('[data-form="back-btn"]').on("click", function () {
  scrollTop();
  next = false;
  backStep();
});

$(steps)
  .find(":input")
  .on("input", function (input) {
    validation(
      x,
      steps,
      radioFilled,
      inputFilled,
      telFilled,
      dateFilled,
      selectFilled,
      emailFilled,
      fileFilled
    );
  });

$(steps)
  .find(":radio")
  .on("click", function () {
    if ($(steps[x]).find(":input").is(":checked")) {
      skipTo = undefined;
      if ($(this).parents("[data-skip-to]").data("skip-to")) {
        skipTo = $(this).parents("[data-skip-to]").data("skip-to");
      } else if ($(this).data("skip-to")) {
        skipTo = $(this).data("skip-to");
      }

      selArr = [];
      $(steps)
        .find("[data-selected]:checked")
        .each(function (y, i) {
          selArr.push({ selected: $(this).data("selected") });
        });

      selString = [];
      selArr.forEach((sel) => selString.push(sel.selected));

      console.log("Radio button selected", $(this).val());
      if ($(this).val() === "Girl") {
        is_boy = false;
      } else {
        is_boy = true;
      }
      changeImage(image_changed, is_boy);
      $(steps[x])
        .find("[data-answer]:visible")
        .find(":input[type='radio']:checked")
        .each(function () {
          if ($(this).data("go-to")) {
            answer = $(this).attr("data-go-to");
            selections = selections.filter((y) => y.step !== x);
            selections.push({ step: x, selected: answer });
            if (skipTo) {
              selections.push({ step: skipTo - 2, selected: answer });
              objIndex = selections.findIndex((obj) => obj.step === x);
              selections[objIndex].skipTo = parseInt(skipTo) - 1;
              selections[objIndex].backTo = x;
            }
          } else if ($(this).parents("[data-go-to]").data("go-to")) {
            answer = $(this).parents("[data-go-to]").data("go-to");
            selections = selections.filter((y) => y.step !== x);
            selections.push({ step: x, selected: answer });
            if (skipTo) {
              selections.push({ step: skipTo - 2, selected: answer });
              objIndex = selections.findIndex((obj) => obj.step === x);
              selections[objIndex].skipTo = parseInt(skipTo) - 1;
              selections[objIndex].backTo = x;
            }
          }
        });

      if (
        $(steps[x]).find("[data-radio-skip]:visible").data("radio-skip") ===
        true
      ) {
        if (
          textareaLength === 0 &&
          textInputLength === 0 &&
          emailInputLength === 0 &&
          checkboxInputLength === 0
        ) {
          setTimeout(function () {
            next = true;
            nextStep();
            selectionQuiz();
          }, $(steps[x]).find("[data-radio-delay]").data("radio-delay"));
        }
      }
    }
  });

////////////////////////////custom indicator nav
if ($("[data-clickable-all]").data("clickable-all")) {
  $('[data-form="custom-progress-indicator"]').removeClass("disabled");
} else {
  $('[data-form="custom-progress-indicator"]').addClass("disabled");
}
function clickableIndicator() {
  console.log("qweqweqwe");
  $('[data-form="progress-indicator"]').removeClass("current");
  if ($("[data-clickable]").data("clickable")) {
    if ($("[data-clickable]").data("clickable-all")) {
      x = $(this).index();
      updateStep();
    } else {
      if ($(this).index() <= progress) {
        x = $(this).index();
        updateStep();
      }
    }
  }
}
$('[data-form="custom-progress-indicator"]').on("click", clickableIndicator);
/////////////////////

/////debug mode//////////////////
if ($('[data-form="multistep"]').data("debug-mode")) {
  console.log("debug mode");
  //data go to attr
  $("[data-go-to]").each(function () {
    $(this).append("<br>Data Go To = ", $(this).data("go-to"));
  });
  //data answer attr
  $("[data-answer]").each(function () {
    $(this).append("<br>Data Answer = ", $(this).data("answer"));
  });
}
/////////////////////////////

$('[data-form="submit-btn"]').on("click", function (e) {
  console.log("clicked submit");

  e.preventDefault();
  e.stopPropagation();
  console.log("form is being submitted");

  if ($('[data-form="multistep"]').data("logic-extra")) {
    //if(x === $('[data-form="step"]:not([data-card="true"])').length || $(steps[x]).find('[data-form="submit"]:visible').length > 0){
    $(this).prop("novalidate", true);
    $(steps).find(":input").prop("required", false);
    console.log("nonvalidated");
  }

  //function to remove unanswered card
  if ($('[data-form="multistep"]').data("remove-unfilled")) {
    for (j = 1; j <= selections.length; j++) {
      $(steps[j])
        .find(
          `[data-answer]:not([data-answer="${selections[j - 1].selected}"])`
        )
        .remove();
    }
  }

  localStorage.removeItem("filledInput");
  if (fill) {
    if ($(this).data("wait")) {
      $(this).val($(this).data("wait"));
    } else {
      $(this).val("Please wait...");
      $(this).text("Please wait...");
    }
    // $('[data-form="multistep"]').submit();
    $('[data-form="multistep"]').trigger("submit");
  }
});

steps.each(function () {
  $('[data-form="progress"]').append(progressbarClone.clone(true, true));
});
progressbar = $('[data-form="progress"]').children();
$('[data-form="progress-indicator"]').on("click", clickableIndicator);
updateStep();

$("textarea").keypress(function (event) {
  $(this).focus();
  if (event.key == "Enter") {
    event.preventDefault();
    event.stopPropagation();
  }

  if (event.shiftKey && event.key == "Enter") {
    $(this).val($(this).val() + "\n");
  }
});
