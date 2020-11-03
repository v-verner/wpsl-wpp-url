const storeList = document.querySelector("#wpsl-stores ul");
if (storeList) {
  storeList.addEventListener("DOMNodeInserted", (event) => {
    if (event.target.nodeName === "#text") return false;
    if (event.target.classList.contains("wpsl-preloader")) return false;
    updateWhatsAppPhone(event.target);
  });
}

function updateWhatsAppPhone(item) {
  const contactItems = item.querySelector(".wpsl-contact-details");
  if (!contactItems) return;

  contactItems.childNodes.forEach((contact) => {
    if (contact.nodeName === "#text") return;
    const isWhatsApp = contact.innerText.search("WhatsApp");

    if (isWhatsApp >= 0) {
      const whatsAppNode = contact.childNodes[1];
      let number = whatsAppNode.nodeValue;
      const formattedNumber = number.replace(': ', '');

      number = number.replace(/\D/g, "");

      const span = document.createElement("span");
      span.innerText = ": ";
      span.style.setProperty("display", "inline", "important");

      const a = document.createElement("a");
      a.innerText = formattedNumber;
      a.title = "Fale por WhatsApp";
      a.href = "https://wa.me/55" + number;
      a.target = "_blank";

      span.appendChild(a);
      contact.appendChild(span);
      whatsAppNode.remove();
    }
  });
}
