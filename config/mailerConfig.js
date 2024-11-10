import nodemailer from "nodemailer";
import path from "path";
import hbs from "nodemailer-express-handlebars";
import logger from "../utils/logger";
import { config } from '../config/index';
// import { EmailTemplates } from "../utils/constants";

// interface EmailTemplateBase {
//   template: string;
//   subject?: string;
//   content: {
//     [x:string]: string | number | boolean | null;
//   }
// }

// type ContactEmailProps = {
//   fullName: string;
//   email: string;
//   phoneNumber?: string;
//   organization?: string;
// };

const transporter = nodemailer.createTransport({
  host: "mail.privateemail.com",
  port: 465,
  // requireTLS: true,
  secure: true, // false for 587
  auth: {
    user: config.KHEFUE_EMAIL,
    pass: config.SMTPPASS,
  },
});

const options = {
  viewEngine: {
    extName: ".hbs",
    partialsDir: path.resolve("./src/views"),
    defaultLayout: false,
  },
  viewPath: path.resolve("./src/views"),
  extName: ".hbs",
};

transporter.use("compile", hbs(options));

export const sendEmail = async (mailOptions) => {
  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, function (err, info) {
      if (err) {
        logger.error(err.stack);
        // reject(new CustomError("Error occurred. Please try again"));
        return;
      } else {
        logger.info("Email sent: " + info.response);
        // return true;
        resolve(info.response);
      }
    });
  });
};

// export const sendContactEmail = (data: ContactEmailProps) => {
export const sendContactEmail = (data) => {
  const mailOptions = {
    from: `${data.fullName} <${data.email}>`,
    to: "philipowolabi79@gmail.com",
    // subject: "New Contact",
    subject: "Someone just reached out to you.",
    template: "contact",
    context: {
      body: data,
    },
  };
  return sendEmail(mailOptions);
};

const from = `FindMyCampus from PCI`;

export const accountLockedEmail = (data) => {
  const mailOptions = {
    from,
    to: data.content.email,
    subject: data.subject,
    template: data.template,
    context: data.content,
  };
  return sendEmail(mailOptions);
};
