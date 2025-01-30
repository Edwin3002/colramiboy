"use client";

import Button from "@/components/ui/buttons/Button";
import FiledInput from "@/components/ui/inputs/FiledInput";
import useAuthHook from "@/modules/auth/hooks/useAuthHook";
import { decrement, increment } from "@/providers/redux/slices/counterSlices";
import { RootState } from "@/providers/redux/store";
import { Formik, Form } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";

const validationSchema = z.object({
  username: z.string().min(1, "El nombre de usuario es obligatorio"),
  password: z
    .string()
    .min(6, "La contraseña debe tener al menos 6 caracteres")
    .refine((value) => value.trim() == "", {
      message: "La contraseña es obligatoria",
    }),
});
const Login = () => {
  const { login } = useAuthHook();
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();
  return (
    <div className="flex justify-center items-center min-h-screen ">
      <div className="w-lg max-w-md bg-[#ead1ac] dark:bg-gray-800 p-8 rounded-lg shadow-lg flex flex-col justify-center">
        <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-6">
          Iniciar sesión
        </h2>
        <Formik
          initialValues={{ username: "", password: "" }}
          validationSchema={toFormikValidationSchema(validationSchema)}
          onSubmit={(values) => login(values.username, values.password)}
        >
          {({ values, handleChange, setFieldValue, errors, touched }) => (
            <Form>
              <div className="mb-8">
                <FiledInput
                  name="username"
                  id="username"
                  label="Usuario"
                  placeholder="Ingresa tu nombre de usuario*"
                  value={values.username}
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
                  type="password"
                />
              </div>
              <Button variant="contained" color="blue" size="md" type="submit">
                Iniciar sesión
              </Button>
            </Form>
          )}
        </Formik>
      <div>
        <div>
          <button
            aria-label="Increment value"
            onClick={() => dispatch(increment())}
          >
            Increment
          </button>
          <span>{count}</span>
          <button
            aria-label="Decrement value"
            onClick={() => dispatch(decrement())}
          >
            Decrement
          </button>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Login;
