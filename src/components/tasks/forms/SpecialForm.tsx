import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useForm } from 'react-hook-form'
import {
  descriptionAndRefSchema,
  generalInfoSchema,
  technicalDetailsSchema,
} from './schemas/special.schemas'
import type { z } from 'zod'
import { DateTimePicker } from '@/components/ui/date-time-picker'
import { SelectTaskPriority } from './inputs/SelectTaskPriority'
import { SelectBoard } from '@/components/boards/inputs/SelectBoard'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, type FC } from 'react'
import type {
  CreateSpecialTaskDTO,
  TaskType,
} from '@/lib/api/interfaces/tasks.interface'
import { Textarea } from '@/components/ui/textarea'
import { ReviewTask } from './ReviewTask'
import { Done } from './Done'
import { UploadFilesInput } from '@/components/global/inputs/files/UploadFilesInput'

interface Props {
  step: number
  setStep: (step: number) => void
  specialTask: CreateSpecialTaskDTO
  updateSpecialTask: (data: Partial<CreateSpecialTaskDTO>) => void
  taskType: TaskType | null
  reset: () => void
}

export const SpecialForm: FC<Props> = (props) => {
  return (
    <>
      {props.step === 2 ? (
        <GeneralInfo {...props} />
      ) : props.step === 3 ? (
        <DescriptionAndReferences {...props} />
      ) : props.step === 4 ? (
        <TechnicalDetails {...props} />
      ) : props.step === 5 ? (
        <ReviewTask
          setStep={props.setStep}
          specialTask={props.specialTask}
          taskType={props.taskType}
          step={props.step}
        />
      ) : props.step === 6 ? (
        <Done reset={props.reset} />
      ) : null}
    </>
  )
}

interface FormProps extends Props {}

const GeneralInfo: FC<FormProps> = ({
  specialTask,
  updateSpecialTask,
  setStep,
  step,
}) => {
  const form = useForm<z.infer<typeof generalInfoSchema>>({
    defaultValues: {
      title: specialTask.title || '',
      boardId: specialTask.boardId || '',
      dueDate: specialTask.dueDate ? new Date(specialTask.dueDate) : undefined,
      priority: specialTask.priority || undefined,
    },
    resolver: zodResolver(generalInfoSchema),
  })

  useEffect(() => {
    if (specialTask) {
      form.reset({
        title: specialTask.title || '',
        boardId: specialTask.boardId || '',
        dueDate: specialTask.dueDate
          ? new Date(specialTask.dueDate)
          : undefined,
        priority: specialTask.priority || undefined,
      })
    }
  }, [specialTask])

  const onSubmit = (data: z.infer<typeof generalInfoSchema>) => {
    updateSpecialTask(data)
    setStep(step + 1)
  }

  return (
    <div className="size-full flex flex-col">
      <h1 className="font-bold text-xl text-center">Información General</h1>
      <p className="my-10">
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

const DescriptionAndReferences: FC<FormProps> = ({
  specialTask,
  updateSpecialTask,
  setStep,
  step,
}) => {
  const form = useForm<z.infer<typeof descriptionAndRefSchema>>({
    defaultValues: {
      description: specialTask.description || '',
      referenceFiles: specialTask.referenceFiles || [],
    },
    resolver: zodResolver(descriptionAndRefSchema),
  })

  useEffect(() => {
    if (specialTask) {
      form.reset({
        description: specialTask.description || '',
        referenceFiles: specialTask.referenceFiles || [],
      })
    }
  }, [specialTask])

  const onSubmit = (data: z.infer<typeof descriptionAndRefSchema>) => {
    updateSpecialTask(data)
    setStep(step + 1)
  }

  return (
    <div className="size-full flex flex-col">
      <h1 className="font-bold text-xl text-center">
        Descripción y Referencias
      </h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 w-full flex flex-col h-full mt-10"
        >
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  ¿Qué necesitas? Describe tu idea y sube lo que creas útil como
                  referencia. (?)*
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Proporciónanos todos los detalles necesarios para entender tu solicitud..."
                    className="min-h-52 resize-none"
                    maxLength={1000}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="referenceFiles"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Archivos de referencia</FormLabel>
                <FormControl>
                  <UploadFilesInput
                    initialFiles={specialTask.referenceFiles}
                    onChange={(files) => {
                      field.onChange(Array.from(files))
                      console.log(form.getValues('referenceFiles'))
                    }}
                    name="referenceFiles"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

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

const TechnicalDetails: FC<FormProps> = ({
  specialTask,
  updateSpecialTask,
  setStep,
  step,
}) => {
  const form = useForm<z.infer<typeof technicalDetailsSchema>>({
    defaultValues: {
      size: specialTask.size || '',
      legals: specialTask.legals || '',
      requiredFiles: specialTask.requiredFiles || [],
    },
    resolver: zodResolver(technicalDetailsSchema),
  })

  useEffect(() => {
    if (specialTask) {
      form.reset({
        size: specialTask.size || '',
        legals: specialTask.legals || '',
        requiredFiles: specialTask.requiredFiles || [],
      })
    }
  }, [specialTask])

  const onSubmit = (data: z.infer<typeof technicalDetailsSchema>) => {
    updateSpecialTask(data)
    setStep(step + 1)
  }

  return (
    <div className="size-full flex flex-col">
      <h1 className="font-bold text-xl text-center">Detalles Técnicos</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 w-full flex flex-col h-full mt-10"
        >
          <FormField
            control={form.control}
            name="size"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Agrega las medidas*</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Ej: 1080 x 1920 px (para digital) | A4, 300 dpi (para impresa)"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="legals"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Si tu solicitud lleva legales, agrégalos en este campo
                </FormLabel>
                <FormControl>
                  <Textarea
                    className="resize-none min-h-36"
                    maxLength={500}
                    placeholder="Ej: Derechos de autor, licencias, etc."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="requiredFiles"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Adjunta imágenes, logos o archivos que ayuden al diseño
                </FormLabel>
                <FormControl>
                  <UploadFilesInput
                    initialFiles={specialTask.requiredFiles}
                    onChange={(files) => {
                      field.onChange(Array.from(files))
                    }}
                    name="requiredFiles"
                  />
                </FormControl>
                <FormDescription>
                  Usa archivos en buena calidad (idealmente PNG o PDF). Esto nos
                  permitirá entregarte un resultado más claro y alineado a lo
                  que necesitas.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
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
