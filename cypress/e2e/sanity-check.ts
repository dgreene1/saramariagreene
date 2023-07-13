describe("sanity check", () => {
  it("all of the pages", () => {
    const titleOfWebsite = "Sara Maria Greene";
    const classForSarasEmailLink = "email-element";
    const sarasEmailAddress = "sara1maria1greene@gmail.com";
    const sarasEmailLinkValue = `mailto:${sarasEmailAddress}`;
    cy.visit("/");
    cy.get("h1").should("have.text", titleOfWebsite);
    cy.log("Are we on the right page?");
    cy.get("h2").should("have.text", "About the Author");
    // Take screenshots so we can see what the page looks like in Cypress Cloud before we deploy
    cy.screenshot("top of homepage");
    cy.scrollTo("bottom");
    cy.screenshot("bottom of homepage");
    cy.scrollTo("top");
    // Next page
    cy.log("Let's see if we can get to the contact page");
    cy.get("#awards-link-in-sidenav").click();
    cy.log("Are we on the right page after we moved to a child page?");
    cy.get("h2").should("have.text", "Publications, Awards, and Honors");
    // Take screenshots so we can see what the page looks like in Cypress Cloud before we deploy
    cy.screenshot("top of awards page");
    cy.scrollTo("bottom");
    cy.screenshot("bottom of awards page");
    cy.scrollTo("top");
    // Next page
    cy.log("Let's see if we can get to the contact page");
    cy.get("#contact-link-in-sidenav").click();
    cy.log("Are we on the right page after we moved to a child page?");
    cy.get("h2").should("have.text", "Contact");
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
    cy.screenshot("top of contacts page");
    cy.scrollTo("bottom");
    cy.screenshot("bottom of contacts page");
    cy.scrollTo("top");

    // Next Page
    cy.log("Let's verify the home page LINK too");
    cy.get("#home-link-in-sidenav").click();
    cy.get("h1").should("have.text", titleOfWebsite);
    cy.log("Are we on the right page?");
    cy.get("h2").should("have.text", "About the Author");
  });
});
