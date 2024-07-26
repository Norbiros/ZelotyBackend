import { PrismaClient, Prisma } from '@prisma/client'

const prisma: PrismaClient = new PrismaClient()

export default prisma
export { Prisma }
