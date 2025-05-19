import jsPDF from "jspdf";

const downloadPDF = async (notaUrl) => {
  try {
    console.log("[1/3] Starting XML download...");
    const response = await fetch(notaUrl);
    if (!response.ok) throw new Error(`Error downloading XML: ${response.status}`);
    const xmlText = await response.text();
    console.log("[1/3] XML downloaded successfully!");

    console.log("[2/3] Validating XML structure...");
    const { isValidNFe } = await validateNFe(xmlText);
    console.log(`[2/3] Result: Valid? ${isValidNFe}`);

    console.log("[3/3] Generating manual PDF...");
    await generateManualPdf(xmlText, notaUrl);
    console.log("[3/3] Manual PDF generated successfully!");
  } catch (error) {
    console.error("[ERROR] Process failed:", error);
    generateErrorPdf(error.message, notaUrl);
  }
};

// Function to validate the XML
async function validateNFe(xmlText) {
  try {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlText, "text/xml");

    if (xmlDoc.querySelector("parsererror")) {
      console.error("Malformed or invalid XML");
      return { isValidNFe: false };
    }

    const hasNFe = !!xmlDoc.querySelector("NFe, NFe");
    const hasInfNFe = !!xmlDoc.querySelector("infNFe");
    const hasEmitter = !!xmlDoc.querySelector("emit");

    return {
      isValidNFe: hasNFe && hasInfNFe && hasEmitter,
    };
  } catch (e) {
    console.error("Error parsing XML:", e);
    return { isValidNFe: false };
  }
}

// Function to generate manual PDF
async function generateManualPdf(xmlText, notaUrl) {
  try {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlText, "text/xml");

    const getText = (el, selector) =>
      el?.querySelector(selector)?.textContent?.trim() || "Not informed";

    const emitter = xmlDoc.querySelector("emit");
    const receiver = xmlDoc.querySelector("dest");
    const ide = xmlDoc.querySelector("ide");

    if (!emitter || !receiver || !ide) {
      throw new Error("Incomplete XML structure - missing essential tags");
    }

    const data = {
      emitter: {
        name: getText(emitter, "xNome"),
        cnpj: getText(emitter, "CNPJ"),
        ie: getText(emitter, "IE"),
        address: `${getText(emitter, "enderEmit > xLgr")}, ${getText(
          emitter,
          "enderEmit > nro"
        )}`,
        city: `${getText(emitter, "enderEmit > xMun")}/${getText(
          emitter,
          "enderEmit > UF"
        )}`,
        zipCode: formatZipCode(getText(emitter, "enderEmit > CEP")),
      },
      receiver: {
        name: getText(receiver, "xNome"),
        document: getText(receiver, "CNPJ, CPF"),
        ie: getText(receiver, "IE"),
        address: `${getText(receiver, "enderDest > xLgr")}, ${getText(
          receiver,
          "enderDest > nro"
        )}`,
        city: `${getText(receiver, "enderDest > xMun")}/${getText(
          receiver,
          "enderDest > UF"
        )}`,
      },
      invoice: {
        number: getText(ide, "nNF"),
        series: getText(ide, "serie"),
        emission: formatDate(getText(ide, "dhEmi")),
        value: formatCurrency(getText(xmlDoc, "vNF")),
      },
      products: Array.from(xmlDoc.querySelectorAll("det")).map((prod) => ({
        description: getText(prod, "xProd"),
        code: getText(prod, "cProd"),
        quantity: formatNumber(getText(prod, "qCom")),
        unit: getText(prod, "uCom"),
        value: formatCurrency(getText(prod, "vUnCom")),
      })),
    };

    const doc = new jsPDF();
    const marginLeft = 14;
    let yPosition = 15;

    // Header
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("SIMPLIFIED DANFE", 105, yPosition, { align: "center" });
    yPosition += 10;

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text(
      `No. ${data.invoice.number} • Series ${data.invoice.series}`,
      105,
      yPosition,
      { align: "center" }
    );
    yPosition += 15;

    // Emitter
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("EMITTER", marginLeft, yPosition);
    yPosition += 7;

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text(`Name: ${data.emitter.name}`, marginLeft, yPosition);
    yPosition += 7;

    doc.text(
      `CNPJ: ${formatCNPJ(data.emitter.cnpj)} • IE: ${data.emitter.ie}`,
      marginLeft,
      yPosition
    );
    yPosition += 7;

    doc.text(`Address: ${data.emitter.address}`, marginLeft, yPosition);
    yPosition += 7;

    doc.text(
      `City: ${data.emitter.city} • ZIP: ${data.emitter.zipCode}`,
      marginLeft,
      yPosition
    );
    yPosition += 15;

    // Receiver
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("RECEIVER", marginLeft, yPosition);
    yPosition += 7;

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text(`Name: ${data.receiver.name}`, marginLeft, yPosition);
    yPosition += 7;

    doc.text(
      `Document: ${formatDocument(data.receiver.document)} • IE: ${
        data.receiver.ie
      }`,
      marginLeft,
      yPosition
    );
    yPosition += 7;

    doc.text(`Address: ${data.receiver.address}`, marginLeft, yPosition);
    yPosition += 7;

    doc.text(`City: ${data.receiver.city}`, marginLeft, yPosition);
    yPosition += 15;

    // Invoice Info
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("INVOICE INFORMATION", marginLeft, yPosition);
    yPosition += 7;

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text(`Emission Date: ${data.invoice.emission}`, marginLeft, yPosition);
    yPosition += 7;

    doc.text(`Total Value: R$ ${data.invoice.value}`, marginLeft, yPosition);
    yPosition += 15;

    // Products
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("PRODUCTS/SERVICES", marginLeft, yPosition);
    yPosition += 10;

    // Table header
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.text("Description", marginLeft, yPosition);
    doc.text("Code", marginLeft + 60, yPosition);
    doc.text("Qty", marginLeft + 100, yPosition);
    doc.text("Unit", marginLeft + 120, yPosition);
    doc.text("Unit Value", marginLeft + 140, yPosition);
    yPosition += 6;

    // Products rows
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);

    data.products.forEach((prod) => {
      if (yPosition > 270) {
        doc.addPage();
        yPosition = 20;
      }

      doc.text(prod.description.substring(0, 30), marginLeft, yPosition);
      doc.text(prod.code, marginLeft + 60, yPosition);
      doc.text(prod.quantity, marginLeft + 100, yPosition);
      doc.text(prod.unit, marginLeft + 120, yPosition);
      doc.text(prod.value, marginLeft + 140, yPosition);
      yPosition += 7;
    });

    // Footer
    yPosition = doc.internal.pageSize.height - 20;
    doc.setFontSize(8);
    doc.text(
      `Document generated at: ${new Date().toLocaleString("pt-BR")}`,
      14,
      yPosition
    );
    doc.text(`XML: ${notaUrl}`, 14, yPosition + 6);

    doc.save(`DANFE_${data.invoice.number}.pdf`);
  } catch (error) {
    console.error("Error in manual generation:", error);
    throw new Error("Failed to generate manual PDF: " + error.message);
  }
}

