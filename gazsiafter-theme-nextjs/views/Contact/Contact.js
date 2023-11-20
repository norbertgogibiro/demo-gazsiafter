import React from "react";
import LinkEmail from "../../components/elements/LinkEmail/LinkEmail";
import styles from "./Contact.module.scss";

const contactList = [
  {
    label: "Booking",
    emailUser: "booking",
  },
  {
    label: "Management",
    emailUser: "management",
  },
  {
    label: "Merch",
    emailUser: "merch",
  },
  {
    label: "Band",
    emailUser: "band",
  },
  {
    label: "Webmaster",
    emailUser: "website",
  },
];

const Contact = () => {
  return (
    <article className={styles.main}>
      <h2>Contact</h2>
      <dl>
        {contactList.map(({ label, emailUser }) => (
          <div key={label} className={styles.contactListEntry}>
            <dt>{label}</dt>
            <dd>
              <LinkEmail user={emailUser} domain="paperdeermusic" tld="co.uk" />
            </dd>
          </div>
        ))}
      </dl>
    </article>
  );
};

Contact.urlViewName = "contact";

export default Contact;
