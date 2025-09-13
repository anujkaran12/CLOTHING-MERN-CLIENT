import React from "react";
import "./TermsAndConditions.css";

function TermsAndConditions({ onAgree, onCancel }) {
  return (
    <div className="TC-overlay" onClick={onCancel}>
      <div className="TC-container" onClick={(e) => e.stopPropagation()}>
        <h2 className="TC-title">Terms and Conditions</h2>

        <p className="TC-text">
          These terms and conditions outline the rules and regulations for the use of WILD STITCH's Website, located at https://clothing-mern-client.vercel.app/.
        </p>
        <p className="TC-text">
          By accessing this website we assume you accept these terms and conditions. Do not continue to use https://clothing-mern-client.vercel.app/ if you do not agree to take all of the terms and conditions stated on this page.
        </p>
        <p className="TC-text">
          The following terminology applies to these Terms and Conditions, Privacy Statement and Disclaimer Notice and all Agreements: "Client", "You" and "Your" refers to you, the person log on this website and compliant to the Company’s terms and conditions. "The Company", "Ourselves", "We", "Our" and "Us", refers to our Company. "Party", "Parties", or "Us", refers to both the Client and ourselves. All terms refer to the offer, acceptance and consideration of payment necessary to undertake the process of our assistance to the Client in the most appropriate manner for the express purpose of meeting the Client’s needs in respect of provision of the Company’s stated services, in accordance with and subject to, prevailing law of Netherlands.
        </p>

        <h3 className="TC-subtitle">Cookies</h3>
        <p className="TC-text">
          We employ the use of cookies. By accessing https://clothing-mern-client.vercel.app/, you agreed to use cookies in agreement with the WILD STITCH's Privacy Policy.
        </p>
        <p className="TC-text">
          Most interactive websites use cookies to let us retrieve the user’s details for each visit. Cookies are used by our website to enable the functionality of certain areas to make it easier for people visiting our website.
        </p>

        <h3 className="TC-subtitle">License</h3>
        <p className="TC-text">
          Unless otherwise stated, WILD STITCH and/or its licensors own the intellectual property rights for all material on https://clothing-mern-client.vercel.app/. All intellectual property rights are reserved. 
        </p>
        <p className="TC-text">
          You must not:
          <ul>
            <li>Republish material from https://clothing-mern-client.vercel.app/</li>
            <li>Sell, rent or sub-license material from https://clothing-mern-client.vercel.app/</li>
            <li>Reproduce, duplicate or copy material from https://clothing-mern-client.vercel.app/</li>
            <li>Redistribute content from https://clothing-mern-client.vercel.app/</li>
          </ul>
        </p>

        <h3 className="TC-subtitle">Comments</h3>
        <p className="TC-text">
          Parts of this website offer an opportunity for users to post and exchange opinions and information in certain areas of the website. WILD STITCH does not filter, edit, publish or review Comments prior to their presence on the website. Comments do not reflect the views and opinions of WILD STITCH, its agents and/or affiliates. Comments reflect the views and opinions of the person who posts their views and opinions.
        </p>
        <p className="TC-text">
          WILD STITCH reserves the right to monitor all Comments and to remove any Comments which can be considered inappropriate, offensive or causes breach of these Terms and Conditions.
        </p>
        <p className="TC-text">
          You warrant and represent that:
          <ul>
            <li>You are entitled to post the Comments on our website and have all necessary licenses and consents to do so;</li>
            <li>The Comments do not invade any intellectual property right, including without limitation copyright, patent or trademark of any third party;</li>
            <li>The Comments do not contain any defamatory, libelous, offensive, indecent or otherwise unlawful material which is an invasion of privacy;</li>
            
          </ul>
        </p>
        <p className="TC-text">
          You hereby grant WILD STITCH a non-exclusive license to use, reproduce, edit and authorize others to use, reproduce and edit any of your Comments in any and all forms, formats or media.
        </p>

        <h3 className="TC-subtitle">Hyperlinking to our Content</h3>
        <p className="TC-text">
          The following organizations may link to our Website without prior written approval:
          <ul>
            <li>Government agencies;</li>
            <li>Search engines;</li>
            <li>News organizations;</li>
            <li>Online directory distributors;</li>
            <li>System wide Accredited Businesses except soliciting non-profit organizations, charity shopping malls, and charity fundraising groups.</li>
          </ul>
        </p>
        <p className="TC-text">
          If you are one of the organizations listed above and are interested in linking to our website, you must inform us by sending an email to WILD STITCH.
        </p>

     

        <h3 className="TC-subtitle">Content Liability</h3>
        <p className="TC-text">
          We shall not be held responsible for any content that appears on your Website. You agree to protect and defend us against all claims that arise on your Website.
        </p>

        <h3 className="TC-subtitle">Your Privacy</h3>
        <p className="TC-text">
          Please read Privacy Policy.
        </p>

        <h3 className="TC-subtitle">Reservation of Rights</h3>
        <p className="TC-text">
          We reserve the right to request removal of links and amend these terms at any time. Continued use binds you to updated terms.
        </p>

        <h3 className="TC-subtitle">Disclaimer</h3>
        <p className="TC-text">
          To the maximum extent permitted by applicable law, we exclude all warranties and are not liable for any damages arising from use of our website.
        </p>

        <div className="TC-buttons">
          <button className="TC-agree-button" onClick={onAgree}>
            Agree & Continue
          </button>
          <button className="TC-cancel-button" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default TermsAndConditions;
