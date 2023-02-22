describe("sanity check", () => {
  it("index looks good", () => {
    const titleOfWebsite = "Sara Maria Greene";
    const classForSarasEmailLink = "email-element";
    const sarasEmailAddress = "sara1maria1greene@gmail.com";
    const sarasEmailLinkValue = `mailto:${sarasEmailAddress}`;
    cy.visit("/");
    cy.get("h1").should("have.text", titleOfWebsite);
    cy.log("Are we on the right page?");
    cy.get("h2").should("have.text", "About the Author");
    cy.log("check the email link in the side navigation");
    cy.get(`header .${classForSarasEmailLink} a`)
      .should("have.attr", "href", sarasEmailLinkValue)
      .should("have.text", sarasEmailAddress);
    cy.log("check the email link in the bio");
    cy.get(`.wrapper section .${classForSarasEmailLink} a`)
      .should("have.attr", "href", sarasEmailLinkValue)
      .should("have.text", sarasEmailAddress);
    cy.get(`#contacts-in-side-nav .twitter-follow-button`).should(
      "have.attr",
      "href",
      "https://twitter.com/SaraMariaGreene?ref_src=twsrc%5Etfw"
    );
  });
});
