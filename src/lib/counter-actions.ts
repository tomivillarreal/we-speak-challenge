"use server";
import { Counter } from "@/types/Counter";
import { createClient } from "../utils/supabase/server";

export const fetchData = async ({ id = 1 }: { id?: number } = {}) => {
  try {
    const supabase = await createClient();
    const { data: counter, error } = await supabase
      .from("counter")
      .select("*")
      .eq("id", id)
      .single();
    
    if (error) {
      console.error("Error fetching counter:", error);
      throw new Error("Failed to fetch counter data");
    }

    return counter as Counter;
  } catch (error) {
    console.error("Error in fetchCounterData:", error);
    throw new Error("Failed to fetch counter data");
  }
};

export const updateCounter = async (id: number, value: number) => {  
  try {
    if (value < 0) {
      throw new Error("El valor del contador no puede ser negativo");
    }
    const supabase = await createClient();
    const { data: counter, error } = await supabase
      .from("counter")
      .update({ value: value })
      .eq("id", id)
      .select()
      .single();
    
    if (error) {
      console.error("Error updating counter:", error);
      throw new Error("Failed to update counter data");
    }

    return counter as Counter;
  } catch (error) {
    console.error("Error in updateCounterData:", error);
    throw new Error("Failed to update counter data");
  }
};

export const suscribeToCounter = async () => {
  const supabase = await createClient();
  const counter = supabase.channel('custom-update-channel')
  .on(
    'postgres_changes',
    { event: 'UPDATE', schema: 'public', table: 'counter' },
    (payload) => {
      console.log('Change received!', payload)
    }
  )
  .subscribe()
}


