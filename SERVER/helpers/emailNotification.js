import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

/**
 * @class notificationEmail
 * @description Send transactions notifications
 * @exports notificationEmail
 */
class notificationEmail {
  /**
  * @method alert
  * @description sends transaction alerts to email
  * @param {object} message - The email address
  * @returns {*} nothing
  */
  static async alert(email, type, transaction, req) {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'bankaalert@gmail.com',
        pass: 'Lukmon17_',
      },
    });
    const mailOptions = {
      from: 'Banka <BankaAlert@gmail.com>',
      to: email,
      subject: 'Banka Transaction Alert',
      html: `<img src="http://i65.tinypic.com/w05n2g.jpg" alt="logo" width="100px" height="50px"></img><br/><hr/>
        <p>Dear <b style="text-transform: capitalize">${req.user.firstName} ${req.user.lastName}</p>
        <p>We wish to inform you that a <b>${type}</b> transaction recently occurred on your bank account.</p>
        <p>
        <table style="border: 1px dashed">
        <tr style="padding: 2.5rem"> <th style="background-color: black" colspan="2"><b style="color: white">Transaction Details</b> <th/> <tr/>
        <tr>
          <td style="border: 1px solid"><b>Account Number</b></td>
          <td style="border: 1px solid">${transaction.accountNumber}</td> 
        </tr>
        <tr>
          <td style="border: 1px solid"><b>Transaction Type</b></td>
          <td style="border: 1px solid">${type}</td> 
        </tr>
        <tr>
          <td style="border: 1px solid"><b>Time of Transaction</b></td>
          <td style="border: 1px solid">${transaction.createdOn}</td> 
        </tr>
        <tr>
          <td style="border: 1px solid"><b>Amount</b></td>
          <td style="border: 1px solid">${transaction.amount}</td> 
        </tr>
        <tr>
        <td style="border: 1px solid"><b>Old Balance</b></td>
        <td style="border: 1px solid">${transaction.oldBalance}</td> 
        </tr>
        <tr>
          <td style="border: 1px solid"><b>New Balance</b></td>
          <td style="border: 1px solid">${transaction.newBalance}</td> 
        </tr>
      </table>
      `,
    };

    transporter.sendMail(mailOptions, (err, info) => (err ? console.log(err) : console.log(info)));
  }
}

export default notificationEmail;
