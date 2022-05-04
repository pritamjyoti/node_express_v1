/*
  Warnings:

  - You are about to drop the column `user_type` on the `product_type` table. All the data in the column will be lost.
  - Added the required column `type` to the `product_type` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `product_type` DROP COLUMN `user_type`,
    ADD COLUMN `type` VARCHAR(255) NOT NULL;
