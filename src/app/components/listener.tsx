"use client";

import { supabase } from "@/utils/supabase/client";
import { useEffect } from "react";

export default function CounterListener() {
  useEffect(() => {
    const channel = supabase
      .channel("custom-update-channel")
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "counter" },
        (payload) => {
          console.log("🔄 Cambio recibido:", payload);
          return payload.new; // Retorna el nuevo valor del contador
        }
      )
      .subscribe();
      console.log(channel)
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return null; // no muestra nada, solo escucha
}
