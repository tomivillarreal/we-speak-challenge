import { createClient } from "@/utils/supabase/server";
import { CounterRepository } from "./counter-actions";
import { Counter } from "@/types/Counter";

export const CounterSupabaseRepository: CounterRepository = {
  fetchData: async (id) => {
    const supabase = await createClient();
    const { data: counter } = await supabase
      .from("counter")
      .select("*")
      .eq("id", id)
      .single();
      
    return counter as Counter;
  },
  updateCounter: async (id, value) => {
    const supabase = await createClient();
    const { data: counter } = await supabase
      .from("counter")
      .update({ value, updated_at: new Date() })
      .eq("id", id)
      .select()
      .single();

    return counter as Counter;
  },
};
