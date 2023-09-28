function validation() {
  //conditional logic

  if ($(steps[x]).data("card")) {
    enableBtn();
  }

  textareaLength = $(steps[x]).find("textarea[required]:visible").length;
  textInputLength = $(steps[x]).find(
    'input[type="text"][required]:visible'
  ).length;
  selectInputLength = $(steps[x]).find("select[required]:visible").length;
  emailInputLength = $(steps[x]).find('input[type="email"]:visible').length;
  checkboxInputLength = $(steps[x]).find(
    'input[type="checkbox"]:visible'
  ).length;
  // console.log($(steps[x]).find('input[type="text"][required]:visible'));
  if (textInputLength > 0 || selectInputLength > 0 || textareaLength > 0) {
    disableBtn();
  } else {
    enableBtn();
  }

  var checkCount = $(steps[x]).data("checkbox")
    ? $(steps[x]).data("checkbox")
    : 0;

  if (!$("[data-logic-extra]").data("logic-extra")) {
    if ($(steps[x]).find(":input").is('[type="checkbox"]')) {
      console.log("checkbox step val: " + checkCount);
      if (
        checkCount === "*" ||
        checkCount > $(steps[x]).find(':input[type="checkbox"]').length
      ) {
        $(steps[x])
          .find(':input[type="checkbox"]')
          .each(function () {
            if ($(this).is(":checked")) {
              if ($(steps[x]).find(":input[required]").length < 1) {
                checkboxFilled = true;
              }
            } else {
              checkboxFilled = false;
            }
          });
      } else {
        if (
          $(steps[x]).find(':input[type="checkbox"]:checked').length >=
          checkCount
        ) {
          checkboxFilled = true;
        } else {
          checkboxFilled = false;
        }
      }
    }

    if ($(steps[x]).find(":input[required]").is('[type="radio"]')) {
      if ($(steps[x]).find(':input[type="radio"]').is(":checked")) {
        radioFilled = true;
      } else {
        radioFilled = false;
      }
    }

    $(steps[x])
      .find(':input[type="text"][required]')
      .each(function (i) {
        console.log("Text input step val: " + $(this).val());
        if ($(this).val() !== "") {
          empReqInput = empReqInput.filter((y) => y.input !== i);
        } else {
          if (!empReqInput.find((y) => y.input === i)) {
            empReqInput.push({ input: i });
          }
        }

        if (empReqInput.length === 0) {
          inputFilled = true;
        } else {
          inputFilled = false;
        }
      });

    // const requiredTextInputFields = $(steps[x]).find(
    //   ':input[type="text"][required]'
    // );

    // requiredTextInputFields.each(function (i) {
    //   const inputValue = $(this).val();

    //   console.log(empReqInput);
    //   console.log("Text input step val: " + inputValue);

    //   const existingInputIndex = empReqInput.findIndex((y) => y.input === i);

    //   if (inputValue !== "") {
    //     if (existingInputIndex !== -1) {
    //       empReqInput.splice(existingInputIndex, 1);
    //     }
    //   } else {
    //     if (existingInputIndex === -1) {
    //       empReqInput.push({ input: i });
    //     }
    //   }

    //   inputFilled = empReqInput.length === 0;
    // });

    $(steps[x])
      .find(':input[type="tel"][required]')
      .each(function (i) {
        console.log("Tel input step val: " + $(this).val());

        if ($(this).val() !== "") {
          empReqTel = empReqTel.filter((y) => y.input !== i);
        } else {
          if (!empReqTel.find((y) => y.input === i)) {
            empReqTel.push({ input: i });
          }
        }

        if (empReqTel.length === 0) {
          telFilled = true;
        } else {
          telFilled = false;
        }
      });

    $(steps[x])
      .find(':input[type="date"][required]')
      .each(function (i) {
        console.log("Date input step val: " + $(this).val());

        if ($(this).val() !== "") {
          empReqDate = empReqDate.filter((y) => y.input !== i);
        } else {
          if (!empReqDate.find((y) => y.input === i)) {
            empReqDate.push({ input: i });
          }
        }

        if (empReqDate.length === 0) {
          dateFilled = true;
        } else {
          dateFilled = false;
        }
      });

    $(steps[x])
      .find(':input[type="file"][required]')
      .each(function (i) {
        console.log("File input step val: " + $(this).val());
        changeImage();

        let empReqFile = [];

        if ($(this).val() !== "") {
          empReqFile = empReqFile.filter((y) => y.input !== i);
        } else {
          if (!empReqFile.find((y) => y.input === i)) {
            empReqFile.push({ input: i });
          }
        }

        if (empReqFile.length === 0) {
          fileFilled = true;
        } else {
          fileFilled = false;
        }
      });

    // Happens when clicking the "remove" button on the file upload
    $(steps[x])
      .find(".w-icon-file-upload-remove")
      .on("click", function () {
        console.log("1. User removed a file " + $(this).val());
        disableBtn();
      });

    // Happens when clicking the "remove" button on the file upload
    $(steps[x])
      .find(".link-5.w-file-remove-link")
      .on("click", function () {
        console.log("2. User removed a file " + $(this).val());
        disableBtn();
      });

    $(steps[x])
      .find(".link-back.w-inline-block")
      .on("click", function () {
        console.log("User clicked back" + $(this).val());
        enableBtn();
        setAllChecksToTrue();
      });

    $(steps[x])
      .find("select[required]")
      .each(function (i) {
        console.log("Select input step val: " + $(this).val());

        if ($(this).val() !== "") {
          empReqSelect = empReqSelect.filter((y) => y.input !== i);
        } else {
          if (!empReqSelect.find((y) => y.input === i)) {
            empReqSelect.push({ input: i });
          }
        }

        if (empReqSelect.length === 0) {
          selectFilled = true;
        } else {
          selectFilled = false;
        }
      });

    $(steps[x])
      .find("textarea[required]")
      .each(function (i) {
        console.log("Textarea input step val: " + $(this).val());
        if ($(this).val() !== "") {
          empReqTextarea = empReqTextarea.filter((y) => y.input !== i);
        } else {
          if (!empReqTextarea.find((y) => y.input === i)) {
            empReqTextarea.push({ input: i });
          }
        }

        if (empReqTextarea.length === 0) {
          textareaFilled = true;
        } else {
          textareaFilled = false;
        }
      });

    $(steps[x])
      .find(':input[type="email"][required]')
      .each(function () {
        console.log("Email input step val: " + $(this).val());
        if ($(this).val() !== "") {
          validateEmail($(this).val(), $(this).data("block-domain"));
        } else {
          emailFilled = false;
        }
      });
  } else {
    //////////////////////////////////logic extra validation//////////////////////////////////////////////////
    if ($(steps[x]).data("card")) {
      answer = $(steps[x]).find("[data-go-to]").data("go-to");
      selections = selections.filter((y) => y.step !== x);
      selections.push({ step: x, selected: answer });
      console.log(selections);
    }

    /////////////////////////////////checkbox validation//////////////////////////////////////
    // if (
    //   $(steps[x])
    //     .find("[data-answer]:visible")
    //     .find(":input")
    //     .is('[type="checkbox"]')
    // ) {
    //   if (
    //     checkCount === "*" ||
    //     checkCount > $(steps[x]).find(':input[type="checkbox"]').length
    //   ) {
    //     $(steps[x])
    //       .find(':input[type="checkbox"]')
    //       .each(function () {
    //         console.log("Checkbox input step val: " + $(this).val());
    //         if ($(this).is(":checked")) {
    //           if ($(steps[x]).find(":input[required]").length < 1) {
    //             if ($(this).parents("[data-go-to]").attr("data-go-to")) {
    //               answer = $(this).parents("[data-go-to]").attr("data-go-to");
    //               selections = selections.filter((y) => y.step !== x);
    //               selections.push({ step: x, selected: answer });
    //             }
    //             checkboxFilled = true;
    //           }
    //         } else {
    //           checkboxFilled = false;
    //         }
    //       });
    //   } else {
    //     if (
    //       $(steps[x])
    //         .find("[data-answer]:visible")
    //         .find(':input[type="checkbox"]:checked').length >= checkCount
    //     ) {
    //       console.log("Checkbox input step val: " + $(this).val());

    //       if (
    //         $(steps[x])
    //           .find("[data-answer]:visible")
    //           .find(':input[type="checkbox"]:checked')
    //           .parents("[data-go-to]")
    //           .attr("data-go-to")
    //       ) {
    //         answer = $(steps[x])
    //           .find("[data-answer]:visible")
    //           .find(':input[type="checkbox"]:checked')
    //           .parents("[data-go-to]")
    //           .attr("data-go-to");
    //         selections = selections.filter((y) => y.step !== x);
    //         selections.push({ step: x, selected: answer });
    //       }
    //       selections = selections.filter((y) => y.step !== x);
    //       selections.push({ step: x, selected: answer });
    //       checkboxFilled = true;
    //       //}
    //     } else {
    //       checkboxFilled = false;
    //     }
    //   }
    // }

    //////////////////////////////////radio input validation////////////////////////////////////////////
    // if (
    //   $(steps[x])
    //     .find("[data-answer]:visible")
    //     .find(":input[required]")
    //     .is('[type="radio"]')
    // ) {
    //   if (
    //     $(steps[x])
    //       .find("[data-answer]:visible")
    //       .find(':input[type="radio"][required]')
    //       .is(":checked")
    //   ) {
    //     console.log("Radio input step val: " + $(this).val());
    //     radioFilled = true;
    //   } else {
    //     radioFilled = false;
    //   }
    // } else {
    //   radioFilled = true;
    // }

    //////////////////////////text input validation/////////////////////////////////////
    // $(steps[x])
    //   .find("[data-answer]:visible")
    //   .find(':input[type="text"][required]')
    //   .each(function (i) {
    //     console.log("Text input step val: " + $(this).val());
    //     if ($(this).val() !== "") {
    //       empReqInput = empReqInput.filter((y) => y.input !== i);
    //     } else {
    //       if (!empReqInput.find((y) => y.input === i)) {
    //         empReqInput.push({ input: i });
    //       }
    //     }
    //     console.log($(steps[x]).find("[data-answer]:visible"));
    //     if (empReqInput.length === 0) {
    //       inputFilled = true;
    //     } else {
    //       inputFilled = false;
    //     }
    //   });

    // $(steps[x])
    //   .find("[data-answer]:visible")
    //   .find(':input[type="text"]')
    //   .each(function (i) {
    //     console.log("Text input step val: " + $(this).val());
    //     skipTo = undefined;
    //     if ($(this).parents("[data-skip-to]").data("skip-to") !== "") {
    //       skipTo = $(this).parents("[data-skip-to]").data("skip-to");
    //     }
    //     if ($(this).parents("[data-go-to]").attr("data-go-to")) {
    //       answer = $(this).parents("[data-go-to]").attr("data-go-to");
    //       selections = selections.filter((y) => y.step !== x);
    //       selections.push({ step: x, selected: answer });
    //       if (skipTo) {
    //         selections.push({ step: skipTo - 2, selected: answer });
    //         objIndex = selections.findIndex((obj) => obj.step === x);
    //         selections[objIndex].skipTo = parseInt(skipTo) - 1;
    //         selections[objIndex].backTo = x;
    //       }
    //     }
    //   });

    //////////////////////////phone input validation/////////////////////////////////////
    // $(steps[x])
    //   .find("[data-answer]:visible")
    //   .find(':input[type="tel"][required]')
    //   .each(function (i) {
    //     console.log("Phone input step val: " + $(this).val());
    //     if ($(this).val() !== "") {
    //       empReqTel = empReqTel.filter((y) => y.input !== i);
    //     } else {
    //       if (!empReqTel.find((y) => y.input === i)) {
    //         empReqTel.push({ input: i });
    //       }
    //     }

    //     if (empReqTel.length === 0) {
    //       telFilled = true;
    //     } else {
    //       telFilled = false;
    //     }
    //   });

    // $(steps[x])
    //   .find("[data-answer]:visible")
    //   .find(':input[type="tel"]')
    //   .each(function (i) {
    //     console.log("Phone input step val: " + $(this).val());
    //     skipTo = undefined;
    //     if ($(this).parents("[data-skip-to]").data("skip-to") !== "") {
    //       skipTo = $(this).parents("[data-skip-to]").data("skip-to");
    //     }
    //     if ($(this).parents("[data-go-to]").attr("data-go-to")) {
    //       answer = $(this).parents("[data-go-to]").attr("data-go-to");
    //       selections = selections.filter((y) => y.step !== x);
    //       selections.push({ step: x, selected: answer });
    //       if (skipTo) {
    //         selections.push({ step: skipTo - 2, selected: answer });
    //         objIndex = selections.findIndex((obj) => obj.step === x);
    //         selections[objIndex].skipTo = parseInt(skipTo) - 1;
    //         selections[objIndex].backTo = x;
    //       }
    //     }
    //   });

    //////////////////////////file input validation/////////////////////////////////////
    // $(steps[x])
    //   .find("[data-answer]:visible")
    //   .find(':input[type="file"][required]')
    //   .each(function (i) {
    //     console.log("File input validation val: " + $(this).val());

    //     if ($(this).val() !== "") {
    //       empReqfile = empReqfile.filter((y) => y.input !== i);
    //     } else {
    //       if (!empReqfile.find((y) => y.input === i)) {
    //         empReqfile.push({ input: i });
    //       }
    //     }

    //     if (empReqfile.length === 0) {
    //       fileFilled = true;
    //     } else {
    //       fileFilled = false;
    //     }
    //   });

    // $(steps[x])
    //   .find("[data-answer]:visible")
    //   .find(':input[type="file"]')
    //   .each(function (i) {
    //     console.log("File input validation val: " + $(this).val());

    //     skipTo = undefined;
    //     if ($(this).parents("[data-skip-to]").data("skip-to") !== "") {
    //       skipTo = $(this).parents("[data-skip-to]").data("skip-to");
    //     }
    //     if ($(this).parents("[data-go-to]").attr("data-go-to")) {
    //       answer = $(this).parents("[data-go-to]").attr("data-go-to");
    //       selections = selections.filter((y) => y.step !== x);
    //       selections.push({ step: x, selected: answer });
    //       if (skipTo) {
    //         selections.push({ step: skipTo - 2, selected: answer });
    //         objIndex = selections.findIndex((obj) => obj.step === x);
    //         selections[objIndex].skipTo = parseInt(skipTo) - 1;
    //         selections[objIndex].backTo = x;
    //       }
    //     }
    //   });

    //////////////////////////number input validation/////////////////////////////////////
    // $(steps[x])
    //   .find("[data-answer]:visible")
    //   .find(':input[type="number"][required]')
    //   .each(function (i) {
    //     console.log("Number input step val: " + $(this).val());
    //     if ($(this).val() !== "") {
    //       empReqInput = empReqInput.filter((y) => y.input !== i);
    //     } else {
    //       if (!empReqInput.find((y) => y.input === i)) {
    //         empReqInput.push({ input: i });
    //       }
    //     }

    //     if (empReqInput.length === 0) {
    //       inputFilled = true;
    //     } else {
    //       inputFilled = false;
    //     }
    //   });

    // $(steps[x])
    //   .find("[data-answer]:visible")
    //   .find(':input[type="number"]')
    //   .each(function (i) {
    //     console.log("Number input step val: " + $(this).val());
    //     skipTo = undefined;
    //     if ($(this).parents("[data-skip-to]").data("skip-to") !== "") {
    //       skipTo = $(this).parents("[data-skip-to]").data("skip-to");
    //     }
    //     if ($(this).parents("[data-go-to]").attr("data-go-to")) {
    //       answer = $(this).parents("[data-go-to]").attr("data-go-to");
    //       selections = selections.filter((y) => y.step !== x);
    //       selections.push({ step: x, selected: answer });
    //       if (skipTo) {
    //         selections.push({ step: skipTo - 2, selected: answer });
    //         objIndex = selections.findIndex((obj) => obj.step === x);
    //         selections[objIndex].skipTo = parseInt(skipTo) - 1;
    //         selections[objIndex].backTo = x;
    //       }
    //     }
    //   });

    //////////////////////////select input validation///////////////////////////////////
    // $(steps[x])
    //   .find("[data-answer]:visible")
    //   .find("select[required]")
    //   .each(function (i) {
    //     console.log("Select input step val: " + $(this).val());
    //     if ($(this).val() !== "") {
    //       empReqSelect = empReqSelect.filter((y) => y.input !== i);
    //     } else {
    //       if (!empReqSelect.find((y) => y.input === i)) {
    //         empReqSelect.push({ input: i });
    //       }
    //     }

    //     if (empReqSelect.length === 0) {
    //       selectFilled = true;
    //     } else {
    //       selectFilled = false;
    //     }
    //   });

    // $(steps[x])
    //   .find("[data-answer]:visible")
    //   .find("select")
    //   .each(function (i) {
    //     console.log("Select input step val: " + $(this).val());
    //     skipTo = undefined;
    //     if ($(this).parents("[data-skip-to]").data("skip-to") !== "") {
    //       skipTo = $(this).parents("[data-skip-to]").data("skip-to");
    //     }
    //     if ($(this).parents("[data-go-to]").attr("data-go-to")) {
    //       answer = $(this).parents("[data-go-to]").attr("data-go-to");
    //       selections = selections.filter((y) => y.step !== x);
    //       selections.push({ step: x, selected: answer });
    //       if (skipTo) {
    //         selections.push({ step: skipTo - 2, selected: answer });
    //         objIndex = selections.findIndex((obj) => obj.step === x);
    //         selections[objIndex].skipTo = parseInt(skipTo) - 1;
    //         selections[objIndex].backTo = x;
    //       }
    //     }
    //   });

    //////////////////////////textarea validation////////////////////////////////
    // $(steps[x])
    //   .find("[data-answer]:visible")
    //   .find("textarea[required]")
    //   .each(function (i) {
    //     console.log("Textarea input step val: " + $(this).val());
    //     if ($(this).val() !== "") {
    //       empReqTextarea = empReqTextarea.filter((y) => y.input !== i);
    //     } else {
    //       if (!empReqTextarea.find((y) => y.input === i)) {
    //         empReqTextarea.push({ input: i });
    //       }
    //     }

    //     if (empReqTextarea.length === 0) {
    //       textareaFilled = true;
    //     } else {
    //       textareaFilled = false;
    //     }
    //   });

    // $(steps[x])
    //   .find("[data-answer]:visible")
    //   .find("textarea")
    //   .each(function (i) {
    //     console.log("Textarea input step val: " + $(this).val());
    //     skipTo = undefined;
    //     if ($(this).parents("[data-skip-to]").data("skip-to") !== "") {
    //       skipTo = $(this).parents("[data-skip-to]").data("skip-to");
    //     }
    //     if ($(this).parents("[data-go-to]").attr("data-go-to")) {
    //       answer = $(this).parents("[data-go-to]").attr("data-go-to");
    //       selections = selections.filter((y) => y.step !== x);
    //       selections.push({ step: x, selected: answer });
    //       if (skipTo) {
    //         selections.push({ step: skipTo - 2, selected: answer });
    //         objIndex = selections.findIndex((obj) => obj.step === x);
    //         selections[objIndex].skipTo = parseInt(skipTo) - 1;
    //         selections[objIndex].backTo = x;
    //       }
    //     }
    //   });

    /////////////////////////email validation//////////////////////////////////////
    // $(steps[x])
    //   .find("[data-answer]:visible")
    //   .find(':input[type="email"][required]')
    //   .each(function (m) {
    //     console.log("Email input step val: " + $(this).val());
    //     if ($(this).val() !== "") {
    //       validateEmail($(this).val(), $(this).data("block-domain"));
    //     } else {
    //       emailFilled = false;
    //     }
    //   });

    // $(steps[x])
    //   .find("[data-answer]:visible")
    //   .find(':input[type="email"]')
    //   .each(function (m) {
    //     console.log("Email input step val: " + $(this).val());
    //     skipTo = undefined;
    //     if ($(this).parents("[data-skip-to]").data("skip-to") !== "") {
    //       skipTo = $(this).parents("[data-skip-to]").data("skip-to");
    //     }
    //     if ($(this).parents("[data-go-to]").attr("data-go-to")) {
    //       answer = $(this).parents("[data-go-to]").attr("data-go-to");
    //       selections = selections.filter((y) => y.step !== x);
    //       selections.push({ step: x, selected: answer });
    //       if (skipTo) {
    //         selections.push({ step: skipTo - 2, selected: answer });
    //         objIndex = selections.findIndex((obj) => obj.step === x);
    //         selections[objIndex].skipTo = parseInt(skipTo) - 1;
    //         selections[objIndex].backTo = x;
    //       }
    //     }
    //   });

    /////////////////////////date validation//////////////////////////////////////
    // $(steps[x])
    //   .find("[data-answer]:visible")
    //   .find(':input[type="date"][required]')
    //   .each(function (m) {
    //     console.log("date", $(this).val());

    //     if ($(this).val() !== "") {
    //       empReqDate = empReqDate.filter((y) => y.input !== m);
    //     } else {
    //       if (!empReqDate.find((y) => y.input === m)) {
    //         empReqDate.push({ input: m });
    //       }
    //     }

    //     if (empReqDate.length === 0) {
    //       dateFilled = true;
    //     } else {
    //       dateFilled = false;
    //     }
    //   });

    // $(steps[x])
    //   .find("[data-answer]:visible")
    //   .find(':input[type="date"]')
    //   .each(function (m) {
    //     console.log("date2", $(this).val());
    //     skipTo = undefined;
    //     if ($(this).parents("[data-skip-to]").data("skip-to") !== "") {
    //       skipTo = $(this).parents("[data-skip-to]").data("skip-to");
    //     }
    //     if ($(this).parents("[data-go-to]").attr("data-go-to")) {
    //       answer = $(this).parents("[data-go-to]").attr("data-go-to");
    //       selections = selections.filter((y) => y.step !== x);
    //       selections.push({ step: x, selected: answer });
    //       if (skipTo) {
    //         selections.push({ step: skipTo - 2, selected: answer });
    //         objIndex = selections.findIndex((obj) => obj.step === x);
    //         selections[objIndex].skipTo = parseInt(skipTo) - 1;
    //         selections[objIndex].backTo = x;
    //       }
    //     }
    //   });
  }

  function setAllChecksToTrue() {
    inputFilled = true;
    dateFilled = true;
    checkboxFilled = true;
    telFilled = true;
    radioFilled = true;
    emailFilled = true;
    domainAllowed = true;
    selectFilled = true;
    fileFilled = true;
    textareaFilled = true;
  }

  if (
    inputFilled &&
    dateFilled &&
    checkboxFilled &&
    telFilled &&
    radioFilled &&
    emailFilled &&
    domainAllowed &&
    selectFilled &&
    fileFilled &&
    textareaFilled
  ) {
    console.log(
      "ENABLING BOTTON BECAUSE inputFilled: " +
        inputFilled +
        " dateFilled: " +
        dateFilled +
        "checkboxFilled: " +
        checkboxFilled +
        " telFilled: " +
        telFilled +
        " radioFilled: " +
        radioFilled +
        " emailFilled: " +
        emailFilled +
        " domainAllowed: " +
        domainAllowed +
        " selectFilled: " +
        selectFilled +
        " fileFilled: " +
        fileFilled +
        " textareaFilled: " +
        textareaFilled
    );
    enableBtn();
  } else {
    console.log(
      "DISABLING BOTTON BECAUSE inputFilled: " +
        inputFilled +
        " dateFilled: " +
        dateFilled +
        "checkboxFilled: " +
        checkboxFilled +
        " telFilled: " +
        telFilled +
        " radioFilled: " +
        radioFilled +
        " emailFilled: " +
        emailFilled +
        " domainAllowed: " +
        domainAllowed +
        " selectFilled: " +
        selectFilled +
        " fileFilled: " +
        fileFilled +
        " textareaFilled: " +
        textareaFilled
    );
    disableBtn();
  }
}
