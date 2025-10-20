// components/clients/ClientSearchAndFilter.tsx
'use client';

import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search } from 'lucide-react';


export default function PaymentSearchAndFilter(){

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Pesquisar por nome ou email..."
          
          className="pl-10"
        />
      </div>
      <Select >
        <SelectTrigger className="w-full sm:w-[200px]">
          <SelectValue placeholder="Filtrar por status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todos os status</SelectItem>
          <SelectItem value="completed">Concluidos</SelectItem>
          <SelectItem value="pending">Pendente</SelectItem>
          <SelectItem value="failed">Falhou</SelectItem>
        </SelectContent>
      </Select>
      <Select >
        <SelectTrigger className="w-full sm:w-[200px]">
          <SelectValue placeholder="Filtrar por metodo" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todos Metodos</SelectItem>
          <SelectItem value="mpesa">Mpesa</SelectItem>
          <SelectItem value="emola">Emola</SelectItem>
          <SelectItem value="transferencia">Transferencia</SelectItem>
          <SelectItem value="cartao">Cartao</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
