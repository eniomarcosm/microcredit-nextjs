// components/clients/ClientTable.tsx
'use client';


import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye } from 'lucide-react';




function getStatusBadge(status: string) {
  const variants: Record<string, { variant: "default" | "secondary" | "destructive" | "outline", label: string }> = {
    verified: { variant: "default", label: "Verificado" },
    pending: { variant: "secondary", label: "Pendente" },
    rejected: { variant: "destructive", label: "Rejeitado" },
  };
  const config = variants[status] || { variant: "outline" as const, label: status };
  return <Badge variant={config.variant}>{config.label}</Badge>;
}

export default function PaymentTable() {

  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow className='font-bold text-sm bg-gray-200'>
              <TableHead>ID</TableHead>
              <TableHead>Cliente</TableHead>
              <TableHead>Emprestimo</TableHead>
              <TableHead>Valor</TableHead>
              <TableHead>Metodo</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Data</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
                <TableRow >
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell>
                    <Button className=' text-black font-semibold' variant="ghost" size="sm" >
                      <Eye className="h-4 w-4 mr-1" />
                      Ver 
                    </Button>
                  </TableCell>
                </TableRow>

          </TableBody>
        </Table>
      </div>
    </div>
  );
}