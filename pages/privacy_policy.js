import React from "react";
import Footer from "@/components/Footer";

function Privacy() {
  if (typeof window !== "undefined") {
    document.title = "Privacy Policy";
  }
  return (
    <>
      <div className="private">
        <div>
          <h1>Privacy Policy</h1>
          <p>
            Visiting Website examsforcareers.com does not automatically capture
            any specific personal information from you, (like name, phone number
            or e-mail address), that allows us to identify you individually.
            This website records your visit and logs the following information
            for statistical purposes, such as Internet protocol (IP) addresses,
            domain name, server&apos;s address; name of the top-level domain
            from which you access the Internet (for example, .gov, .com, .in,
            etc.), browser type, operating system, the date and time of the
            visit, the pages you have accessed, the documents downloaded and the
            previous Internet address from which you linked directly to the
            site. We make no attempt to link these addresses with the identity
            of individuals visiting our site unless an attempt to damage the
            site has been detected. We will not identify users or their browsing
            activities, except when a law enforcement agency may exercise a
            warrant to inspect the service provider&apos;s logs. If the
            examsforcareers.com Website requests you to provide personal
            information, you will be informed for the particular purposes for
            which the information is gathered and adequate security measures
            will be taken to protect your personal information.
            examsforcareers.com does not sell or share any personally
            identifiable information volunteered on the examsforcareers.com
            Website to any third party (public/private). Any information
            provided to this website will be protected from loss, misuse,
            unauthorized access or disclosure, alteration, or destruction.
          </p>
          <h1>Cookies</h1>
          <p>
            A cookie is a piece of software code that an Internet website sends
            to your browser when you access information in that site.
          </p>
          <h1>E-mail Management</h1>
          <p>
            Your e-mail address will only be recorded if you choose to send a
            message. It will only be used for the purpose for which you have
            provided it and will not be added to a mailing list. Your e-mail
            address will not be used for any other purpose, and will not be
            disclosed without your consent. Collection of Personal Information
            If you are asked for any other Personal Information you will be
            informed how it will be used if you choose to give it. If at any
            time you believe the principles referred to in this privacy
            statement have not been followed, or have any other comments on
            these principles, please notify the Web Information Manager by
            sending email to admin@examsforcareers.com.
          </p>
          <h1>Note:</h1>
          <p>
            The use of the term &quot;Personal Information&quot; in this privacy
            statement refers to any information from which your identity is
            apparent or can be reasonably ascertained. Reasonable Security
            Practices Reasonable security measures such as administrative,
            technical, operational and physical controls have been implemented
            to ensure the security of personal information, if collected.
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Privacy;
