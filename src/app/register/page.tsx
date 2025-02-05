"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/shadcn/card";
import FieldInput from "../../components/ui/inputs/FieldInput";
import { z } from "zod";
import { Form, Formik } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import Button from "@/components/ui/buttons/Button";
import useRegisterHook from "./useRegisterHook";
import Select from "@/components/ui/inputs/Select";
import { typeDocuments } from "@/constants/documents";

export default function Register() {
  const { register, isLoading } = useRegisterHook();

  const validationSchema = z.object({
    firstName: z
      .string({ message: "El campo es obligatorio" })
      .min(3, "El campo debe tener mas 3 caracteres")
      .max(50, "El campo debe tener 50 o menos caracteres"),
    lastName: z
      .string({ message: "El campo es obligatorio" })
      .min(3, "El campo debe tener mas 3 caracteres")
      .max(50, "El campo debe tener 50 o menos caracteres"),
    adress: z
      .string({ message: "El campo es obligatorio" })
      .min(3, "El campo debe tener mas 3 caracteres")
      .max(50, "El campo debe tener 50 o menos caracteres"),
    typeDocument: z.string({ message: "El campo es obligatorio" }),
    document: z
      .string({ message: "El campo es obligatorio" })
      .min(5, "El campo debe tener mas 5 caracteres")
      .max(15, "El campo debe tener menos 15 caracteres"),
    city: z
      .string({ message: "El campo es obligatorio" })
      .min(3, "El campo debe tener mas 3 caracteres")
      .max(50, "El campo debe tener 50 o menos caracteres"),
    phone: z
      .number({ message: "El campo es obligatorio" })
      .min(10000000, "El campo debe tener mas 8 caracteres")
      .max(9999999999, "El campo debe tener menos 10 caracteres"),
    telegram: z
      .number()
      .min(10000000, "El campo debe tener mas 8 caracteres")
      .max(9999999999, "El campo debe tener menos 10 caracteres")
      .optional(),
    job: z
      .string({ message: "El campo es obligatorio" })
      .min(3, "El campo debe tener mas 3 caracteres")
      .max(50, "El campo debe tener 50 o menos caracteres"),
    reference: z
      .string({ message: "El campo es obligatorio" })
      .min(3, "El campo debe tener mas 3 caracteres")
      .max(50, "El campo debe tener 50 o menos caracteres"),
  });

  return (
    <div className="flex items-center justify-center mt-10 md:mt-0 md:h-screen">
      <Card className="w-full max-w-md lg:max-w-4xl bg-[#ead1ac] dark:bg-gray-800">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Registro
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Formik
            initialValues={{
              firstName: "",
              lastName: "",
              adress: "",
              typeDocument: "",
              document: "",
              city: "",
              phone: "",
              telegram: "",
              job: "",
              reference: "",
            }}
            validationSchema={toFormikValidationSchema(validationSchema)}
            onSubmit={(values) => console.log(values)}
          >
            {({ values, handleChange, errors }) => (
              <Form className="lg:grid lg:grid-cols-2 gap-4">
                <FieldInput
                  name="firstName"
                  id="firstName"
                  label="Nombres*"
                  placeholder="Ingresa tus nombres"
                  value={values.firstName}
                  helperText={errors.firstName}
                  onChange={handleChange}
                />
                <FieldInput
                  name="lastName"
                  id="lastName"
                  label="Apellidos*"
                  placeholder="Ingresa tus apellidos"
                  value={values.lastName}
                  helperText={errors.lastName}
                  onChange={handleChange}
                />
                <Select
                  name="typeDocument"
                  id="typeDocument"
                  label="Tipo de documento*"
                  value={values.typeDocument}
                  placeholder="Ingresa el tipo de documento"
                  onChange={handleChange}
                  helperText={errors.typeDocument}
                  optionLabel="name"
                  optionValue="type"
                >
                  {Object.values(typeDocuments).map(({ name, type }, i) => (
                    <option key={i + type + name} value={type}>
                      {name}
                    </option>
                  ))}
                </Select>
                <FieldInput
                  name="document"
                  id="document"
                  label="Documento*"
                  placeholder="Ingresa el número de documento"
                  value={values.document}
                  helperText={errors.document}
                  onChange={handleChange}
                  minLength={5}
                  maxLength={15}
                />
                <FieldInput
                  name="adress"
                  id="adress"
                  label="Dirección*"
                  placeholder="Ingresa tu dirección"
                  value={values.adress}
                  helperText={errors.adress}
                  onChange={handleChange}
                />
                <FieldInput
                  name="city"
                  id="city"
                  label="Ciudad*"
                  placeholder="Ingresa tu lugar de residencia*"
                  value={values.city}
                  helperText={errors.city}
                  onChange={handleChange}
                />
                <FieldInput
                  type="number"
                  name="phone"
                  id="phone"
                  label="Celular*"
                  placeholder="Ingresa tu Celular"
                  value={values.phone}
                  helperText={errors.phone}
                  onChange={handleChange}
                />
                <FieldInput
                  type="number"
                  name="telegram"
                  id="telegram"
                  label="Telegram"
                  placeholder="Ingresa tu telegram"
                  value={values.telegram}
                  helperText={errors.telegram}
                  onChange={handleChange}
                />
                <FieldInput
                  name="job"
                  id="job"
                  label="Profesión*"
                  placeholder="Ingresa tu profesión"
                  value={values.job}
                  helperText={errors.job}
                  onChange={handleChange}
                />
                <FieldInput
                  name="reference"
                  id="reference"
                  label="Referencia*"
                  placeholder="Quien te invito?"
                  value={values.reference}
                  helperText={errors.reference}
                  onChange={handleChange}
                />

                <div className="self-center col-span-2 flex justify-center">
                  <Button type="submit" className="w-1/2" disabled={isLoading}>
                    Continuar
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </CardContent>
      </Card>
    </div>
  );
}
