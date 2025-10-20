// components/clients/ClientSearchAndFilter.tsx
'use client';

import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search } from 'lucide-react';


export default function LoansSearchAndFilter(){

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Pesquisar por nome Id"
          
          className="pl-10"
        />
      </div>
      <Select >
        <SelectTrigger className="w-full sm:w-[200px]">
          <SelectValue placeholder="Filtrar por status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todos os status</SelectItem>
          <SelectItem value="pending">Pendente</SelectItem>
          <SelectItem value="approved">Aprovado</SelectItem>
          <SelectItem value="declined">Recusado</SelectItem>
          <SelectItem value="paid">Pago</SelectItem>
        </SelectContent>
      </Select>

    </div>
  );
}
