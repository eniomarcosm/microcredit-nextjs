// app/(dashboard)/configuracoes/page.tsx
"use client";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  UserPlus,
  Edit,
  Trash2,
  Settings,
  Activity,
  Server,
  Wifi,
  Shield,
  CheckCircle,
  AlertTriangle,
  XCircle,
  EyeOff,
  ChevronDown,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CustomDropdown } from "@/components/CustomDropdown";

const users = [
  {
    id: 1,
    name: "Admin Sistema",
    email: "admin@gmail.com",
    role: "Admin",
    status: "Ativo",
    lastLogin: "Hoje, 14:30",
  },
  {
    id: 2,
    name: "João Operador",
    email: "joao@gmail.com",
    role: "Operador",
    status: "Ativo",
    lastLogin: "Ontem, 16:45",
  },
  {
    id: 3,
    name: "Maria Fiscal",
    email: "maria@gmail.com",
    role: "Fiscal",
    status: "Ativo",
    lastLogin: "2 dias atrás",
  },
  {
    id: 4,
    name: "Carlos Viewer",
    email: "carlos@gmail.com",
    role: "Visualizador",
    status: "Inativo",
    lastLogin: "1 semana atrás",
  },
];

const systemHealthData = [
  { time: "00:00", cpu: 45, memory: 62, requests: 120 },
  { time: "04:00", cpu: 32, memory: 58, requests: 89 },
  { time: "08:00", cpu: 78, memory: 71, requests: 245 },
  { time: "12:00", cpu: 65, memory: 68, requests: 198 },
  { time: "16:00", cpu: 82, memory: 75, requests: 267 },
  { time: "20:00", cpu: 58, memory: 64, requests: 156 },
];

