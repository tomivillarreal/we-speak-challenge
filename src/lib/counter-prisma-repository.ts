import { CounterRepository } from "./counter-actions";
import { Counter } from "@/types/Counter";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const CounterPrismaRepository: CounterRepository = {
  fetchData: async (id) => {
    const response = await prisma.counter.findUnique({
      where: { id },
    });

    return response as Counter;
  },
  updateCounter: async (id, value) => {
    const response = await prisma.counter.update({
      where: { id },
      data: { value, updated_at: new Date() },
    });
    
    return response as Counter;
  },
};
