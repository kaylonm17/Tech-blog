async function deleteFormHandler(event) {
  event.preventDefault();

  const id = window.location.toString().split("/")[
    window.location.toString().split("/").length - 1
  ];

  const response = await fetch(`/api/tech/${id}`, {
    method: "DELETE",
    body: JSON.stringify({ tech_id: id }),
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    document.location.replace("/dashboard/");
  } else {
    alert(response.statusText);
  }
}

document
  .getElementById("delete-tech-btn")
  .addEventListener("click", deleteFormHandler);
