"use client";

import Button from "@/components/ui/buttons/Button";
import FiledInput from "@/components/ui/inputs/FiledInput";
// import { decrement, increment } from "@/providers/redux/slices/counterSlices";
import { Formik, Form } from "formik";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";

const validationSchema = z.object({
  document: z
    .string()
    .min(5, "El documento debe tener al menos 5 números")
    .max(15, "El documento debe tener menos  de 15 números"),
  email: z
    .string()
    .min(10, "El correo debe tener al menos 10 caracteres")
    .max(50, "El correo debe tener menos de 50 caracteres")
    .refine(
      (value) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(value);
      },
      {
        message: "El correo no tiene un formato válido",
      }
    ),
});

const Invitation = () => {
  // const count = useSelector((state: RootState) => state.counter.value);
  // const dispatch = useDispatch();
  return (
    <div className="flex justify-center items-center min-h-screen ">
      <div className="w-lg max-w-md bg-[#ead1ac] dark:bg-gray-800 p-8 rounded-lg shadow-lg flex flex-col justify-center">
        <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-6">
          Registrar candidato
        </h2>
        <Formik
          initialValues={{ document: "", email: "" }}
          validationSchema={toFormikValidationSchema(validationSchema)}
          onSubmit={(values) => console.log(values.document, values.email)}
        >
          {({ values, handleChange, errors }) => (
            <Form>
              <div className="mb-8">
                <FiledInput
                  name="document"
                  id="document"
                  label="Número documento"
                  placeholder="Ingresa el número de documento del candidato*"
                  value={values.document}
                  onChange={handleChange}
                  helperText={errors.document}
                />
              </div>
              <div className="mb-8">
                <FiledInput
                  name="email"
                  id="email"
                  label="Correo"
                  placeholder="Ingresa el correo del candidato*"
                  value={values.email}
                  helperText={errors.email}
                  onChange={handleChange}
                  type="email"
                />
              </div>
              <div className="flex justify-center">
                <Button
                  variant="contained"
                  color="blue"
                  size="md"
                  type="submit"
                >
                  Guardar
                </Button>
              </div>
            </Form>
          )}
        </Formik>
        {/* <div>
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
        </div> */}
      </div>
    </div>
  );
};

export default Invitation;
