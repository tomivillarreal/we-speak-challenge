"use client"
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { updateCounter } from "@/lib/counter-actions";
import { useState } from "react";
import { toast } from "sonner";
import { useActionState, startTransition } from 'react'
import DateCalculator from "./data-calculator";
import { Spinner } from "@/components/ui/shadcn-io/spinner";
import { Circle, MinusIcon, PlusIcon, RotateCcw } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Counter } from "@/types/Counter";

export default function Counter({ data }: { data: Counter }) {
    const [counter, setCounter] = useState(data);

    const increment = async () => {
        try {
            const response = await updateCounter(1, counter.value + 1);
            setCounter(response);
            toast.success("Contador incrementado con éxito", { style: { backgroundColor: '#7e55f6', color: '#fff', borderColor: '#6b4fdb' } });
        } catch (error) {
            toast.error("Error al incrementar el contador");
            console.error("Error incrementando el contador:", error);
        }
    };
    const [stateIncrement, actionIncrement, pendingIncrement] = useActionState(increment, false);

    const decrement = async () => {
        try {
            const response = await updateCounter(1, counter.value - 1);
            setCounter(response);
            toast.success("Contador decrementado con éxito", { style: { backgroundColor: '#7e55f6', color: '#fff', borderColor: '#6b4fdb' } });
        } catch (error) {
            toast.error("El valor del contador no puede ser negativo");
            console.error("Error decrementando el contador:", error);
        }
    };
    const [stateDecrement, actionDecrement, pendingDecrement] = useActionState(decrement, false);

    const reset = async () => {
        try {
            const response = await updateCounter(1, 0);
            setCounter(response);
            toast.success("Contador reseteado con éxito", { style: { backgroundColor: '#7e55f6', color: '#fff', borderColor: '#6b4fdb' } });
        } catch (error) {
            toast.error("El valor del contador no puede ser negativo");
            console.error("Error reseteando el contador:", error);
        }
    };
    const [stateReset, actionReset, pendingReset] = useActionState(reset, false);

    return (
        <Card className="p-10 flex flex-col gap-4 h-[300px] w-full sm:w-[350px] justify-center items-center">
            <Tooltip>
                <TooltipTrigger>
                    <Button size="icon" variant={"ghost"} className="cursor-pointer" onClick={() => startTransition(actionReset)} disabled={pendingReset}> {pendingReset ? <Spinner size={20} /> : <RotateCcw />}</Button>
                </TooltipTrigger>
                <TooltipContent>
                    <p>Resetear a 0</p>
                </TooltipContent>
            </Tooltip>
            <div className="grid grid-cols-3 justify-items-center items-center w-full">
                <Tooltip>
                    <TooltipTrigger>
                        <Button size="icon" className="cursor-pointer" onClick={() => startTransition(actionDecrement)} disabled={pendingDecrement}> {pendingDecrement ? <Spinner size={20} /> : <MinusIcon />}</Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Decrementar contador</p>
                    </TooltipContent>
                </Tooltip>
                <h4 className="font-semibold text-7xl text-center">
                    {pendingDecrement || pendingIncrement ? <Spinner variant="circle-filled" size={72} /> : counter.value}
                </h4>
                <Tooltip>
                    <TooltipTrigger>
                        <Button size="icon" className="bg-[#7e55f6] hover:bg-[#6b4fdb] cursor-pointer" onClick={() => startTransition(actionIncrement)} disabled={pendingIncrement}> {pendingIncrement ? <Spinner size={20} /> : <PlusIcon />}</Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Incrementar contador</p>
                    </TooltipContent>
                </Tooltip>
            </div>

            <DateCalculator date={counter.updated_at} />
        </Card>
    )
}