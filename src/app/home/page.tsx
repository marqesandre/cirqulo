'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import ViolenceChart from '@/components/custom/violenceChart';
import { Button } from '@/components/ui/button';

type Kpi = {
  _id: string;
  type: string;
  count: number;
};

export default function Home() {
  const [kpis, setKpis] = useState<Kpi[]>([]);
  const router = useRouter();

  useEffect(() => {
    async function fetchKpis() {
      try {
        const response = await fetch('http://localhost:5000/api/kpis');
        const data = await response.json();
        setKpis(data);
      } catch (error) {
        console.error('Failed to fetch KPIs:', error);
      }
    }

    fetchKpis();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  return (
    <div className="flex flex-col h-screen w-screen justify-center items-center p-8">
      <Card className="flex flex-col w-full">
        <CardHeader>
          <CardTitle>Dashboard</CardTitle>
          <CardDescription>Faça aqui as principais ações acerca de seu sistema de segurança.</CardDescription>
          <Button variant="secondary" className='absolute top-12 right-14' onClick={handleLogout}>Sair</Button>
        </CardHeader>
        <CardContent className='flex flex-col gap-4'>

          <div className="flex flex-row gap-4">
            {kpis.map((kpi) => (
              <Card key={kpi._id} className="w-52">
                <CardHeader>
                  <CardTitle>{kpi.type.charAt(0).toUpperCase() + kpi.type.slice(1)}</CardTitle>
                </CardHeader>
                <CardContent>
                  <span className="text-4xl font-bold">{kpi.count}</span>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className='flex flex-row gap-4'>

            <Card className="w-full">
              <CardHeader>
                <CardTitle>Indice de Violência</CardTitle>
                <CardDescription>Veja o índice de violência na sua região.</CardDescription>
              </CardHeader>
              <CardContent className='w-full'>
                <ViolenceChart />
              </CardContent>
            </Card>

            <Card className="w-full">
              <CardHeader>
                <CardTitle>Meus chamados</CardTitle>
                <CardDescription>Veja os chamados que você fez.</CardDescription>
              </CardHeader>
              <CardContent>
                <span className="text-4xl font-bold">0</span>
              </CardContent>
            </Card>

            <Card className="w-full">
              <CardHeader>
                <CardTitle>Novidades</CardTitle>
                <CardDescription>Veja as novidades do seu sistema de segurança.</CardDescription>
              </CardHeader>
              <CardContent>
                <span className="text-4xl font-bold">0</span>
              </CardContent>
            </Card>

          </div>

        </CardContent>
      </Card>
    </div>
  );
}
