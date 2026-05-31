const CONTACT_API =
  import.meta.env.VITE_CONTACT_API ?? "/api/send-email";

export async function sendContactEmail({ name, email, phone, message }) {
  const response = await fetch(CONTACT_API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, phone, message }),
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.error || "Failed to send message. Please try again.");
  }

  return data;
}
