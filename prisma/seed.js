const { PrismaClient, Role, Speciality, AppointmentStatus } = require("@prisma/client")
const prisma = new PrismaClient()
const bcrypt = require("bcrypt");
async function main() {  
  console.log("🗑 Clearing old data...")

  await prisma.message.deleteMany()
  await prisma.appointment.deleteMany()
  await prisma.concerns.deleteMany()
  await prisma.doctor.deleteMany()
  await prisma.patient.deleteMany()
  await prisma.user.deleteMany()

  console.log("🌱 Seeding fresh data...")
  const hashedPassword = await bcrypt.hash("password123", 10);

  const doctorUser = await prisma.user.create({
    data: {
      email: "doctor@mediso.dev",
      password: hashedPassword,
      name: "Dr. Alice Heart",
      role: Role.DOCTOR,
      doctor: {
        create: {
          speciality: Speciality.CARDIOLOGY
        }
      }
    },
    include: { doctor: true }
  })

  const patientUser = await prisma.user.create({
    data: {
      email: "patient@mediso.dev",
      password: hashedPassword,
      name: "John Doe",
      role: Role.PATIENT,
      patient: { create: {} }
    },
    include: { patient: true }
  })

  const chestPain = await prisma.concerns.create({
    data: {
      title: "Chest pain during exercise",
      description: "Sharp chest pain after 10 minutes of running. Could be cardiac-related.",
      speciality: Speciality.CARDIOLOGY,
      userId: patientUser.id,
      upVotes: 3
    }
  })

  const visionIssue = await prisma.concerns.create({
    data: {
      title: "Visibility issues at night",
      description: "Difficulty seeing in dim light and glare sensitivity.",
      speciality: Speciality.OPHTHALMOLOGY,
      userId: patientUser.id,
      upVotes: 5
    }
  })

  const appointment = await prisma.appointment.create({
    data: {
      doctorId: doctorUser.doctor.id,
      patientId: patientUser.patient.id,
      doctorName: doctorUser.name,
      concernId: chestPain.id,
      concernTitle: chestPain.title,
      appointmentDate: new Date(Date.now() + 1000 * 60 * 60 * 24),
      startTime: new Date(Date.now() + 1000 * 60 * 60 * 24 + 9 * 60 * 60 * 1000), 
      endTime: new Date(Date.now() + 1000 * 60 * 60 * 24 + 10 * 60 * 60 * 1000), 
      status: AppointmentStatus.CONFIRMED
    }
  })

  await prisma.message.createMany({
    data: [
      {
        appointmentId: appointment.id,
        sender: "PATIENT",
        content: "Hi doctor, I’ve been having chest pain after running."
      },
      {
        appointmentId: appointment.id,
        sender: "DOCTOR",
        content: "Does the pain come with shortness of breath?"
      },
      {
        appointmentId: appointment.id,
        sender: "PATIENT",
        content: "Yes, especially after climbing stairs."
      },
      {
        appointmentId: appointment.id,
        sender: "DOCTOR",
        content: "We should do an ECG and blood test. Let’s meet tomorrow at 9AM."
      }
    ]
  })

  console.log("✅ Seeding finished: Doctor, Patient, Concerns, Appointment & Messages created.")
}

main()
  .catch(e => {
    console.error("❌ Seed error:", e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
