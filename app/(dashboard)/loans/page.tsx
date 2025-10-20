import LoansSearchAndFilter from "@/components/dashboard/loans/SearchandFilter";
import LoansTable from "@/components/dashboard/loans/Tables";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function LoansPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Empréstimos</h2>
        <p className="text-muted-foreground">
          Gerencie os empréstimos do sistema
        </p>
      </div>
      {/* Conteúdo da página de empréstimos */}
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
              <CardTitle className="pb-2">Lista de Emprestimos</CardTitle>
            </CardHeader>
            <CardContent>
              <div>
                <div>
                  <LoansSearchAndFilter />
                </div>
                <div>
                  <LoansTable/>
                </div>
              </div>
            </CardContent>

          </Card>
        </div>
      </div>
    </div>
  );
}
