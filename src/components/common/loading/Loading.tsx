import { Skeleton } from "@/components/ui/skeleton";
export default function Loading() {
  return (
    <div className="flex min-h-screen flex-col space-y-3">
      <Skeleton className='w-full h-12'/>
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="h-4 w-2/3" />
      </div>
      <div className='flex justify-between mt-10'>
      <Skeleton className='h-10 w-40' />
      <Skeleton className='h-10 w-40' />
      <Skeleton className='h-10 w-40' />
    </div>
    </div>
  );
}
