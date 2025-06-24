'use client'

import React from 'react'
import { useFetch } from '@/hooks/usefetch'
import { useParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ExternalLink, Plus } from 'lucide-react'
import { useComponentContext } from "@/components/ComponentContext" // ✅ Import the context

type UserDataResponse = {
  projects: Array<{
    id: string;
    name: string;
    description: string;
    createdAt: string;
    updatedAt: string;
    createdBy: string;
    updatedBy: string;
    status: string;
    priority: string;
    severity: string;
    type: string;
  }>;
};

const AccountPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const { selectedComponent } = useComponentContext(); // ✅ Use context inside component
  const { data: userData, loading, error } = useFetch<UserDataResponse>(`${process.env.NEXT_PUBLIC_API_USER!}/${id}`);

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error) return <div className="text-center py-10 text-red-500">Error: {error}</div>;

  return (
    <div className="container mx-auto p-6 space-y-6">
      <h2 className="text-2xl font-semibold mb-4">Your Projects</h2>

      {/* 👇 Render the selected component from global context */}
      {selectedComponent && (
        <div className="mt-10">
         
          {selectedComponent}
        </div>
      )}
    </div>
  );
};

export default AccountPage;
