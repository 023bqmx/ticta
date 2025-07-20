user-VLfJ9ZODFHNqWST0ZhHyGEic -Post

fetch("https://webhook.n8n.cloud/webhook-test/receive-data/", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    name: "KYU",
    email: "qkabkab@gmail.com",
    message: "สวัสดีจากเว็บ"
  })
}); 
