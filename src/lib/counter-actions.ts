"use server";
import { Counter } from "@/types/Counter";
import { CounterPrismaRepository } from "./counter-prisma-repository";

export interface CounterRepository {
  fetchData(id?: number): Promise<Counter | null>;
  updateCounter(id: number, value: number): Promise<Counter | null>;
}
//HACK: Mandamos siempre id 1 porque solo hay un contador en la base de datos. 
export const fetchData = async ({ id = 1 }: { id?: number } = {}) => {
  try {
    const response = await CounterPrismaRepository.fetchData(id);
    if (!response) {
      throw new Error("Contador no encontrado");
    }
    return response;
  } catch (error) {
    console.error("Error al obtener los datos del contador:", error);
    throw new Error("Error al obtener los datos del contador");
  }
};

export const updateCounter = async (id: number, value: number) => {  
  try {
    if (value < 0) {
      throw new Error("El valor del contador no puede ser negativo");
    }
    return await CounterPrismaRepository.updateCounter(id, value);  
  } catch (error) {
    console.error("Error al actualizar los datos del contador:", error);
    throw new Error("Error al actualizar los datos del contador");
  }
};

