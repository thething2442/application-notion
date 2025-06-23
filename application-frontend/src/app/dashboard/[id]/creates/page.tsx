'use client'
import React from 'react'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription,SheetTrigger, SheetFooter } from '@/components/ui/sheet'     
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useParams } from 'next/navigation'
import { useFetch } from '@/hooks/usefetch'
import { Loader2 } from 'lucide-react'
type ProjectData = {
  name: string;
  description: string;
}

type ProjectResponse = {
  data: ProjectData;
}
const CreatesPage = () => {
  const { id } = useParams()
  const { data, loading, error, refetch } = useFetch<ProjectResponse>(`${process.env.NEXT_PUBLIC_API_PROJECT!}/${id}`)
  

  const onSubmit = (data: ProjectData) => {
    console.log(data)
  }
  return (
    <div>
      <Sheet>
        <SheetTrigger asChild className='cursor-pointer absolute top-0 right-0'>
          <Button>Create</Button>
        </SheetTrigger>
        <SheetContent>
          {loading ? (
            <div className='flex justify-center items-center h-full'>
              <Loader2 className='w-4 h-4 animate-spin' />
            </div>
          ) : data ? (
            <div className='flex flex-col gap-4'>
              <p className='text-lg text-gray-500 font-bold'>{data.data.name}</p>
              <p className='text-sm text-gray-500'>{data.data.description}</p>
            </div>
          ) : (
            <div>
              <p>No project found</p>
            </div>
          )}
        </SheetContent>
        <SheetFooter>
          <Button asChild>Create</Button>
          <Button variant="outline" asChild>Cancel</Button>
        </SheetFooter>
      </Sheet>
    </div>
  )
}

export default CreatesPage