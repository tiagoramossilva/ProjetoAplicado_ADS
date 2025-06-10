import React, { useEffect, useState } from "react";

import { MdDeleteOutline } from "react-icons/md";
import { FaFileDownload } from "react-icons/fa";
import downloadPDF from "./hooks/downloadPDF";

const ComprasTable = ({ compras, onDelete }) => {
  const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setCurrentUser(JSON.parse(userData));
    }
  }, []);

  return (
    <table className="historico-table">
      <thead>
        <tr className="table-header-row">
          <th className="table-header">Fornecedor</th>
          <th className="table-header">Data</th>
          <th className="table-header">Valor Total</th>
          <th className="table-header">Projeto</th>
          <th className="table-header">Gerente</th>
          <th className="table-header">Ações</th>
        </tr>
      </thead>
      <tbody>
        {compras.length > 0 ? (
          compras.map((compra) => (
            <tr className="table-row" key={compra.id}>
              <td className="table-data">
                {compra.fornecedor?.razao_social_fornecedor || "N/A"}
              </td>
              <td className="table-data">
                {compra.data_compra
                  ? new Date(compra.data_compra).toLocaleDateString()
                  : "N/A"}
              </td>
              <td className="table-data">
                R$ {compra.valor_total?.toFixed(2) || "N/A"}
              </td>
              <td className="table-data">
                {compra.projeto?.nome_projeto || "N/A"}
              </td>
              <td className="table-data">
                {compra.projeto?.gerente_projeto || "N/A"}
              </td>
              <td className="table-actions-compras">
                {compra.xml_url ? (
                  <>
                    <button
                      className="dowload"
                      title="Download da Nota Fiscal (PDF)"
                      onClick={() => downloadPDF(compra.xml_url)}
                    >
                      <FaFileDownload />
                    </button>
                  </>
                ) : (
                  <span className="no-file">—</span>
                )}
                {currentUser?.admin && (
                  <button
                    className="action-button delete-button"
                    onClick={() => onDelete(compra.id)}
                  >
                    <MdDeleteOutline />
                  </button>
                )}
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="6" className="no-data">
              Nenhuma compra encontrada
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default ComprasTable;
