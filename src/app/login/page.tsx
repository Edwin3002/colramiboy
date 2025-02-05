"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/shadcn/card";
import FieldInput from "../../components/ui/inputs/FieldInput";
import { z } from "zod";
import useAuthHook from "@/modules/auth/hooks/useAuthHook";
import { Form, Formik } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import Button from "@/components/ui/buttons/Button";

export default function Login() {
  const { login, isLoading } = useAuthHook();

  const validationSchema = z.object({
    username: z.string().min(1, "El nombre de usuario es obligatorio"),
    password: z
      .string()
      .min(6, "La contraseña debe tener al menos 6 caracteres"),
  });

  return (
    <div className="flex items-center justify-center mt-40 md:mt-0 md:h-screen">
      <Card className="w-full max-w-md bg-[#ead1ac] dark:bg-gray-800">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Login
          </CardTitle>
          {/* <CardDescription className="text-center">
            Enter your credentials to access your account
          </CardDescription> */}
        </CardHeader>
        <CardContent className="space-y-4">
          <Formik
            initialValues={{ username: "", password: "" }}
            validationSchema={toFormikValidationSchema(validationSchema)}
            onSubmit={(values) => login(values.username, values.password)}
          >
            {({ values, handleChange, errors }) => (
              <Form>
                <FieldInput
                  className="mb-8"
                  name="username"
                  id="username"
                  label="Usuario"
                  placeholder="Ingresa tu nombre de usuario*"
                  value={values.username}
                  helperText={errors.username}
                  onChange={handleChange}
                />
                <FieldInput
                  className="mb-8"
                  name="password"
                  id="password"
                  label="Contraseña"
                  placeholder="Ingresa tu contraseña*"
                  value={values.password}
                  onChange={handleChange}
                  helperText={errors.password}
                  type="password"
                />
                <Button type="submit" className="w-full" disabled={isLoading}>
                  Login
                </Button>
              </Form>
            )}
          </Formik>
        </CardContent>
      </Card>
    </div>
  );
}
