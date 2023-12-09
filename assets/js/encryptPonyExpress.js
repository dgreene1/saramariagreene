(function (document) {
  // This is a custom algorithm that I (Dan Greene) came up with. It's not fancy, it's just obfuscated

  // Declare variables
  const DEBUG_MODE_FLAG_NAME = "DEBUG_PONY_CODE";
  const selectorForReplacement = ".email-element";
  const obfuscatedEmailAddress = "zbp.yvnzt@rarret1nvenz1nenf";

  // Declare helper functions
  function rot13(input) {
    return input.replace(/[a-zA-Z]/g, function (c) {
      return String.fromCharCode(
        (c <= "Z" ? 90 : 122) >= (c = c.charCodeAt(0) + 13) ? c : c - 26
      );
    });
  }

  function debugLog(textToLog, objToLog) {
    if (localStorage.getItem(DEBUG_MODE_FLAG_NAME) === "true") {
      console.log(textToLog, objToLog);
    }
  }

  function reverse(input) {
    return input.split("").reverse().join("");
  }

  /**
   * Does the same encryption in reverse
   * @param {string} input expected to be an email that was reversed and then run through a rot13
   */
  function unobfuscate(input) {
    return rot13(reverse(input));
  }

  function run() {
    debugLog("start of run");
    const unObfuscatedEmail = unobfuscate(obfuscatedEmailAddress);
    debugLog(`unobfuscatedReplacemnt is: ${unObfuscatedEmail}`);

    //    find the element(s)
    //    then replace
    document.querySelectorAll(selectorForReplacement).forEach((item) => {
      debugLog("found item", item);

      // Make the element so that the replacement doesn't show up as text (instead of real HTML tags)
      const mailElement = document.createElement("a");
      mailElement.href = `mailto:${unObfuscatedEmail}`;
      mailElement.rel = "nofollow";
      mailElement.text = unObfuscatedEmail;
      debugLog("element we will replace with is", mailElement);

      item.innerHTML = "";
      item.appendChild(mailElement);
    });
    debugLog(`done replacements.`);
  }

  // Do the replacement
  run();
})(document);
