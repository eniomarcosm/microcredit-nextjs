// app/clients/page.tsx
'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { users, getLoansByUserId, getDocumentsByUserId, User } from '@/lib/dummyData';
import ClientSearchAndFilter from '@/components/dashboard/clients/SearchandFilter';
import ClientTable from '@/components/dashboard/clients/Tables';
import PersonalInfoTab from '@/components/dashboard/clients/PersonalInfo';
import DocumentsTab from '@/components/dashboard/clients/Documents';
import LoansTab from '@/components/dashboard/clients/Loan';

export default function ClientsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedClient, setSelectedClient] = useState<User | null>(null);

  const filteredClients = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || user.documentStatus === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const clientLoans = selectedClient ? getLoansByUserId(selectedClient.id) : [];
  const clientDocuments = selectedClient ? getDocumentsByUserId(selectedClient.id) : [];

  return (
    <div className="space-y-6">
      <div>
        <h1>Clientes</h1>
        <p className="text-muted-foreground">Gestão e visualização de clientes cadastrados</p>
      </div>

      <div>
      <Card>
        <CardHeader>
          <CardTitle>Lista de Clientes</CardTitle>
        </CardHeader>
        <CardContent>
          <ClientSearchAndFilter
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
          />
          <ClientTable
            filteredClients={filteredClients}
            setSelectedClient={setSelectedClient}
          />
        </CardContent>
      </Card>

      <Dialog  open={!!selectedClient} onOpenChange={() => setSelectedClient(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Detalhes do Cliente</DialogTitle>
            <DialogDescription>Informações completas e histórico do cliente</DialogDescription>
          </DialogHeader>

          {selectedClient && (
            <Tabs defaultValue="personal" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="personal">Dados Pessoais</TabsTrigger>
                <TabsTrigger value="documents">Documentos</TabsTrigger>
                <TabsTrigger value="loans">Empréstimos</TabsTrigger>
              </TabsList>

              <TabsContent value="personal" className="space-y-4">
                <PersonalInfoTab client={selectedClient} />
              </TabsContent>

              <TabsContent value="documents" className="space-y-4">
                <DocumentsTab documents={clientDocuments} />
              </TabsContent>

              <TabsContent value="loans" className="space-y-4">
                <LoansTab loans={clientLoans} />
              </TabsContent>
            </Tabs>
          )}
        </DialogContent>
      </Dialog>
      </div>
    </div>
  );
}