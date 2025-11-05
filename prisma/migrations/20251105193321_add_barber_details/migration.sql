-- AlterTable
ALTER TABLE "Barber" ADD COLUMN     "specialty" TEXT NOT NULL DEFAULT 'Cortes e Barbas',
ADD COLUMN     "workingHours" TEXT NOT NULL DEFAULT 'Seg-Sex: 9h-18h';
