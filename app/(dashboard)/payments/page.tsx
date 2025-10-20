"use client"

import PaymentSearchAndFilter from "@/components/dashboard/payments/SearchandFilter";
import PaymentTable from "@/components/dashboard/payments/Tables";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"



export default function PaymentsPage() {

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h2 className="text-2xl font-bold tracking-tight">Pagamentos</h2>
        <p className="text-muted-foreground">
          Gestão e acompanhamento de pedidos de crédito
        </p>
      </div>
      {/* Conteúdo da página de pagamentos */}
      <div space-y-6>
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader>
              <CardTitle className="pb-2">Total</CardTitle>
            </CardHeader>
            <CardContent>
              <div>6</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="pb-2">Pendentes</CardTitle>
            </CardHeader>
            <CardContent>
              <div>7</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="pb-2">Aprovados</CardTitle>
            </CardHeader>
            <CardContent>
              <div>5</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="pb-2">Recusados</CardTitle>
            </CardHeader>
            <CardContent>
              <div>2</div>
            </CardContent>
          </Card>
        </div>
        <div className="mt-10">
          <Card>
            <CardHeader>
              <CardTitle className="pb-2">Lista de Pagamentos</CardTitle>
            </CardHeader>
            <CardContent>
              <div>
                <div>
                  <PaymentSearchAndFilter />
                </div>
                <div>
                  <PaymentTable/>
                </div>
              </div>
            </CardContent>

          </Card>
        </div>
      </div>
    </div>
  );
}
