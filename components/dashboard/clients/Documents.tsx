// components/clients/DocumentsTab.tsx
'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Document } from '@/lib/dummyData';

interface DocumentsTabProps {
  documents: Document[];
}

export default function DocumentsTab({ documents }: DocumentsTabProps) {
  return documents.length === 0 ? (
    <p className="text-muted-foreground text-center py-8">Nenhum documento enviado</p>
  ) : (
    <div className="space-y-3">
      {documents.map((doc) => (
        <div key={doc.id} className="border rounded-lg p-4 flex justify-between items-center">
          <div>
            <p className="font-medium">
              {doc.type === 'id' ? 'Documento de Identidade' :
               doc.type === 'proof_address' ? 'Comprovante de Endereço' :
               'Comprovante de Renda'}
            </p>
            <p className="text-sm text-muted-foreground">
              Enviado em {new Date(doc.uploadedAt).toLocaleDateString('pt-MZ')}
            </p>
          </div>
          <div className="flex gap-2 items-center">
            {doc.status === 'approved' && <Badge variant="default">Aprovado</Badge>}
            {doc.status === 'pending' && <Badge variant="secondary">Pendente</Badge>}
            {doc.status === 'rejected' && <Badge variant="destructive">Rejeitado</Badge>}
            <Button size="sm" variant="outline">Ver</Button>
          </div>
        </div>
      ))}
    </div>
  );
}