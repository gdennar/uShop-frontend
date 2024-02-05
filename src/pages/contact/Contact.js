import React, { useRef } from "react";
import { Button, Card } from "@mui/material";
import { Container } from "@mui/system";
import PhoneIcon from "@mui/icons-material/Phone";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import TwitterIcon from "@mui/icons-material/Twitter";
import emailjs from "@emailjs/browser";
import classes from "./Contact.module.css";
import { toast } from "react-toastify";

const Contact = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        process.env.REACT_APP_EMAILJS_SERVICE_ID,
        "template_tdsw59u",
        form.current,
        "pW08xP7aFPq8ifL3F"
      )
      .then(
        (result) => {
          toast.success(`${result.text}, Message Sent`);
        },
        (error) => {
          toast.error(error.text);
        }
      );
    e.target.reset();
  };

  return (
    <section>
      <Container className={classes.contact}>
        <h3>Contact Us</h3>
        <div className={classes.contactSection}>
          <div className={classes.section}>
            <form onSubmit={sendEmail} ref={form}>
              <Card className={classes.card}>
                <label>Name</label>
                <input
                  type="text"
                  name="user_name"
                  placeholder="Full Name"
                  required
                />
                <label>Email</label>
                <input
                  type="email"
                  name="user_email"
                  placeholder="Your active email"
                  required
                />
                <label>Subject</label>
                <input
                  type="text"
                  name="subject"
                  placeholder="Subject"
                  required
                />
                <label>Your Message:</label>
                <textarea name="message" cols="30" rows="10"></textarea>
                <Button variant="contained" type="submit">
                  Send Message
                </Button>
              </Card>
            </form>
          </div>
          <div className={classes.details}>
            <Card className={classes.card2}>
              <h3>Our Contact Information</h3>
              <p>Fill the form or contact us via other channels listed below</p>
              <div className={classes.icons}>
                <span>
                  <PhoneIcon /> <p>+234 803 510 3956</p>
                </span>
                <span>
                  <ContactMailIcon /> <p>support@ushop.com</p>
                </span>
                <span>
                  <LocationOnIcon /> <p>Lagos, Nigeria</p>
                </span>
                <span>
                  <TwitterIcon /> <p>@mycode_journey</p>
                </span>
              </div>
            </Card>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Contact;
