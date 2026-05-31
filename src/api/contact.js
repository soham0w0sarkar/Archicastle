const WEB3FORMS_URL = "https://api.web3forms.com/submit";

export async function sendContactEmail({ name, email, phone, message }) {
  const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;

  if (!accessKey) {
    throw new Error("Contact form is not configured. Missing access key.");
  }

  const formData = new FormData();
  formData.append("access_key", accessKey);
  formData.append("name", name);
  formData.append("email", email);
  formData.append("phone", phone);
  formData.append("message", message);
  formData.append("subject", "New enquiry — ArchiCastle website");

  const response = await fetch(WEB3FORMS_URL, {
    method: "POST",
    body: formData,
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok || !data.success) {
    throw new Error(
      data.message || "Failed to send message. Please try again.",
    );
  }

  return data;
}