// Custom Select Component
const CustomSelect = ({
  defaultValue,
  options,
  className,
}: {
  defaultValue: string;
  options: { value: string; label: string }[];
  className?: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(defaultValue);
  const selectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const selectedLabel =
    options.find((opt) => opt.value === selectedValue)?.label || defaultValue;

  return (
    <div className={`relative ${className}`} ref={selectRef}>
      <div
        className="flex items-center justify-between w-full px-3 py-2 bg-background border border-muted-foreground/20 rounded-md cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{selectedLabel}</span>
        <ChevronDown className="h-4 w-4 opacity-50" />
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-md shadow-lg border z-50 overflow-hidden">
          {options.map((option) => (
            <div
              key={option.value}
              className={`px-3 py-2 cursor-pointer hover:bg-accent ${
                selectedValue === option.value ? "bg-accent" : ""
              }`}
              onClick={() => {
                setSelectedValue(option.value);
                setIsOpen(false);
              }}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default function SettingsPage() {
  const [configTab, setConfigTab] = useState("users");

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Configurações</h2>
          <p className="text-muted-foreground">
            Gerir configurações do sistema
          </p>
        </div>
      </div>

      <Tabs
        value={configTab}
        onValueChange={setConfigTab}
        className="space-y-6"
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="users">Usuários</TabsTrigger>
          <TabsTrigger value="system">Saúde do Sistema</TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-xl">Gestão de Usuários</CardTitle>
                <CardDescription>
                  Gerir usuários e privilégios do sistema
                </CardDescription>
              </div>
              <Button className="flex items-center gap-2">
                <UserPlus className="h-4 w-4" />
                <span className="hidden sm:inline">Adicionar Usuário</span>
                <span className="sm:hidden">Adicionar</span>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="mb-6 flex flex-col gap-4 sm:flex-row">
                <div className="flex-1">
                  <Input placeholder="Buscar usuários..." className="w-full" />
                </div>
                <CustomSelect
                  defaultValue="all"
                  options={[
                    { value: "all", label: "Todos os Roles" },
                    { value: "admin", label: "Admin" },
                    { value: "operator", label: "Operador" },
                    { value: "viewer", label: "Visualizador" },
                  ]}
                  className="w-full sm:w-48"
                />
              </div>

              <div className="rounded-lg border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nome</TableHead>
                      <TableHead className="hidden sm:table-cell">
                        Email
                      </TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="hidden md:table-cell">
                        Último Login
                      </TableHead>
                      <TableHead>Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">
                          {user.name}
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">
                          {user.email}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              user.role === "Admin" ? "default" : "secondary"
                            }
                          >
                            {user.role}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              user.status === "Ativo" ? "default" : "secondary"
                            }
                          >
                            {user.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          {user.lastLogin}
                        </TableCell>
                        <TableCell>
                          <CustomDropdown
                            trigger={
                              <Button variant="ghost" size="icon">
                                <Settings className="h-4 w-4" />
                              </Button>
                            }
                            align="end"
                          >
                            <div className="py-1">
                              <div className="flex items-center px-2 py-1.5 text-sm rounded-sm cursor-pointer hover:bg-accent hover:text-accent-foreground transition-colors">
                                <Edit className="mr-2 h-4 w-4" />
                                <span>Editar</span>
                              </div>
                              <div className="flex items-center px-2 py-1.5 text-sm rounded-sm cursor-pointer hover:bg-accent hover:text-accent-foreground transition-colors">
                                <EyeOff className="mr-2 h-4 w-4" />
                                <span>Desativar</span>
                              </div>
                              <div className="h-px bg-muted my-1"></div>
                              <div className="flex items-center px-2 py-1.5 text-sm rounded-sm cursor-pointer text-red-600 hover:bg-accent hover:text-red-700 transition-colors">
                                <Trash2 className="mr-2 h-4 w-4" />
                                <span>Excluir</span>
                              </div>
                            </div>
                          </CustomDropdown>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="system" className="space-y-6">
          {/* System Health Metrics */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card className="transition-all duration-200 hover:shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">CPU</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">65%</div>
                <p className="text-xs text-muted-foreground">
                  Utilização atual
                </p>
              </CardContent>
            </Card>

            <Card className="transition-all duration-200 hover:shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Memória</CardTitle>
                <Server className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">68%</div>
                <p className="text-xs text-muted-foreground">8.2GB / 12GB</p>
              </CardContent>
            </Card>

            <Card className="transition-all duration-200 hover:shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Requisições
                </CardTitle>
                <Wifi className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">198</div>
                <p className="text-xs text-muted-foreground">Por minuto</p>
              </CardContent>
            </Card>

            <Card className="transition-all duration-200 hover:shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Uptime</CardTitle>
                <Shield className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">99.9%</div>
                <p className="text-xs text-muted-foreground">15 dias, 4h</p>
              </CardContent>
            </Card>
          </div>

          {/* System Health Chart */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-lg">
                Monitoramento do Sistema (24h)
              </CardTitle>
              <CardDescription>
                Métricas de performance em tempo real
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={systemHealthData}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#e0e0e0"
                    opacity={0.3}
                  />
                  <XAxis
                    dataKey="time"
                    tick={{ fontSize: 12, fill: "#6b7280" }}
                  />
                  <YAxis tick={{ fontSize: 12, fill: "#6b7280" }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#ffffff",
                      border: "1px solid #e5e7eb",
                      borderRadius: "8px",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="cpu"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    name="CPU %"
                  />
                  <Line
                    type="monotone"
                    dataKey="memory"
                    stroke="#8b5cf6"
                    strokeWidth={2}
                    name="Memória %"
                  />
                  <Line
                    type="monotone"
                    dataKey="requests"
                    stroke="#f59e0b"
                    strokeWidth={2}
                    name="Requisições"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Service Status */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Status dos Serviços</CardTitle>
              <CardDescription>
                Estado atual de todos os componentes do sistema
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 rounded-lg border">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <div>
                        <p className="font-medium">API Principal</p>
                        <p className="text-sm text-muted-foreground">
                          Funcionando normalmente
                        </p>
                      </div>
                    </div>
                    <Badge variant="default">Online</Badge>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-lg border">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <div>
                        <p className="font-medium">Base de Dados</p>
                        <p className="text-sm text-muted-foreground">
                          Conexões estáveis
                        </p>
                      </div>
                    </div>
                    <Badge variant="default">Online</Badge>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-lg border">
                    <div className="flex items-center gap-3">
                      <AlertTriangle className="h-5 w-5 text-yellow-500" />
                      <div>
                        <p className="font-medium">Sistema de Email</p>
                        <p className="text-sm text-muted-foreground">
                          Latência elevada
                        </p>
                      </div>
                    </div>
                    <Badge variant="secondary">Degradado</Badge>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 rounded-lg border">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <div>
                        <p className="font-medium">Autenticação</p>
                        <p className="text-sm text-muted-foreground">
                          Todos os servicios ativos
                        </p>
                      </div>
                    </div>
                    <Badge variant="default">Online</Badge>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-lg border">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <div>
                        <p className="font-medium">Backup</p>
                        <p className="text-sm text-muted-foreground">
                          Último backup: 2h atrás
                        </p>
                      </div>
                    </div>
                    <Badge variant="default">Online</Badge>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-lg border">
                    <div className="flex items-center gap-3">
                      <XCircle className="h-5 w-5 text-red-500" />
                      <div>
                        <p className="font-medium">Relatórios</p>
                        <p className="text-sm text-muted-foreground">
                          Serviço indisponível
                        </p>
                      </div>
                    </div>
                    <Badge variant="destructive">Offline</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
