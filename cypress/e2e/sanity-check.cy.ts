const checkAllLinksOnPageForDeadness = () => {
  cy.get("a").each((link) => {
    const hrefValue = link.prop("href");
    if (hrefValue)
      cy.request({
        url: hrefValue,
        failOnStatusCode: false,
      });
  });
};

describe("sanity check", () => {
  const screenTypes: Cypress.ViewportPreset[] = ["macbook-15", "iphone-xr"];

  screenTypes.forEach((screenType) => {
    it(`all of the pages for screenType: ${screenType}`, () => {
      const titleOfWebsite = "Sara Maria Greene";
      const classForSarasEmailLink = "email-element";
      const sarasEmailAddress = "sara1maria1greene@gmail.com";
      const sarasEmailLinkValue = `mailto:${sarasEmailAddress}`;
      const sectionTagId = "content-section-tag";
      cy.visit("/");
      cy.get("h1").should("have.text", titleOfWebsite);
      cy.viewport(screenType);
      cy.log(
        "make sure that our section tag that we use for mobile hash links is still there"
      );
      cy.get(`#${sectionTagId}`);
      cy.log(
        "are we making sure that every link will scroll the user down to the section when we're in mobile (so that the image doesn't take up all of the screen)?"
      );
      cy.get("#side-nav-links").each((el) => {
        expect(el.find("a"))
          .to.have.attr("href")
          .and.contains(`#${sectionTagId}`);
      });

      cy.log("Are we on the right page?");
      cy.get("h2").should("have.text", "About the Author");
      checkAllLinksOnPageForDeadness();
      // Take screenshots so we can see what the page looks like in Cypress Cloud before we deploy
      cy.scrollTo("top", { ensureScrollable: false });
      cy.screenshot(`${screenType} - top of homepage`);
      cy.scrollTo("bottom", { ensureScrollable: false });
      cy.screenshot(`${screenType} - bottom of homepage`);
      cy.scrollTo("top", { ensureScrollable: false });

      // Next page
      cy.log("Let's see if we can get to the awards page");
      cy.get("#awards-link-in-sidenav").find("a").click();
      cy.log("Are we on the right page after we moved to a child page?");
      cy.get("h2").should("have.text", "Publications, Awards, and Honors");
      checkAllLinksOnPageForDeadness();
      // Take screenshots so we can see what the page looks like in Cypress Cloud before we deploy
      cy.scrollTo("top", { ensureScrollable: false });
      cy.screenshot(`${screenType} - top of awards page`);
      cy.scrollTo("bottom", { ensureScrollable: false });
      cy.screenshot(`${screenType} - bottom of awards page`);
      cy.scrollTo("top", { ensureScrollable: false });

      // Next page
      cy.log("Let's see if we can get to the contact page");
      cy.get("#contact-link-in-sidenav").find("a").click();
      cy.log("Are we on the right page after we moved to a child page?");
      cy.get("h2").should("have.text", "Contact");
      checkAllLinksOnPageForDeadness();
      cy.log("check the email link in the contact content area");
      cy.get(`.wrapper section .${classForSarasEmailLink} a`)
        .should("have.attr", "href", sarasEmailLinkValue)
        .should("have.text", sarasEmailAddress);
      cy.get(`section .twitter-link-w-icon`).should(
        "have.attr",
        "href",
        "https://twitter.com/SaraMariaGreene"
      );
      // Take screenshots so we can see what the page looks like in Cypress Cloud before we deploy
      cy.scrollTo("top", { ensureScrollable: false });
      cy.screenshot(`${screenType} - top of contacts page`);
      cy.scrollTo("bottom", { ensureScrollable: false });
      cy.screenshot(`${screenType} - bottom of contacts page`);
      cy.scrollTo("top", { ensureScrollable: false });

      // Next Page
      cy.log("Let's verify the home page LINK too");
      cy.get("#home-link-in-sidenav").find("a").click();
      cy.get("h1").should("have.text", titleOfWebsite);
      cy.log("Are we on the right page?");
      cy.get("h2").should("have.text", "About the Author");
      checkAllLinksOnPageForDeadness();

      // Next Page
      // TBD
    });
  });
});
