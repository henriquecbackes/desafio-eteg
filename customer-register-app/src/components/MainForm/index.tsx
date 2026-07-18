import { Input } from "../Input";
import { Button } from "../Button";
import styles from "./styles.module.css";
import Select, { type TColorOptions } from "../Select";
import { useState } from "react";
import { cpfValidator } from "cpf-cnpj-validator";
import { toast } from "react-toastify";
import { createRegister } from "../../services/api";

const corOptions: TColorOptions[] = [
  { value: "vermelho", label: "Vermelho", color: "#FF0000" },
  { value: "laranja", label: "Laranja", color: "#FF7F00" },
  { value: "amarelo", label: "Amarelo", color: "#FFFF00" },
  { value: "verde", label: "Verde", color: "#00FF00" },
  { value: "azul", label: "Azul", color: "#0000FF" },
  { value: "anil", label: "Indigo", color: "#4B0082" },
  { value: "violeta", label: "Violeta", color: "#9400D3" },
];

type TFormsErrors = {
  nome: string;
  cpf: string;
  email: string;
  cor: string;
  observacoes: string;
};

export function MainForm() {
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");
  const [cor, setCor] = useState("");
  const [observacoes, setObservacoes] = useState("");
  const [errors, setErrors] = useState<TFormsErrors>({
    nome: "",
    cpf: "",
    email: "",
    cor: "",
    observacoes: "",
  });

  const handleNomeChange = (
    e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>,
  ) => {
    setNome(e.target.value);
  };

  const handleCpfChange = (
    e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>,
  ) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 11) value = value.substring(0, 11);

    value = value
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2");

    setCpf(value);
  };

  const handleEmailChange = (
    e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>,
  ) => {
    setEmail(e.target.value);
  };

  const handleCorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCor(e.target.value);
  };

  const handleObservacoesChange = (
    e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>,
  ) => {
    setObservacoes(e.target.value);
  };

  const validateNome = () => {
    const nomeRegex = /^[A-Za-zá-úÁ-Ú]+(\s+[A-Za-zá-úÁ-Ú]+)+$/;

    if (!nome) {
      setErrors((prevState) => ({
        ...prevState,
        nome: "Campo obrigatório.",
      }));
      return false;
    } else if (!nomeRegex.test(nome)) {
      setErrors((prevState) => ({
        ...prevState,
        nome: "Insira um nome válido.",
      }));
      return false;
    } else {
      setErrors((prevState) => ({
        ...prevState,
        nome: "",
      }));
    }
    return true;
  };

  const validateCpf = () => {
    if (!cpf) {
      setErrors((prevState) => ({
        ...prevState,
        cpf: "Campo obrigatório.",
      }));
      return false;
    } else if (!cpfValidator.isValid(cpf)) {
      setErrors((prevState) => ({
        ...prevState,
        cpf: "Insira um CPF válido.",
      }));
      return false;
    } else {
      setErrors((prevState) => ({
        ...prevState,
        cpf: "",
      }));
    }
    return true;
  };

  const validateEmail = () => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

    if (!email) {
      setErrors((prevState) => ({
        ...prevState,
        email: "Campo obrigatório.",
      }));
      return false;
    } else if (!emailRegex.test(email)) {
      setErrors((prevState) => ({
        ...prevState,
        email: "Insira um e-mail válido.",
      }));
      return false;
    } else {
      setErrors((prevState) => ({
        ...prevState,
        email: "",
      }));
    }
    return true;
  };

  const validateCor = () => {
    if (!cor) {
      setErrors((prevState) => ({
        ...prevState,
        cor: "Campo obrigatório.",
      }));
      return false;
    } else {
      setErrors((prevState) => ({
        ...prevState,
        cor: "",
      }));
    }
    return true;
  };

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isValidNome = validateNome();
    const isValidCpf = validateCpf();
    const isValidEmail = validateEmail();
    const isValidCor = validateCor();

    if (isValidNome && isValidCpf && isValidEmail && isValidCor) {
      const data = {
        nome,
        cpf: cpf.replace(/\D/g, ""),
        email,
        cor,
        observacoes,
      };

      try {
        await createRegister(data);
        toast.success("Valores cadastrados com sucesso!");
      } catch (err) {
        toast.error(
          "Houve um erro no cadastro, por favor, tente novamente em alguns minutos.",
        );
        console.error(err);
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className={styles.form} action={""}>
        <div className={styles.formRow}>
          <Input
            id="nome"
            value={nome}
            type="text"
            placeholder="Digite seu nome"
            label="Nome Completo"
            onChange={handleNomeChange}
          />
          {errors.nome && <p className={styles.error}>{errors.nome}</p>}
        </div>
        <div className={styles.formRow}>
          <Input
            id="cpf"
            value={cpf}
            type="text"
            placeholder="000.000.000-00"
            label="CPF"
            onChange={handleCpfChange}
          />
          {errors.cpf && <p className={styles.error}>{errors.cpf}</p>}
        </div>

        <div className={styles.formRow}>
          <Input
            id="email"
            value={email}
            type="email"
            placeholder="email@email.com"
            label="E-mail"
            onChange={handleEmailChange}
          />
          {errors.email && <p className={styles.error}>{errors.email}</p>}
        </div>
        <div className={styles.formRow}>
          <Select
            title="Cor preferida:"
            options={corOptions}
            onChange={handleCorChange}
            value={cor}
          />{" "}
          {errors.cor && <p className={styles.error}>{errors.cor}</p>}
        </div>
        <div className={styles.formRow}>
          <Input
            id="observacoes"
            value={observacoes}
            type="text"
            placeholder="Digite algo..."
            label="Observações"
            onChange={handleObservacoesChange}
          />{" "}
          {errors.observacoes && (
            <p className={styles.error}>{errors.observacoes}</p>
          )}
        </div>

        <div className={styles.formRow}>
          <Button
            key="button_submit"
            type="submit"
            title="Enviar"
            aria-label="Enviar formulário"
          />
        </div>
      </form>
    </div>
  );
}
