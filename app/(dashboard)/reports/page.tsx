// app/(dashboard)/relatorios/page.tsx
"use client";

import { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  FileText,
  Download,
  Loader2,
  Building,
  Users,
  CreditCard,
  TrendingUp,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { currencyFormat } from "@/lib/currency";

// Mock data for microcredit branches
const branches = [
  { id: "centro", label: "Sucursal Centro" },
  { id: "zona-norte", label: "Sucursal Zona Norte" },
  { id: "zona-sul", label: "Sucursal Zona Sul" },
  { id: "rural", label: "Sucursal Rural" },
  { id: "comercial", label: "Sucursal Comercial" },
];

// Mock data for loan types
const loanTypes = [
  { id: "personal", label: "Pessoal" },
  { id: "business", label: "Negócio" },
  { id: "emergency", label: "Emergência" },
  { id: "agricultural", label: "Agrícola" },
];

export default function ReportsPage() {
  const [loading, setLoading] = useState(false);
  const [reportPeriod, setReportPeriod] = useState("last-month");
  const [reportType, setReportType] = useState("portfolio-analysis");
  const [selectedBranch, setSelectedBranch] = useState("all");
  const [selectedLoanType, setSelectedLoanType] = useState("all");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Mock data for portfolio by branch
  const branchPortfolioData = [
    { branch: "Centro", portfolio: 345000, clients: 45, activeLoans: 38 },
    { branch: "Zona Norte", portfolio: 289000, clients: 38, activeLoans: 32 },
    { branch: "Zona Sul", portfolio: 267000, clients: 32, activeLoans: 28 },
    { branch: "Rural", portfolio: 198000, clients: 28, activeLoans: 24 },
    { branch: "Comercial", portfolio: 312000, clients: 25, activeLoans: 23 },
  ];

  // Mock data for loan type distribution
  const loanTypeData = [
    { type: "Pessoal", value: 35, amount: 125000, color: "#8b5cf6" },
    { type: "Negócio", value: 28, amount: 210000, color: "#06b6d4" },
    { type: "Emergência", value: 15, amount: 45000, color: "#f97316" },
    { type: "Agrícola", value: 22, amount: 180000, color: "#22c55e" },
  ];

  // Mock data for monthly performance
  const monthlyPerformance = [
    { month: "Jan", disbursement: 145000, recovery: 128000, newLoans: 18 },
    { month: "Fev", disbursement: 189000, recovery: 165000, newLoans: 22 },
    { month: "Mar", disbursement: 156000, recovery: 142000, newLoans: 19 },
    { month: "Abr", disbursement: 234000, recovery: 198000, newLoans: 26 },
    { month: "Mai", disbursement: 198000, recovery: 187000, newLoans: 23 },
    { month: "Jun", disbursement: 267000, recovery: 234000, newLoans: 29 },
  ];

  // Mock data for loan status
  const loanStatusData = [
    { status: "Ativos", value: 45, color: "#10b981" },
    { status: "Quitados", value: 28, color: "#3b82f6" },
    { status: "Atrasados", value: 12, color: "#f59e0b" },
    { status: "Inadimplentes", value: 7, color: "#ef4444" },
  ];

  // Summary statistics
  const stats = useMemo(
    () => ({
      totalPortfolio: 1245680,
      activeLoans: 145,
      totalClients: 128,
      recoveryRate: 94.7,
      overdueAmount: 156000,
      defaultRate: 5.3,
    }),
    []
  );

  // Filter data by date range
  const getDateRange = () => {
    const now = new Date();
    let start = new Date();

    switch (reportPeriod) {
      case "last-week":
        start.setDate(now.getDate() - 7);
        break;
      case "last-month":
        start.setMonth(now.getMonth() - 1);
        break;
      case "last-quarter":
        start.setMonth(now.getMonth() - 3);
        break;
      case "last-year":
        start.setFullYear(now.getFullYear() - 1);
        break;
      case "custom":
        if (startDate && endDate) {
          return {
            start: new Date(startDate),
            end: new Date(endDate),
          };
        }
        break;
    }

    return { start, end: now };
  };

  const exportToPDF = () => {
    console.log("Exporting microcredit report to PDF...");
    alert("Relatório de microcrédito exportado para PDF!");
  };

  const exportToExcel = () => {
    console.log("Exporting microcredit report to Excel...");
    alert("Relatório de microcrédito exportado para Excel!");
  };

  // Simulate loading
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, [reportPeriod, reportType, selectedBranch, selectedLoanType]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            Relatórios de Microcrédito
          </h2>
          <p className="text-muted-foreground">
            Análise e relatórios do desempenho da carteira de microcrédito
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Configuration Panel */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-lg">
              Configurações do Relatório
            </CardTitle>
            <CardDescription>
              Selecione os parâmetros para gerar o relatório
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="report-type">Tipo de Relatório</Label>
              <Select value={reportType} onValueChange={setReportType}>
                <SelectTrigger
                  id="report-type"
                  className="bg-background border-muted-foreground/20"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="portfolio-analysis">
                    Análise da Carteira
                  </SelectItem>
                  <SelectItem value="branch-performance">
                    Desempenho por Sucursal
                  </SelectItem>
                  <SelectItem value="loan-type-analysis">
                    Análise por Tipo de Empréstimo
                  </SelectItem>
                  <SelectItem value="recovery-report">
                    Relatório de Recuperação
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="report-period">Período</Label>
              <Select value={reportPeriod} onValueChange={setReportPeriod}>
                <SelectTrigger
                  id="report-period"
                  className="bg-background border-muted-foreground/20"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="last-week">Última Semana</SelectItem>
                  <SelectItem value="last-month">Último Mês</SelectItem>
                  <SelectItem value="last-quarter">Último Trimestre</SelectItem>
                  <SelectItem value="last-year">Último Ano</SelectItem>
                  <SelectItem value="custom">Período Personalizado</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {reportPeriod === "custom" && (
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label htmlFor="start-date">Data Início</Label>
                  <Input
                    id="start-date"
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="end-date">Data Fim</Label>
                  <Input
                    id="end-date"
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                </div>
              </div>
            )}

            <div>
              <Label htmlFor="branch-filter">Sucursal</Label>
              <Select value={selectedBranch} onValueChange={setSelectedBranch}>
                <SelectTrigger
                  id="branch-filter"
                  className="bg-background border-muted-foreground/20"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas as Sucursais</SelectItem>
                  {branches.map((branch) => (
                    <SelectItem key={branch.id} value={branch.id}>
                      {branch.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="loan-type-filter">Tipo de Empréstimo</Label>
              <Select
                value={selectedLoanType}
                onValueChange={setSelectedLoanType}
              >
                <SelectTrigger
                  id="loan-type-filter"
                  className="bg-background border-muted-foreground/20"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os Tipos</SelectItem>
                  {loanTypes.map((type) => (
                    <SelectItem key={type.id} value={type.id}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-2 pt-4">
              <Button
                onClick={exportToPDF}
                className="flex-1"
                disabled={loading}
              >
                {loading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <FileText className="mr-2 h-4 w-4" />
                )}
                PDF
              </Button>
              <Button
                onClick={exportToExcel}
                variant="outline"
                className="flex-1 bg-transparent"
                disabled={loading}
              >
                {loading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Download className="mr-2 h-4 w-4" />
                )}
                Excel
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Report Preview */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg">
              Pré-visualização do Relatório
            </CardTitle>
            <CardDescription>
              {selectedBranch === "all"
                ? "Análise geral de todas as sucursais"
                : `Análise específica da ${
                    branches.find((b) => b.id === selectedBranch)?.label
                  }`}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex items-center justify-center h-64">
                <Loader2 className="h-8 w-8 animate-spin" />
                <span className="ml-2">Carregando dados...</span>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Stats Cards */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 rounded-lg bg-blue-50 border">
                    <div className="flex items-center justify-center mb-2">
                      <CreditCard className="h-6 w-6 text-blue-600" />
                    </div>
                    <p className="text-xl font-bold text-blue-600">
                      {currencyFormat(stats.totalPortfolio)}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Carteira Total
                    </p>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-green-50 border">
                    <div className="flex items-center justify-center mb-2">
                      <TrendingUp className="h-6 w-6 text-green-600" />
                    </div>
                    <p className="text-xl font-bold text-green-600">
                      {stats.activeLoans}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Empréstimos Ativos
                    </p>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-purple-50 border">
                    <div className="flex items-center justify-center mb-2">
                      <Users className="h-6 w-6 text-purple-600" />
                    </div>
                    <p className="text-xl font-bold text-purple-600">
                      {stats.totalClients}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Total de Clientes
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 rounded-lg bg-emerald-50 border">
                    <p className="text-xl font-bold text-emerald-600">
                      {stats.recoveryRate}%
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Taxa de Recuperação
                    </p>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-amber-50 border">
                    <p className="text-xl font-bold text-amber-600">
                      {currencyFormat(stats.overdueAmount)}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Valor em Atraso
                    </p>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-red-50 border">
                    <p className="text-xl font-bold text-red-600">
                      {stats.defaultRate}%
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Taxa de Inadimplência
                    </p>
                  </div>
                </div>

                {/* Charts */}
                <div className="space-y-6">
                  {reportType === "portfolio-analysis" && (
                    <div className="h-64">
                      <h3 className="text-lg font-semibold mb-4">
                        Carteira por Sucursal
                      </h3>
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={branchPortfolioData}
                          margin={{ bottom: 20 }}
                        >
                          <CartesianGrid
                            strokeDasharray="3 3"
                            stroke="#e0e0e0"
                            opacity={0.3}
                          />
                          <XAxis
                            dataKey="branch"
                            tick={{ fontSize: 12, fill: "#6b7280" }}
                          />
                          <YAxis
                            tick={{ fontSize: 12, fill: "#6b7280" }}
                            tickFormatter={(value) => `R$ ${value / 1000}k`}
                          />
                          <Tooltip
                            formatter={(value: number, name: string) => {
                              if (name === "portfolio")
                                return [
                                  `R$ ${value.toLocaleString()}`,
                                  "Carteira",
                                ];
                              if (name === "clients")
                                return [`${value} clientes`, "Clientes"];
                              return [
                                `${value} empréstimos`,
                                "Empréstimos Ativos",
                              ];
                            }}
                            contentStyle={{
                              backgroundColor: "#ffffff",
                              border: "1px solid #e5e7eb",
                              borderRadius: "8px",
                            }}
                          />
                          <Bar
                            dataKey="portfolio"
                            fill="#3b82f6"
                            radius={[4, 4, 0, 0]}
                            name="portfolio"
                          />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  )}

                  {reportType === "loan-type-analysis" && (
                    <div className="grid grid-cols-2 gap-6">
                      <div className="h-64">
                        <h3 className="text-lg font-semibold mb-4">
                          Distribuição por Tipo
                        </h3>
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={loanTypeData}
                              cx="50%"
                              cy="50%"
                              labelLine={false}
                              label={({ type, value }) => `${type}: ${value}%`}
                              outerRadius={80}
                              fill="#8884d8"
                              dataKey="value"
                            >
                              {loanTypeData.map((entry, index) => (
                                <Cell
                                  key={`cell-${index}`}
                                  fill={entry.color}
                                />
                              ))}
                            </Pie>
                            <Tooltip
                              formatter={(
                                value: number,
                                name: string,
                                props: any
                              ) => [
                                `${value}% (R$ ${props.payload.amount.toLocaleString()})`,
                                props.payload.type,
                              ]}
                            />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                      <div className="h-64">
                        <h3 className="text-lg font-semibold mb-4">
                          Status dos Empréstimos
                        </h3>
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={loanStatusData}
                              cx="50%"
                              cy="50%"
                              labelLine={false}
                              label={({ status, value }) =>
                                `${status}: ${value}%`
                              }
                              outerRadius={80}
                              fill="#8884d8"
                              dataKey="value"
                            >
                              {loanStatusData.map((entry, index) => (
                                <Cell
                                  key={`cell-${index}`}
                                  fill={entry.color}
                                />
                              ))}
                            </Pie>
                            <Tooltip
                              formatter={(value: number) => [
                                `${value}%`,
                                "Percentual",
                              ]}
                            />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  )}

                  {reportType === "branch-performance" && (
                    <div className="h-64">
                      <h3 className="text-lg font-semibold mb-4">
                        Desempenho Mensal
                      </h3>
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={monthlyPerformance}>
                          <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                          <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                          <YAxis
                            tick={{ fontSize: 12 }}
                            tickFormatter={(value) => `R$ ${value / 1000}k`}
                          />
                          <Tooltip
                            formatter={(value: number, name: string) => {
                              if (name === "disbursement")
                                return [
                                  `R$ ${value.toLocaleString()}`,
                                  "Desembolso",
                                ];
                              if (name === "recovery")
                                return [
                                  `R$ ${value.toLocaleString()}`,
                                  "Recuperação",
                                ];
                              return [
                                `${value} empréstimos`,
                                "Novos Empréstimos",
                              ];
                            }}
                          />
                          <Line
                            type="monotone"
                            dataKey="disbursement"
                            stroke="#3b82f6"
                            strokeWidth={2}
                            name="disbursement"
                          />
                          <Line
                            type="monotone"
                            dataKey="recovery"
                            stroke="#10b981"
                            strokeWidth={2}
                            name="recovery"
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  )}

                  {reportType === "recovery-report" && (
                    <div className="h-64">
                      <h3 className="text-lg font-semibold mb-4">
                        Comparativo Desembolso vs Recuperação
                      </h3>
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={monthlyPerformance}
                          margin={{ bottom: 20 }}
                        >
                          <CartesianGrid
                            strokeDasharray="3 3"
                            stroke="#e0e0e0"
                            opacity={0.3}
                          />
                          <XAxis
                            dataKey="month"
                            tick={{ fontSize: 12, fill: "#6b7280" }}
                          />
                          <YAxis
                            tick={{ fontSize: 12, fill: "#6b7280" }}
                            tickFormatter={(value) => `R$ ${value / 1000}k`}
                          />
                          <Tooltip
                            formatter={(value: number, name: string) => [
                              `R$ ${value.toLocaleString()}`,
                              name === "disbursement"
                                ? "Desembolso"
                                : "Recuperação",
                            ]}
                          />
                          <Bar
                            dataKey="disbursement"
                            fill="#3b82f6"
                            radius={[4, 4, 0, 0]}
                            name="disbursement"
                          />
                          <Bar
                            dataKey="recovery"
                            fill="#10b981"
                            radius={[4, 4, 0, 0]}
                            name="recovery"
                          />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  )}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
