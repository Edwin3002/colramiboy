"use client";

import Button from "@/components/ui/buttons/Button";
import FiledInput from "@/components/ui/inputs/FieldInput";
import useAuthHook from "@/modules/auth/hooks/useAuthHook";
import { Formik, Form } from "formik";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";

const validationSchema = z.object({
  username: z.string().min(1, "El nombre de usuario es obligatorio"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
});

const Login = () => {
  const { login, isLoading } = useAuthHook();
  return (
    <div className="flex justify-center items-center min-h-screen ">
      <div className="w-sm lg:w-lg bg-[#ead1ac] dark:bg-gray-800 p-8 rounded-lg shadow-lg flex flex-col justify-center">
        <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-6">
          Iniciar sesión
        </h2>
        <Formik
          initialValues={{ username: "", password: "" }}
          validationSchema={toFormikValidationSchema(validationSchema)}
          onSubmit={(values) => login(values.username, values.password)}
        >
          {({ values, handleChange, errors }) => (
            <Form>
              <div className="mb-8">
                <FiledInput
                  name="username"
                  id="username"
                  label="Usuario"
                  placeholder="Ingresa tu nombre de usuario*"
                  value={values.username}
                  helperText={errors.username}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-8">
                <FiledInput
                  name="password"
                  id="password"
                  label="Contraseña"
                  placeholder="Ingresa tu contraseña*"
                  value={values.password}
                  onChange={handleChange}
                  helperText={errors.password}
                  type="password"
                />
              </div>
              <div className="flex justify-center">
                <Button
                  disabled={isLoading}
                  variant="contained"
                  color="blue"
                  size="md"
                  type="submit"
                >
                  Continuar
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Login;
