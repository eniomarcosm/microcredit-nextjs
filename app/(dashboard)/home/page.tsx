"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import {
  Activity,
  ArrowDownRight,
  ArrowUpRight,
  CreditCard,
  DollarSign,
  EyeIcon,
  PiggyBank,
  RefreshCwIcon,
  TrendingUp,
} from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

// Colors for charts
const COLORS = {
  active: "#10b981", // green-500
  paid: "#3b82f6", // blue-500
  overdue: "#ef4444", // red-500
  pending: "#f59e0b", // amber-500
  defaulted: "#6b7280", // gray-500
};

const LOAN_TYPES = {
  personal: "#8b5cf6", // purple-500
  business: "#06b6d4", // cyan-500
  emergency: "#f97316", // orange-500
  agricultural: "#22c55e", // green-500
};

// Skeleton for Stats Cards
const StatsCardSkeleton = () => (
  <Card className="animate-pulse">
    <CardHeader className="pb-2">
      <div className="flex items-center justify-between">
        <div className="h-4 bg-gray-200 rounded w-24"></div>
        <div className="h-4 w-4 bg-gray-200 rounded-full"></div>
      </div>
    </CardHeader>
    <CardContent>
      <div className="h-6 bg-gray-200 rounded w-32 mb-2"></div>
      <div className="h-3 bg-gray-200 rounded w-40"></div>
    </CardContent>
  </Card>
);

// Skeleton for Charts
const ChartSkeleton = () => (
  <div className="w-full h-80 flex items-center justify-center p-4">
    <div className="space-y-4 w-full">
      <div className="h-4 bg-gray-200 rounded w-1/3 mx-auto"></div>{" "}
      {/* Title */}
      <div className="flex items-end justify-between h-64 space-x-1">
        {" "}
        {/* Chart area */}
        {[...Array(8)].map((_, i) => (
          <div key={i} className="flex flex-col items-center flex-1">
            <div
              className="w-full bg-gray-200 rounded-t"
              style={{ height: `${Math.floor(Math.random() * 40) + 20}%` }} // Random height for bars
            ></div>
            <div className="h-3 bg-gray-200 rounded w-4 mt-2"></div>{" "}
            {/* X-axis label */}
          </div>
        ))}
      </div>
      <div className="flex justify-center space-x-4 mt-4">
        {" "}
        {/* Legend */}
        <div className="h-3 bg-gray-200 rounded w-16"></div>
        <div className="h-3 bg-gray-200 rounded w-16"></div>
        <div className="h-3 bg-gray-200 rounded w-16"></div>
      </div>
    </div>
  </div>
);

// Skeleton for Pie Chart
const PieChartSkeleton = () => (
  <div className="w-full h-80 flex items-center justify-center p-4">
    <div className="space-y-4 w-full flex flex-col items-center">
      <div className="h-4 bg-gray-200 rounded w-1/3 mx-auto"></div>{" "}
      {/* Title */}
      <div className="relative w-48 h-48 rounded-full bg-gray-200 flex items-center justify-center">
        {" "}
        {/* Pie */}
        {/* Simulate pie slices */}
        <div className="absolute w-full h-full rounded-full overflow-hidden">
          <div className="absolute top-0 left-1/2 w-1/2 h-full bg-gray-300 origin-left transform rotate-45"></div>
          <div className="absolute top-0 left-1/2 w-1/2 h-full bg-gray-400 origin-right transform -rotate-45"></div>
        </div>
      </div>
      <div className="flex justify-center space-x-4 mt-4">
        {" "}
        {/* Legend */}
        <div className="h-3 bg-gray-200 rounded w-16"></div>
        <div className="h-3 bg-gray-200 rounded w-16"></div>
        <div className="h-3 bg-gray-200 rounded w-16"></div>
      </div>
    </div>
  </div>
);

// Skeleton for Top Branches List
const TopBranchesSkeleton = () => (
  <div className="space-y-3 p-4">
    {[...Array(5)].map((_, index) => (
      <div
        key={index}
        className="flex items-center justify-between p-3 border rounded-lg animate-pulse"
      >
        <div className="flex items-center space-x-3">
          <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
          <div className="space-y-1">
            <div className="h-4 bg-gray-200 rounded w-32"></div>
            <div className="h-3 bg-gray-200 rounded w-20"></div>
          </div>
        </div>
        <div>
          <div className="h-4 bg-gray-200 rounded w-16"></div>
        </div>
      </div>
    ))}
  </div>
);

