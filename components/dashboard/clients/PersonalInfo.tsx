// components/clients/PersonalInfoTab.tsx
'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { UserCheck, UserX } from 'lucide-react';
import { User } from '@/lib/dummyData';

interface PersonalInfoTabProps {
  client: User;
}

function getStatusBadge(status: string) {
  const variants: Record<string, { variant: "default" | "secondary" | "destructive" | "outline", label: string }> = {
    verified: { variant: "default", label: "Verificado" },
    pending: { variant: "secondary", label: "Pendente" },
    rejected: { variant: "destructive", label: "Rejeitado" },
  };
  const config = variants[status] || { variant: "outline" as const, label: status };
  return <Badge variant={config.variant}>{config.label}</Badge>;
}

export default function PersonalInfoTab({ client }: PersonalInfoTabProps) {
  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm text-muted-foreground">Nome</label>
          <p>{client.name}</p>
        </div>
        <div>
          <label className="text-sm text-muted-foreground">Email</label>
          <p>{client.email}</p>
        </div>
        <div>
          <label className="text-sm text-muted-foreground">Telefone</label>
          <p>{client.phone}</p>
        </div>
        <div>
          <label className="text-sm text-muted-foreground">Endereço</label>
          <p>{client.address}</p>
        </div>
        <div>
          <label className="text-sm text-muted-foreground">Status dos Documentos</label>
          <div className="mt-1">{getStatusBadge(client.documentStatus)}</div>
        </div>
        <div>
          <label className="text-sm text-muted-foreground">Data de Cadastro</label>
          <p>{new Date(client.createdAt).toLocaleDateString('pt-MZ')}</p>
        </div>
      </div>

      <div className="flex gap-2 pt-4">
        <Button variant={client.active ? "destructive" : "default"}>
          {client.active ? (
            <>
              <UserX className="h-4 w-4 mr-2" />
              Desativar Cliente
            </>
          ) : (
            <>
              <UserCheck className="h-4 w-4 mr-2" />
              Ativar Cliente
            </>
          )}
        </Button>
      </div>
    </>
  );
}