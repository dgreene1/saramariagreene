const fs = require("fs");
const path = require("path");

const indexMDFile = fs.readFileSync(path.join(".", "index.md"), "utf-8");

const htmlTagsThatDoNotSelfClose = ["a", "p", "div"];

const getTextWithinATag = (htmlString) => {
  return htmlString.substring(
    htmlString.indexOf(">") + 1,
    htmlString.lastIndexOf("<")
  );
};

/**
 *
 * @param {string} textToSearch
 * @param {string} tagName
 */
const isTagClosed = (textToSearch, tagName) => {
  const openingTags = textToSearch.match(new RegExp(`<${tagName}`, "g"));
  const countOfOpeningTags = !!openingTags ? openingTags.length : 0;

  const closingTags = textToSearch.match(new RegExp(`<\/${tagName}`, "g"));
  const countOfClosingTags = !!closingTags ? closingTags.length : 0;

  return countOfOpeningTags === countOfClosingTags;
};

htmlTagsThatDoNotSelfClose.forEach((aTagName) => {
  if (!isTagClosed(indexMDFile, aTagName)) {
    throw new Error(`Tag ${aTagName} has not been closed`);
  }
});

/**
 * Checks to make sure that {::nomarkdown} doesn't miss {:/nomarkdown}
 * @param {string} textToSearch
 * @param {string} tagName
 */
const throwIfMarkdownIsNotClosed = (textToSearch) => {
  const openingTags = textToSearch.match(new RegExp(`{::nomarkdown}`, "g"));
  const countOfOpeningTags = !!openingTags ? openingTags.length : 0;

  const closingTags = textToSearch.match(new RegExp(`{:/nomarkdown}`, "g"));
  const countOfClosingTags = !!closingTags ? closingTags.length : 0;

  if (countOfOpeningTags !== countOfClosingTags) {
    throw new Error(`Missing closing tags for nomarkdown`);
  }
};

throwIfMarkdownIsNotClosed(indexMDFile);

/**
 * Checks to make sure that _ is not an even number
 * @param {string} textToSearch
 */
const throwIfItalicIsNotClosed = (textToSearch) => {
  const italicTags = textToSearch.match(/\*/g);

  const countOfItalicTags = !!italicTags ? italicTags.length : 0;

  const isEven = countOfItalicTags % 2 === 0;

  if (!isEven) {
    throw new Error(
      `An uneven number of italic tags (the * symbol) were found`
    );
  }
};

throwIfItalicIsNotClosed(indexMDFile);

/**
 * Ensures that * or _ doesn't occur inside nomarkdown
 * @param {string} textToSearch
 */
const throwIfHTMLContainsMarkdown = (textToSearch) => {
  // Because of a peculiarity with .match, we'll do this test every time nomarkdown is used
  const END_OF_NO_MARKDOWN = "{:/nomarkdown}";
  const trials = textToSearch
    .split(END_OF_NO_MARKDOWN)
    .map((x) => x + END_OF_NO_MARKDOWN);

  trials.forEach((searchStr) => {
    const sectionsOfNoMarkdown = searchStr.match(
      /({::nomarkdown}).*({:\/nomarkdown})/g
    );

    if (!sectionsOfNoMarkdown) {
      return;
    }

    sectionsOfNoMarkdown.forEach((chunk) => {
      const markdownTokensToCheck = ["*", "_"];

      // check outside of the tags
      markdownTokensToCheck.forEach((badToken) => {
        const charBeforeEndOfNoMarkdown = chunk.substring(
          chunk.indexOf(END_OF_NO_MARKDOWN) - 1
        )[0];
        if (charBeforeEndOfNoMarkdown === badToken) {
          throw new Error(
            `Can not have ("${badToken}") before the end of ${END_OF_NO_MARKDOWN} but it was there: ${chunk}`
          );
        }
      });

      // check only the tag text
      const textWithinATag = getTextWithinATag(chunk);
      markdownTokensToCheck.forEach((badToken) => {
        if (textWithinATag.includes(badToken)) {
          throw new Error(
            `Found markdown ("${badToken}") in this chunk: ${chunk}  ...specifically in the text of the tag ("${textWithinATag}")`
          );
        }
      });
    });
  });
};

throwIfHTMLContainsMarkdown(indexMDFile);

console.log("END OF CUSTOM LINTER");
