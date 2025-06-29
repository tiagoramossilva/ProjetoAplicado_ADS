import { useState, useEffect, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";

const useCadastroCompra = () => {
  const navigate = useNavigate();
  const [currentSection, setCurrentSection] = useState("fornecedor-section");
  const [produtos, setProdutos] = useState([
    {
      nome: "",
      numero_serie: "",
      fabricante: "",
      descricao: "",
      tipo_unitario: "",
      quantidade: "",
      andar: "",
      sala: "",
      armario: "",
    },
  ]);

  // Usando useMemo para initialFormData
  const initialFormData = useMemo(
    () => ({
      cliente: {
        razao_social_cliente: "",
        CNPJ: "",
        inscricao_estadual: "",
        endereco: "",
        bairro: "",
        CEP: "",
        municipio: "",
        UF: "",
        telefone: "",
      },
      fornecedor: {
        razao_social_fornecedor: "",
        CNPJ: "",
        inscricao_estadual: "",
        endereco: "",
        bairro: "",
        CEP: "",
        municipio: "",
        UF: "",
        telefone: "",
      },
      compra: {
        data_compra: "",
        data_emissao: "",
        data_envio: "",
        valor_total: "",
        xml_url: "",
      },
      projeto: {
        nome_projeto: "",
        responsavel_tecnico: "",
        gerente_projeto: "",
      },
      adicionais: {
        observacoes: "",
      },
    }),
    []
  );

  console.log("initialFormData: ", initialFormData);

  const [formData, setFormData] = useState(initialFormData);
  const [projetos, setProjetos] = useState([]);
  const [novoProjeto, setNovoProjeto] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const loadInvoiceData = useCallback(() => {
    const storedData = localStorage.getItem("invoiceData");
    console.log("storedData: ", storedData);
    if (storedData) {
      try {
        const data = JSON.parse(storedData);
        console.log("data: ", data);

        const formattedProdutos = (
          data.produtos || [
            {
              nome: "",
              numero_serie: "",
              fabricante: "",
              descricao: "",
              tipo_unitario: "",
              quantidade: "",
              andar: "",
              sala: "",
              armario: "",
            },
          ]
        ).map((produto) => ({
          ...produto,
          numero_serie: produto.numero_serie?.toString() || "",
          quantidade: produto.quantidade?.toString() || "",
        }));

        setFormData({
          cliente: data.cliente || initialFormData.cliente,
          fornecedor: data.fornecedor || initialFormData.fornecedor,
          compra: data.compra || initialFormData.compra,
          projeto: data.projeto || initialFormData.projeto,
          adicionais: data.adicionais || initialFormData.adicionais,
        });

        setProdutos(formattedProdutos);
        localStorage.removeItem("invoiceData");
      } catch (error) {
        console.error("Erro ao carregar dados do localStorage:", error);
      }
    }
  }, [initialFormData]);

  const fetchProjetos = useCallback(async () => {
    try {
      const response = await fetch("http://localhost:3001/api/projetos");
      if (!response.ok) throw new Error("Erro ao buscar projetos");
      const data = await response.json();
      setProjetos(data);
    } catch (error) {
      console.error("Erro ao buscar projetos:", error);
    }
  }, []);

  useEffect(() => {
    loadInvoiceData();
    fetchProjetos();
  }, [loadInvoiceData, fetchProjetos]);

  const formatDateForInput = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  };

  const handleAddProduct = () => {
    setProdutos([
      ...produtos,
      {
        nome: "",
        numero_serie: "",
        fabricante: "",
        descricao: "",
        tipo_unitario: "",
        quantidade: "",
        andar: "",
        sala: "",
        armario: "",
      },
    ]);
  };

  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const newProdutos = [...produtos];
    newProdutos[index][name] = value;
    setProdutos(newProdutos);
  };

const handleRemoveProduct = () => {
  if (produtos.length <= 1) {
    alert("Você deve ter pelo menos um produto.");
    return;
  }
  setProdutos((prev) => prev.slice(0, -1)); // remove o último
};


  const handleFormChange = (e) => {
    const { name, value } = e.target;
    const [section, field] = name.split(".");
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value.trim(),
      },
    }));
  };

  const handleProjetoChange = (e) => {
    const value = e.target.value;
    setNovoProjeto(value === "novo");
    setFormData((prev) => ({
      ...prev,
      projeto: {
        ...prev.projeto,
        nome_projeto: value === "novo" ? "" : value,
      },
    }));
  };

  const buscarEndereco = async (cep, tipo) => {
    cep = cep.replace(/\D/g, "");
    if (cep.length !== 8) {
      alert("CEP inválido. Deve conter 8 dígitos.");
      return;
    }

    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      if (!response.ok) throw new Error("Erro ao buscar CEP");

      const data = await response.json();
      if (data.erro) throw new Error("CEP não encontrado");

      setFormData((prev) => ({
        ...prev,
        [tipo]: {
          ...prev[tipo],
          endereco: data.logradouro || "",
          bairro: data.bairro || "",
          municipio: data.localidade || "",
          UF: data.uf || "",
          CEP: cep,
        },
      }));
    } catch (error) {
      console.error("Erro ao buscar endereço:", error);
      alert(error.message || "Erro ao buscar endereço.");
    }
  };

  const showSection = (sectionId) => {
    setCurrentSection(sectionId);
  };

  const validateForm = () => {
    if (
      !formData.fornecedor.razao_social_fornecedor ||
      !formData.fornecedor.CNPJ
    ) {
      alert("Por favor, preencha os dados obrigatórios do fornecedor");
      return false;
    }

    if (produtos.some((p) => !p.nome || !p.quantidade)) {
      alert(
        "Por favor, preencha pelo menos o nome e quantidade para todos os produtos"
      );
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const response = await fetch(
        "http://localhost:3001/api/cadastro-compra",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            fornecedor: formData.fornecedor,
            cliente: formData.cliente,
            compra: formData.compra,
            produtos: produtos.map((p) => ({
              ...p,
              numero_serie: p.numero_serie || null,
              quantidade: p.quantidade ? parseInt(p.quantidade, 10) : null,
            })),
            projeto: formData.projeto,
            adicionais: formData.adicionais,
          }),
        }
      );

      console.log("formData: ", formData);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Erro ao cadastrar a compra");
      }

      alert("Compra registrada com sucesso!");
      navigate("/home");
    } catch (error) {
      console.error("Erro:", error);
      alert(error.message || "Erro ao registrar a compra.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => navigate(-1);

  return {
    formData,
    produtos,
    projetos,
    novoProjeto,
    currentSection,
    isSubmitting,
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
  };
};

export default useCadastroCompra;