// Formatting helper functions
function formatDate(dateString) {
  try {
    if (!dateString) return "Not informed";
    const date = new Date(dateString);
    return date.toLocaleString("pt-BR");
  } catch {
    return dateString || "Not informed";
  }
}

function formatCurrency(value) {
  try {
    const num = parseFloat(value);
    return isNaN(num)
      ? "0.00"
      : num.toLocaleString("pt-BR", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        });
  } catch {
    return value || "0.00";
  }
}

function formatNumber(value) {
  try {
    const num = parseFloat(value);
    return isNaN(num) ? "0" : num.toLocaleString("pt-BR");
  } catch {
    return value || "0";
  }
}

function formatZipCode(zipCode) {
  if (!zipCode) return "Not informed";
  if (zipCode.length === 8) {
    return `${zipCode.substring(0, 2)}.${zipCode.substring(2, 5)}-${zipCode.substring(5)}`;
  }
  return zipCode;
}

function formatCNPJ(cnpj) {
  if (!cnpj) return "Not informed";
  if (cnpj.length === 14) {
    return `${cnpj.substring(0, 2)}.${cnpj.substring(2, 5)}.${cnpj.substring(
      5,
      8
    )}/${cnpj.substring(8, 12)}-${cnpj.substring(12)}`;
  }
  return cnpj;
}

function formatDocument(doc) {
  if (!doc) return "Not informed";
  if (doc.length === 11) {
    return `${doc.substring(0, 3)}.${doc.substring(3, 6)}.${doc.substring(
      6,
      9
    )}-${doc.substring(9)}`;
  } else if (doc.length === 14) {
    return formatCNPJ(doc);
  }
  return doc;
}

function generateErrorPdf(errorMessage, notaUrl) {
  const doc = new jsPDF();

  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.text("ERROR PROCESSING INVOICE", 105, 20, { align: "center" });

  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");
  doc.text(`An error occurred while processing the invoice:`, 20, 40);

  doc.setFont("helvetica", "bold");
  doc.text(errorMessage, 20, 50, { maxWidth: 170 });

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text(`Invoice URL: ${notaUrl}`, 20, 70);
  doc.text(`Date/time: ${new Date().toLocaleString("pt-BR")}`, 20, 80);
  doc.text("Check browser console for technical details.", 20, 90);

  doc.save("INVOICE_PROCESSING_ERROR.pdf");
}

export default downloadPDF;