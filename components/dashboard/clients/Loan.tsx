// components/clients/LoansTab.tsx
'use client';

import { Badge } from '@/components/ui/badge';
import { Loan } from '@/lib/dummyData';

interface LoansTabProps {
  loans: Loan[];
}

export default function LoansTab({ loans }: LoansTabProps) {
  return loans.length === 0 ? (
    <p className="text-muted-foreground text-center py-8">Nenhum empréstimo registrado</p>
  ) : (
    <div className="space-y-3">
      {loans.map((loan) => (
        <div key={loan.id} className="border rounded-lg p-4">
          <div className="flex justify-between items-start mb-2">
            <div>
              <p className="font-medium">
                {loan.amount.toLocaleString('pt-MZ', { style: 'currency', currency: 'MZN' })}
              </p>
              <p className="text-sm text-muted-foreground">
                {loan.term} meses • Taxa: {loan.interestRate}%
              </p>
            </div>
            {loan.status === 'approved' && <Badge>Aprovado</Badge>}
            {loan.status === 'pending' && <Badge variant="secondary">Pendente</Badge>}
            {loan.status === 'rejected' && <Badge variant="destructive">Rejeitado</Badge>}
            {loan.status === 'paid' && <Badge variant="outline">Pago</Badge>}
            {loan.status === 'overdue' && <Badge variant="destructive">Atrasado</Badge>}
          </div>
          <p className="text-sm text-muted-foreground">
            Solicitado em {new Date(loan.requestedAt).toLocaleDateString('pt-MZ')}
          </p>
        </div>
      ))}
    </div>
  );
}