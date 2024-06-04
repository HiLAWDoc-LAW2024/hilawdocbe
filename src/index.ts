import { PrismaClient } from "@prisma/client";
import express, { Request, Response } from "express";
import createError from "http-errors"

const prisma = new PrismaClient()
const app = express()

app.use(express.json())

// Slot API
app.get('/schedule', async (req: Request, res: Response) => {
  const slots = await prisma.slot.findMany({
  })
  res.json(slots)
})

app.get('/schedule/:id', async (req: Request, res: Response) => {
  const { id } = req.params
  const slot = await prisma.slot.findUnique({
      where: { slot_id: Number(id) },
  })
  res.json(slot)
})

app.post('/schedule', async (req: Request, res: Response) => {
  const { date, doctor_id, start_time, end_time } = req.body
  const result = await prisma.slot.create({
      data: { 
      doctor_id: doctor_id,
      date: date,
      start_time: start_time, 
      end_time: end_time
      }
  })
  res.json(result)
})

app.put('/schedule/:id', async (req: Request, res: Response) => {
  const { id } = req.params
  const slot = await prisma.slot.update({
      where: { slot_id: Number(id) },
      data: {
      ...req.body
      }
  })

  res.json(slot)
})

app.delete(`/schedule/:id`, async (req: Request, res: Response) => {
  const { id } = req.params
  const slot = await prisma.slot.delete({
      where: { slot_id: Number(id) },
  })
  res.json(slot)
})


// Appointment API
app.get('/appointment', async (req: Request, res: Response) => {
    const appointments = await prisma.appointment.findMany({
    })
    res.json(appointments)
  })

app.get('/appointment/:id', async (req: Request, res: Response) => {
    const { id } = req.params
    const appointment = await prisma.appointment.findUnique({
        where: { appointment_id: Number(id) },
    })
    res.json(appointment)
})

app.post('/appointment', async (req: Request, res: Response) => {
    const { slot_id, user_id, notes } = req.body
    const result = await prisma.appointment.create({
        data: {
        user_id: user_id, 
        notes: notes,
        slot: { connect: { slot_id: slot_id } }
        }
    })
    res.json(result)
})

app.put('/appointment/:id', async (req: Request, res: Response) => {
    const { id } = req.params
    const appointment = await prisma.appointment.update({
        where: { appointment_id: Number(id) },
        data: {
        ...req.body
        }
    })

    res.json(appointment)
})

app.delete(`/appointment/:id`, async (req: Request, res: Response) => {
    const { id } = req.params
    const appointment = await prisma.appointment.delete({
        where: { appointment_id: Number(id) },
    })
    res.json(appointment)
})

// handle 404 error
app.use((req: Request, res: Response, next: Function) => {
  next(createError(404))
})

app.listen(3000, () =>
  console.log(`⚡️[server]: Server is running at http://localhost:3000`)
)