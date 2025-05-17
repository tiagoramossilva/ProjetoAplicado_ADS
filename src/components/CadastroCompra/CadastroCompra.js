import React from "react";
import Navigation from "../Navigation/Navigation";
import useCadastroCompra from "./hooks/useCadastroCompra";
import FornecedorSection from "./sections/FornecedorSection";
import ClienteSection from "./sections/ClienteSection";
import CompraSection from "./sections/CompraSection";
import ProdutosSection from "./sections/ProdutosSection";
import ProjetoSection from "./sections/ProjetoSection";
import AdicionaisSection from "./sections/AdicionaisSection";
import "./CadastroCompra.css";

const CadastroCompra = () => {
  const {
    formData,
    produtos,
    projetos,
    novoProjeto,
    currentSection,
    handleFormChange,
    handleChange,
    handleProjetoChange,
    handleAddProduct,
    handleRemoveProduct,
    buscarEndereco,
    showSection,
    handleSubmit,
    formatDateForInput,
    handleCancel,
  } = useCadastroCompra();


  const sectionComponents = {
    "fornecedor-section": (
      <FornecedorSection
        formData={formData}
        handleFormChange={handleFormChange}
        buscarEndereco={buscarEndereco}
        showSection={showSection}
      />
    ),
    "cliente-section": (
      <ClienteSection
        formData={formData}
        handleFormChange={handleFormChange}
        buscarEndereco={buscarEndereco}
        showSection={showSection}
      />
    ),
    "compra-section": (
      <CompraSection
        formData={formData}
        handleFormChange={handleFormChange}
        formatDateForInput={formatDateForInput}
        showSection={showSection}
      />
    ),
    "produtos-section": (
      <ProdutosSection
        produtos={produtos}
        handleChange={handleChange}
        handleAddProduct={handleAddProduct}
        handleRemoveProduct={handleRemoveProduct}
        showSection={showSection}
      />
    ),
    "projeto-section": (
      <ProjetoSection
        formData={formData}
        projetos={projetos}
        novoProjeto={novoProjeto}
        handleFormChange={handleFormChange}
        handleProjetoChange={handleProjetoChange}
        showSection={showSection}
      />
    ),

    "adicionais-section": (
      <AdicionaisSection
        formData={formData}
        handleFormChange={handleFormChange}
        handleSubmit={handleSubmit}
        handleCancel={handleCancel}
      />
    ),
  };

  return (
    <>
      <Navigation />
      <div className="containertitle">
        <div className="divtitle">
          <h1>Cadastro de Compra</h1>
        </div>
      </div>

      <div className="pai-container-form">
        <div className="form-container">
          <form className="purchase-form" onSubmit={handleSubmit}>
            <div
              className={`form-section ${
                currentSection === "fornecedor-section" ? "active" : ""
              }`}
            >
              {sectionComponents["fornecedor-section"]}
            </div>

            <div
              className={`form-section ${
                currentSection === "cliente-section" ? "active" : ""
              }`}
            >
              {sectionComponents["cliente-section"]}
            </div>

            <div
              className={`form-section ${
                currentSection === "compra-section" ? "active" : ""
              }`}
            >
              {sectionComponents["compra-section"]}
            </div>

            <div
              className={`form-section ${
                currentSection === "produtos-section" ? "active" : ""
              }`}
            >
              {sectionComponents["produtos-section"]}
            </div>

            <div
              className={`form-section ${
                currentSection === "projeto-section" ? "active" : ""
              }`}
            >
              {sectionComponents["projeto-section"]}
            </div>

            <div
              className={`form-section ${
                currentSection === "adicionais-section" ? "active" : ""
              }`}
            >
              {sectionComponents["adicionais-section"]}
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CadastroCompra;
