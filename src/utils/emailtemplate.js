export const createEmailTemplate = (params) => {
    const {
      subject,
      body,
      sender,
      organizationName,
      logoUrl = '/default-logo.png'
    } = params;
  
    return `
  <!DOCTYPE html>
  <html>
  <head>
      <style>
          body { 
              font-family: Arial, sans-serif; 
              max-width: 600px; 
              margin: auto; 
              padding: 20px;
          }
          .header {
              background-color: #f4f4f4;
              padding: 15px;
              text-align: center;
          }
          .content {
              padding: 20px;
              line-height: 1.6;
          }
      </style>
  </head>
  <body>
      <div class="header">
          <h2>${organizationName}</h2>
      </div>
      <div class="content">
          <h3>${subject}</h3>
          <p>${body}</p>
          <p>Sent by: ${sender}</p>
      </div>
  </body>
  </html>
    `;
  };