"use client"
import * as React from "react";
import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { useRouter } from "next/navigation";
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useState } from "react";
import { Eye, EyeOff, Loader2 } from 'lucide-react';


const formSchema = z.object({
  email: z
    .email('Correo inválido')
    .min(5, "Bug title must be at least 5 characters.")
    .max(32, "Bug title must be at most 32 characters."),
  password: z
    .string()
    .min(6, "La contraseña deber tener minimo 6 caracteres.")

})

const LoadingSpinner = () => (
  <div className="flex justify-center items-center">
    <Loader2 className="animate-spin h-6 w-6 text-blue-500" />
  </div>
);

const Login = () => {


  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: { email: string; password: string }) => {
    setLoading(true);

    try {
      const res = await fetch('http://localhost:4000/api/v1/login', {
        method: 'POST',
        credentials: "include",
        headers: {
          "Content-Type": "Application/json",
        },
        body: JSON.stringify(data),
      });


      const json = await res.json();

      if (!res.ok) throw new Error(json.message || "Error al iniciar sesión.");


      router.push('/dashboard');

    } catch (err: any) {
      console.log(`Error en: ${err}`);
    } finally {
      setLoading(false);
    }

  }



  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">

      <div className="py-4 mx-auto">
        {/* <h2 className="text-2xl font-bold">Expenses</h2> */}
      </div>
      <Card className="w-full sm:max-w-md">
        <CardHeader>
          <CardTitle className="text-center text-lg">Accede a tus cuenta</CardTitle>
          <CardDescription>
            Ingresa a tu cuenta y gestiona tus gatos hormigas diarios.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-rhf-demo-title">
                      usuario
                    </FieldLabel>
                    <Input
                      {...field}
                      id="form-rhf-demo-title"
                      aria-invalid={fieldState.invalid}
                      placeholder="correo@gmail.com"
                      autoComplete="off"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="password"
                control={form.control}
                rules={{ required: "La contraseña es requerida", minLength: { value: 6, message: "Mínimo 6 caracteres" } }}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="password">
                      Contraseña
                    </FieldLabel>

                    <div className="relative">

                      <Input
                        {...field}
                        type={showPass ? "text" : "password"}
                        id="password"
                        placeholder="Tu contraseña"
                        aria-invalid={fieldState.invalid}
                      />
                      <Button
                        type="button"
                        size="sm"
                        variant="ghost"
                        className="cursor-pointer absolute right-2 top-1/2 -translate-y-1/2"
                        onClick={() => setShowPass(!showPass)}
                      >
                        {showPass ? <EyeOff /> : <Eye />}
                      </Button>
                    </div>

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
          </form>
        </CardContent>
        <CardFooter>

          <Field orientation="horizontal">
            <Button type="submit" form="form-rhf-demo" className="cursor-pointer">
              {loading ? <LoadingSpinner /> : "Ingresar"}
            </Button>
            <Button type="button" variant="outline" onClick={() => form.reset()}>
              Registrarse
            </Button>
          </Field>
        </CardFooter>
      </Card>

    </div>
  )

}

export default Login;
