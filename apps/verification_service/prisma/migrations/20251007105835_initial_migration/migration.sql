-- CreateTable
CREATE TABLE "Issued" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "credentialType" TEXT NOT NULL,
    "workerId" TEXT NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Issued_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Issued_userId_workerId_key" ON "Issued"("userId", "workerId");
