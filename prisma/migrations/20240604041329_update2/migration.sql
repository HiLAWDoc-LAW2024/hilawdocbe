/*
  Warnings:

  - You are about to drop the `availableslot` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `appointment` DROP FOREIGN KEY `Appointment_slot_id_fkey`;

-- DropTable
DROP TABLE `availableslot`;

-- CreateTable
CREATE TABLE `Slot` (
    `slot_id` INTEGER NOT NULL AUTO_INCREMENT,
    `doctor_id` INTEGER NOT NULL,
    `date` DATETIME(3) NOT NULL,
    `start_time` DATETIME(3) NOT NULL,
    `end_time` DATETIME(3) NOT NULL,

    PRIMARY KEY (`slot_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Appointment` ADD CONSTRAINT `Appointment_slot_id_fkey` FOREIGN KEY (`slot_id`) REFERENCES `Slot`(`slot_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
