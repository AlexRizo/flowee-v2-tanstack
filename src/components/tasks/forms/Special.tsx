import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useForm } from 'react-hook-form'
import { generalInfoSchema } from './schemas/special.schemas'
import type { z } from 'zod'
import { DateTimePicker } from '@/components/ui/date-time-picker'
import { SelectTaskPriority } from './inputs/SelectTaskPriority'
import { SelectBoard } from '@/components/boards/inputs/SelectBoard'
import { zodResolver } from '@hookform/resolvers/zod'

export const Special = () => {
  return <GeneralInfo />
}

const GeneralInfo = () => {
  const form = useForm<z.infer<typeof generalInfoSchema>>({
    defaultValues: {
      title: '',
      boardId: '',
      dueDate: new Date(),
      priority: undefined,
    },
    resolver: zodResolver(generalInfoSchema),
  })

  const onSubmit = (data: z.infer<typeof generalInfoSchema>) => {
    console.log(data)
  }

  return (
    <div className="h-full flex flex-col">
      <h1 className="font-bold text-xl text-center">Información General</h1>
      <p className='my-10'>
        Llena este formulario con los detalles de tu solicitud para que nuestro
        equipo de diseño pueda ayudarte de manera efectiva. ¡Entre más claro
        seas, mejor será el resultado!
      </p>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 w-full flex flex-col h-full"
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre del proyecto o campaña* (?)</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Ej: Campaña Día del Padre | Mayo"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <DateTimePicker
            control={form.control}
            setValue={form.setValue}
            name="dueDate"
            label="Fecha de entrega*"
            placeholder="Selecciona una fecha"
          />
          <div className="grid grid-cols-2 gap-2 items-start">
            <FormField
              control={form.control}
              name="priority"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Prioridad*</FormLabel>
                  <FormControl>
                    <SelectTaskPriority
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="boardId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tablero*</FormLabel>
                  <FormControl>
                    <SelectBoard
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-violet-600 hover:bg-violet-700 mt-auto"
          >
            Continuar
          </Button>
        </form>
      </Form>
    </div>
  )
}
