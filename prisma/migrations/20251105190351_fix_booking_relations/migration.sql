/*
  Warnings:

  - You are about to drop the `_BarbershopToBooking` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_BarbershopToBooking" DROP CONSTRAINT "_BarbershopToBooking_A_fkey";

-- DropForeignKey
ALTER TABLE "_BarbershopToBooking" DROP CONSTRAINT "_BarbershopToBooking_B_fkey";

-- DropTable
DROP TABLE "_BarbershopToBooking";
