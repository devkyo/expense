"use client"
import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"
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
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group"


const formSchema = z.object({
  email: z
    .email('Correo inválido')
    .min(5, "Bug title must be at least 5 characters.")
    .max(32, "Bug title must be at most 32 characters."),
  password: z
    .string()
    .min(6, "La contraseña deber tener minimo 6 caracteres.")
  // .regex(/[A-Z]/, "Debe tener al menos una mayúscula")
  // .regex(/[0-9]/, "Debe tener al menos un número"),
})


const Login = () => {

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    toast("You submitted the following values:", {
      description: (
        <pre className="bg-code text-code-foreground mt-2 w-[320px] overflow-x-auto rounded-md p-4">
          <code>{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
      position: "bottom-right",
      classNames: {
        content: "flex flex-col gap-2",
      },
      style: {
        "--border-radius": "calc(var(--radius)  + 4px)",
      } as React.CSSProperties,
    })
  }



  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">


      <Card className="w-full sm:max-w-md">
        <CardHeader>
          <CardTitle className="text-center">Igresa a tu cuenta</CardTitle>
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

                    <Input
                      {...field}
                      type="password"
                      id="password"
                      placeholder="Tu contraseña"
                      aria-invalid={fieldState.invalid}
                    />


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
            <Button type="submit" form="form-rhf-demo">
              Ingresar
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
