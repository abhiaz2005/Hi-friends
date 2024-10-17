export const textToCustomer = `
<!DOCTYPE html>
              <html lang="en">
                <head>
                  <style>
                    .comm {
                      width: 40rem;
                      height: 100%;
                      margin: auto;
                      border: 2px solid black;
                      text-align: justify;
                    }
                    .inner{
                      margin: 10px 20px;
                    }
                    h1 {
                      color: blue;
                      width: 50%;
                      margin: auto;
                      text-align: center;
                    }
                    p {
                      color: rgb(8, 132, 8);
                      font-weight: bold;
                    }
                    li{
                      color:rgb(8, 132, 8) ;
                      font-weight: bold;
                    }
                  </style>
                </head>
                <body>
                  <h1><u>Hi-Friends</u></h1>
                  <br>
                  <div class="comm">
                    <div class="inner">
                      <h2>From Hi-Friends Community,</h2>
                      <p>Thanks for giving feedback .</p>
                      <p>Dear User,</p>
                      <p>Thank you for your kind words and for reaching out to us. We appreciate your trust in our opinion and value your feedback. We will definitely explore your system further and if we find any vulnerabilities, we will not hesitate to contact you through the provided email.</p>
                      <p>In fact, we would like to take this opportunity to assure you that we take security and vulnerability reporting very seriously. We believe that it is essential to work together to identify and address any potential issues that may compromise the integrity of your system.</p>
                      <p>If we do find any vulnerabilities, we will provide you with a detailed report of our findings, including:</p>
                      <ul>
                          <li>A description of the vulnerability</li>
                          <li>Steps to reproduce the issue</li>
                          <li>Recommendations for remediation</li>
                          <li>Any additional information that may be relevant to addressing the issue</li>
                      </ul>
                      <p>We appreciate your commitment to security and look forward to the opportunity to work with you to ensure the integrity of your system.</p>
                      <p>Thank you again for reaching out to us,</p>
                      <p>Best regards, AI Assistant ,</p>
                      <p>Hi-Friends</p>
                    </div>
                  </div>
                </body>
              </html>
`

export const textToAdmin = (sender, text) => {
    return `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <style>
            .comm {
              width: 40rem;
              height: 100%;
              margin: auto;
              border: 2px solid black;
              text-align: justify;
            }
            .inner {
              margin: 10px 20px;
            }
            h1 {
              color: darkblue;
              width: 50%;
              margin: auto;
              text-align: center;
            }
            p {
              color: rgb(8, 132, 8);
              font-weight: bold;
            }
            pre {
              color: rgb(0, 0, 139);
              font-weight: bold;
            }
          </style>
        </head>
        <body>
          <h1><u>From Hi-Friends Community</u></h1>
          <br>
          <div class="comm">
            <div class="inner">
              <h2>New Customer Contact</h2>
              <p>There is a new customer trying to contact our site with the email: ${sender}</p>
              <p><strong>Subject:</strong></p>
              <pre>${text}</pre>
              <br>
              <p>Thank you for your attention,</p>
              <p>Best regards,</p>
              <p>Hi-Friends Community</p>
            </div>
          </div>
        </body>
      </html>
    `;
  };
  