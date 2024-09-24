import { PrismaClient } from "@prisma/client";

declare global {
    var cachedPrisma: PrismaClient
}

let prisma: PrismaClient
if (process.env.NODE_ENV !== 'production') {
    prisma = new PrismaClient()
} else {
    if (!global.cachedPrisma) {
        global.cachedPrisma = new PrismaClient()
    }
    prisma = global.cachedPrisma
}

export const db = prisma

// Será feito com que ao invés de ser feito varias ligações com o banco, fica limitado há apenas uma, quando o reload for executado!