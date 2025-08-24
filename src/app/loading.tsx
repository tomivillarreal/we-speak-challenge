import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
    return (
        <div className="flex flex-col items-center gap-10">
            {/* Logo skeleton */}
            <Skeleton className="h-[50px] w-[50px] rounded-lg" />
            
            {/* Title and subtitle skeleton */}
            <div className="flex flex-col items-center gap-2">
                <Skeleton className="h-16 w-80 rounded-lg" />
                <Skeleton className="h-6 w-40 rounded-md" />
            </div>
            
            {/* Counter card skeleton */}
            <div className="p-10 flex flex-col gap-4 h-[300px] w-full sm:w-[350px] justify-center items-center border rounded-lg">
                {/* Counter controls skeleton */}
                <div className="grid grid-cols-3 justify-items-center items-center w-full gap-4">
                    <Skeleton className="h-10 w-10 rounded-md" />
                    <Skeleton className="h-20 w-20 rounded-lg" />
                    <Skeleton className="h-10 w-10 rounded-md" />
                </div>
                
                {/* Date calculator skeleton */}
                <Skeleton className="h-6 w-64 rounded-md" />
            </div>
        </div>
    )
};