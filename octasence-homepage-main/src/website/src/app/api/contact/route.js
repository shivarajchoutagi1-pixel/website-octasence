import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export async function POST(req) {
  try {
    const { name, email, phone, message } = await req.json();

    const msg = {
      to: "contact@octasence.com",
      from: "contact@octasence.com", // must be verified
      subject: `New Contact from ${name}`,
      templateId: process.env.SENDGRID_TEMPLATE_ID,
      dynamicTemplateData: {
        name,
        email,
        phone,
        message,
      },
    };

    await sgMail.send(msg);

    return Response.json({ success: true });
  } catch (error) {
    console.error(error);
    return Response.json({
      success: false,
      error: error.message,
    });
  }
}