// Skeleton for Recent Loans Table
const RecentLoansSkeleton = () => (
  <div className="w-full">
    <div className="border rounded-lg overflow-hidden">
      {/* Header Row Skeleton */}
      <div className="flex border-b bg-muted/50 animate-pulse">
        {[
          "ID Empréstimo",
          "Cliente",
          "Tipo",
          "Valor",
          "Status",
          "Sucursal",
          "Agente",
          "Data Desembolso",
        ].map((header, index) => (
          <div
            key={index}
            className="flex-1 p-3"
            style={{ minWidth: "100px" }} // Approximate column width
          >
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          </div>
        ))}
      </div>
      {/* Data Rows Skeleton */}
      {[...Array(5)].map((_, rowIndex) => (
        <div key={rowIndex} className="flex border-b animate-pulse">
          {Array.from({ length: 8 }).map((_, colIndex) => (
            <div
              key={colIndex}
              className="flex-1 p-3"
              style={{ minWidth: "100px" }}
            >
              <div className="h-4 bg-gray-100 rounded w-full"></div>
            </div>
          ))}
        </div>
      ))}
    </div>
  </div>
);

export default function DashboardPage() {
  const [loading, setLoading] = useState(false);
  const { status } = useSession();
  const router = useRouter();

  // Mock data for microcredit system
  const loanStatusData = [
    { status: "active", value: 45, label: "Ativos" },
    { status: "paid", value: 28, label: "Quitados" },
    { status: "overdue", value: 12, label: "Atrasados" },
    { status: "pending", value: 8, label: "Pendentes" },
    { status: "defaulted", value: 7, label: "Inadimplentes" },
  ];

  const loanTypeData = [
    { type: "Pessoal", count: 35, value: 125000 },
    { type: "Negócio", count: 28, value: 210000 },
    { type: "Emergência", count: 15, value: 45000 },
    { type: "Agrícola", count: 22, value: 180000 },
  ];

  const monthlyDisbursement = [
    { month: "Jan", amount: 145000, loans: 18 },
    { month: "Fev", amount: 189000, loans: 22 },
    { month: "Mar", amount: 156000, loans: 19 },
    { month: "Abr", amount: 234000, loans: 26 },
    { month: "Mai", amount: 198000, loans: 23 },
    { month: "Jun", amount: 267000, loans: 29 },
  ];

  const topBranches = [
    { branch: "Sucursal Centro", loans: 45, amount: 345000 },
    { branch: "Sucursal Penduza", loans: 38, amount: 289000 },
    { branch: "Sucursal Txona", loans: 32, amount: 267000 },
    { branch: "Sucursal Moz Money", loans: 28, amount: 198000 },
    { branch: "Sucursal Comercial", loans: 25, amount: 312000 },
  ];

  const recentLoans = [
    {
      id: "MC-001",
      clientName: "Maria Santos",
      loanType: "Pessoal",
      amount: 15000,
      status: "active",
      branch: "Centro",
      disbursementDate: "2024-01-15",
      loanOfficer: "João Silva",
    },
    {
      id: "MC-002",
      clientName: "Carlos Oliveira",
      loanType: "Negócio",
      amount: 45000,
      status: "active",
      branch: "Penduza",
      disbursementDate: "2024-01-14",
      loanOfficer: "Ana Costa",
    },
    {
      id: "MC-003",
      clientName: "Pedro Mendes",
      loanType: "Agrícola",
      amount: 28000,
      status: "overdue",
      branch: "Moz Money",
      disbursementDate: "2024-01-10",
      loanOfficer: "José Alves",
    },
    {
      id: "MC-004",
      clientName: "Ana Pereira",
      loanType: "Emergência",
      amount: 8000,
      status: "paid",
      branch: "Txona",
      disbursementDate: "2024-01-08",
      loanOfficer: "Maria Lima",
    },
  ];

  const renderLabel = (entry: any) => {
    return `${entry.value}%`;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            Dashboard de Microcrédito
          </h2>
          <p className="text-muted-foreground">
            Visão geral das operações e desempenho do sistema
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {loading ? (
          <>
            <StatsCardSkeleton />
            <StatsCardSkeleton />
            <StatsCardSkeleton />
            <StatsCardSkeleton />
          </>
        ) : (
          <>
            <Card className="transition-all duration-200 hover:shadow-lg hover:scale-[1.02]">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Carteira Total
                </CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">MZN 1.245.680</div>
                <p className="text-xs text-muted-foreground flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
                  +15.3% em relação ao mês anterior
                </p>
              </CardContent>
            </Card>

            <Card className="transition-all duration-200 hover:shadow-lg hover:scale-[1.02]">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Empréstimos Ativos
                </CardTitle>
                <CreditCard className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl text-green-500 font-bold">145</div>
                <p className="text-xs text-muted-foreground flex items-center mt-1">
                  <ArrowUpRight className="h-3 w-3 mr-1 text-green-500" />
                  45 empréstimos este mês
                </p>
              </CardContent>
            </Card>

            <Card className="transition-all duration-200 hover:shadow-lg hover:scale-[1.02]">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Empréstimos Atrasados
                </CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl text-red-500 font-bold">12</div>
                <p className="text-xs text-muted-foreground flex items-center mt-1">
                  <ArrowDownRight className="h-3 w-3 mr-1 text-red-500" />
                  8.3% da carteira
                </p>
              </CardContent>
            </Card>

            <Card className="transition-all duration-200 hover:shadow-lg hover:scale-[1.02]">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Taxa de Recuperação
                </CardTitle>
                <PiggyBank className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">94.7%</div>
                <p className="text-xs text-muted-foreground flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
                  +2.1% este trimestre
                </p>
              </CardContent>
            </Card>
          </>
        )}
      </div>

      {/* Charts Section */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Loan Types Distribution Chart */}
        <Card className="transition-all duration-200 hover:shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg">Empréstimos por Tipo</CardTitle>
            <CardDescription>
              Distribuição de empréstimos por categoria
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <ChartSkeleton />
            ) : (
              <ResponsiveContainer width="100%" height={320}>
                <BarChart
                  data={loanTypeData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#e0e0e0"
                    opacity={0.3}
                  />
                  <XAxis
                    dataKey="type"
                    tick={{ fontSize: 10, fill: "#6b7280" }}
                    angle={-45}
                    textAnchor="end"
                    height={60}
                    interval={0}
                  />
                  <YAxis
                    tick={{ fontSize: 12, fill: "#6b7280" }}
                    allowDecimals={false}
                  />
                  <Tooltip
                    formatter={(value: number, name: string) => {
                      if (name === "count")
                        return [`${value} empréstimos`, "Quantidade"];
                      return [`MZN ${value.toLocaleString()}`, "Valor Total"];
                    }}
                    contentStyle={{
                      backgroundColor: "#ffffff",
                      border: "1px solid #e5e7eb",
                      borderRadius: "8px",
                      boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                    }}
                  />
                  <Bar
                    dataKey="count"
                    fill="#3b82f6"
                    radius={[4, 4, 0, 0]}
                    name="count"
                  />
                </BarChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>

        {/* Loan Status Distribution Pie Chart */}
        <Card className="transition-all duration-200 hover:shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg">Status dos Empréstimos</CardTitle>
            <CardDescription>
              Distribuição por status da carteira
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <PieChartSkeleton />
            ) : (
              <ResponsiveContainer width="100%" height={320}>
                <PieChart>
                  <Pie
                    data={loanStatusData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={renderLabel}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {loanStatusData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[entry.status as keyof typeof COLORS]}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value: number, name: string, props: any) => [
                      `${value}%`,
                      props.payload.label,
                    ]}
                    contentStyle={{
                      backgroundColor: "#ffffff",
                      border: "1px solid #e5e7eb",
                      borderRadius: "8px",
                      boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                    }}
                  />
                  <Legend
                    verticalAlign="bottom"
                    height={36}
                    formatter={(value, entry) => (
                      <span style={{ color: entry.color, fontSize: "14px" }}>
                        {
                          loanStatusData.find((item) => item.status === value)
                            ?.label
                        }
                      </span>
                    )}
                  />
                </PieChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Additional Charts Row */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Monthly Disbursement Line Chart */}
        <Card className="transition-all duration-200 hover:shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg">Desembolso Mensal</CardTitle>
            <CardDescription>
              Evolução dos desembolsos nos últimos 6 meses
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <ChartSkeleton />
            ) : (
              <ResponsiveContainer width="100%" height={320}>
                <LineChart
                  data={monthlyDisbursement}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
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
                    tickFormatter={(value) => `MZN ${value / 1000}k`}
                  />
                  <Tooltip
                    formatter={(value: number, name: string) => {
                      if (name === "amount")
                        return [`MZN ${value.toLocaleString()}`, "Valor"];
                      return [`${value} empréstimos`, "Quantidade"];
                    }}
                    contentStyle={{
                      backgroundColor: "#ffffff",
                      border: "1px solid #e5e7eb",
                      borderRadius: "8px",
                      boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="amount"
                    stroke="#3b82f6"
                    strokeWidth={3}
                    dot={{ fill: "#3b82f6", strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6 }}
                    name="amount"
                  />
                </LineChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>

        {/* Top Branches List */}
        <Card className="transition-all duration-200 hover:shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg">Top Sucursais</CardTitle>
            <CardDescription>
              Sucursais com maior volume de empréstimos
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <TopBranchesSkeleton />
            ) : (
              <div className="space-y-3">
                {topBranches.map((branch, index) => (
                  <div
                    key={branch.branch}
                    className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center justify-center w-6 h-6 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                        {index + 1}
                      </div>
                      <div>
                        <span className="font-medium text-sm block">
                          {branch.branch}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {branch.loans} empréstimos
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge
                        variant="secondary"
                        className="bg-green-100 text-green-700"
                      >
                        MZN {(branch.amount / 1000).toFixed(0)}k
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Recent Loans Table */}
      {status === "authenticated" && (
        <div className="w-full">
          <Card className="transition-all duration-200 hover:shadow-lg">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-center mb-1">
                <div className="flex items-center space-x-2">
                  <EyeIcon className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                  <CardTitle className="text-base sm:text-lg leading-tight">
                    Empréstimos Recentes
                  </CardTitle>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    onClick={() => setLoading(!loading)}
                    variant="ghost"
                    size="sm"
                    disabled={loading}
                  >
                    <RefreshCwIcon className="h-5 w-5 inline-block mr-1" />
                    Atualizar
                  </Button>
                </div>
              </div>

              <CardDescription className="text-sm">
                Últimos empréstimos desembolsados no sistema
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="w-full overflow-x-auto">
                {loading ? (
                  <RecentLoansSkeleton />
                ) : (
                  <DataTable
                    columns={columns}
                    data={recentLoans}
                    rowClickable={true}
                    pageSize={10}
                    onRowClick={(row) => {
                      router.push(`/emprestimos/${row.id}`);
                    }}
                  />
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}

// Updated columns for microcredit system
export const columns = [
  {
    accessorKey: "id",
    header: "ID Empréstimo",
    cell: (info: any) => info.getValue(),
  },
  {
    accessorKey: "clientName",
    header: "Cliente",
    cell: (info: any) => info.getValue(),
  },
  {
    accessorKey: "loanType",
    header: "Tipo",
    cell: (info: any) => {
      const type = info.getValue();
      const colorMap: any = {
        Pessoal: "bg-purple-100 text-purple-700",
        Negócio: "bg-cyan-100 text-cyan-700",
        Emergência: "bg-orange-100 text-orange-700",
        Agrícola: "bg-green-100 text-green-700",
      };
      return (
        <Badge variant="secondary" className={colorMap[type]}>
          {type}
        </Badge>
      );
    },
  },
  {
    accessorKey: "amount",
    header: "Valor",
    cell: (info: any) => `MZN ${info.getValue().toLocaleString()}`,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: (info: any) => {
      const status = info.getValue();
      const variantMap: any = {
        active: "success",
        paid: "default",
        overdue: "destructive",
        pending: "default",
        defaulted: "destructive",
      };
      const labelMap: any = {
        active: "Ativo",
        paid: "Quitado",
        overdue: "Atrasado",
        pending: "Pendente",
        defaulted: "Inadimplente",
      };
      return <Badge variant={variantMap[status]}>{labelMap[status]}</Badge>;
    },
  },
  {
    accessorKey: "branch",
    header: "Sucursal",
    cell: (info: any) => info.getValue(),
  },
  {
    accessorKey: "loanOfficer",
    header: "Agente",
    cell: (info: any) => info.getValue(),
  },
  {
    accessorKey: "disbursementDate",
    header: "Data Desembolso",
    cell: (info: any) => (
      <time>
        {new Date(info.getValue()).toLocaleString("pt-BR", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        })}
      </time>
    ),
  },
];
