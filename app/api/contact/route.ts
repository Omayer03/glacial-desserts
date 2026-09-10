import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export const dynamic = "force-dynamic";

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(request: NextRequest) {
  const resend = new Resend(process.env.RESEND_API_KEY);

  let body: {
    name?: string;
    email?: string;
    subject?: string;
    message?: string;
    business?: string;
    phone?: string;
    quantity?: string;
    product?: string;
  };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const name = body.name?.trim() ?? "";
  const email = body.email?.trim() ?? "";
  const subject = body.subject?.trim() ?? "";
  const message = body.message?.trim() ?? "";
  const business = body.business?.trim() ?? "";
  const phone = body.phone?.trim() ?? "";
  const quantity = body.quantity?.trim() ?? "";
  const product = body.product?.trim() ?? "";

  if (!name || !email) {
    return NextResponse.json(
      { error: "Name and email are required." },
      { status: 400 }
    );
  }

  const heading = product
    ? `New product enquiry from the website`
    : "New message from the website contact form";

  const extraLines = [
    product ? `Product: ${product}` : null,
    business ? `Business / Organisation: ${business}` : null,
    phone ? `Phone: ${phone}` : null,
    quantity ? `Quantity / Requirements: ${quantity}` : null,
  ].filter((line): line is string => Boolean(line));

  const extraHtmlRows = [
    product
      ? `<p><strong>Product:</strong> ${escapeHtml(product)}</p>`
      : null,
    business
      ? `<p><strong>Business / Organisation:</strong> ${escapeHtml(business)}</p>`
      : null,
    phone ? `<p><strong>Phone:</strong> ${escapeHtml(phone)}</p>` : null,
    quantity
      ? `<p><strong>Quantity / Requirements:</strong> ${escapeHtml(quantity)}</p>`
      : null,
  ]
    .filter((row): row is string => Boolean(row))
    .join("\n");

  try {
    const { error } = await resend.emails.send({
      from: "Glacial Desserts Website <onboarding@resend.dev>",
      to: "connect@glacialdesserts.uk",
      replyTo: email,
      subject: subject
        ? `New enquiry: ${subject}`
        : "New enquiry from the website contact form",
      text: `${heading}.

Name: ${name}
Email: ${email}
${extraLines.length ? extraLines.join("\n") + "\n" : ""}Subject: ${subject || "(none)"}

Message:
${message || "(none)"}`,
      html: `
        <div style="font-family: sans-serif; font-size: 15px; color: #2B2420;">
          <p><strong>${escapeHtml(heading)}</strong></p>
          <p><strong>Name:</strong> ${escapeHtml(name)}</p>
          <p><strong>Email:</strong> ${escapeHtml(email)}</p>
          ${extraHtmlRows}
          <p><strong>Subject:</strong> ${escapeHtml(subject || "(none)")}</p>
          <p><strong>Message:</strong></p>
          <p>${escapeHtml(message || "(none)").replace(/\n/g, "<br/>")}</p>
        </div>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "Failed to send message." },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact form send failed:", err);
    return NextResponse.json(
      { error: "Failed to send message." },
      { status: 500 }
    );
  }
}
