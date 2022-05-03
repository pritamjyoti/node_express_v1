/*
  Warnings:

  - Added the required column `image` to the `user_image` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `user_image` ADD COLUMN `image` VARCHAR(255) NOT NULL;
