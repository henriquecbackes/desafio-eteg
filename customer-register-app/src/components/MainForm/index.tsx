import { Input } from "../Input";
import { Button } from "../Button";
import styles from "./styles.module.css";
import Select, { type TColorOptions } from "../Select";
import { useState } from "react";
import { cpfValidator } from "cpf-cnpj-validator";
import { toast } from "react-toastify";

const colorOptions: TColorOptions[] = [
  { value: "red", label: "Vermelho", color: "#FF0000" },
  { value: "orange", label: "Laranja", color: "#FF7F00" },
  { value: "yellow", label: "Amarelo", color: "#FFFF00" },
  { value: "green", label: "Verde", color: "#00FF00" },
  { value: "blue", label: "Azul", color: "#0000FF" },
  { value: "indigo", label: "Indigo", color: "#4B0082" },
  { value: "violet", label: "Violeta", color: "#9400D3" },
];

type TFormsErrors = {
  name: string;
  cpf: string;
  email: string;
  color: string;
  observations: string;
};

export function MainForm() {
  const [name, setName] = useState("");
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");
  const [color, setColor] = useState("");
  const [observations, setObservations] = useState("");
  const [errors, setErrors] = useState<TFormsErrors>({
    name: "",
    cpf: "",
    email: "",
    color: "",
    observations: "",
  });

  const handleNameChange = (
    e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>,
  ) => {
    setName(e.target.value);
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

  const handleColorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setColor(e.target.value);
  };

  const handleObservationsChange = (
    e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>,
  ) => {
    setObservations(e.target.value);
  };

  const validateName = () => {
    const nameRegex = /^[A-Za-zá-úÁ-Ú]+(\s+[A-Za-zá-úÁ-Ú]+)+$/;

    if (!name) {
      setErrors((prevState) => ({
        ...prevState,
        name: "Campo obrigatório.",
      }));
      return false;
    } else if (!nameRegex.test(name)) {
      setErrors((prevState) => ({
        ...prevState,
        name: "Insira um nome válido.",
      }));
      return false;
    } else {
      setErrors((prevState) => ({
        ...prevState,
        name: "",
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

  const validateColor = () => {
    if (!color) {
      setErrors((prevState) => ({
        ...prevState,
        color: "Campo obrigatório.",
      }));
      return false;
    } else {
      setErrors((prevState) => ({
        ...prevState,
        color: "",
      }));
    }
    return true;
  };

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isValidName = validateName();
    const isValidCpf = validateCpf();
    const isValidEmail = validateEmail();
    const isValidColor = validateColor();

    if (isValidName && isValidCpf && isValidEmail && isValidColor) {
      toast.success("Valores cadastrados com sucesso!");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className={styles.form} action={""}>
        <div className={styles.formRow}>
          <Input
            id="name"
            value={name}
            type="text"
            placeholder="Digite seu nome"
            label="Nome Completo"
            onChange={handleNameChange}
          />
          {errors.name && <p className={styles.error}>{errors.name}</p>}
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
            options={colorOptions}
            onChange={handleColorChange}
            value={color}
          />{" "}
          {errors.color && <p className={styles.error}>{errors.color}</p>}
        </div>
        <div className={styles.formRow}>
          <Input
            id="observations"
            value={observations}
            type="text"
            placeholder="Digite algo..."
            label="Observações"
            onChange={handleObservationsChange}
          />{" "}
          {errors.observations && (
            <p className={styles.error}>{errors.observations}</p>
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
