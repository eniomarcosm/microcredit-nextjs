"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Bell,
  FileText,
  HomeIcon,
  LandmarkIcon,
  Loader2,
  LogOut,
  Menu,
  Settings,
  User,
  Users,
  CreditCard,
  PiggyBank,
  BarChart3,
  Wallet,
} from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const notifications = [
  {
    id: 1,
    title: "Novo empréstimo aprovado",
    message: "Empréstimo de Maria Santos foi aprovado",
    time: "5 min atrás",
    type: "success",
    read: false,
  },
  {
    id: 2,
    title: "Pagamento recebido",
    message: "Carlos Oliveira realizou um pagamento",
    time: "1 hora atrás",
    type: "success",
    read: false,
  },
  {
    id: 3,
    title: "Empréstimo em atraso",
    message: "Pedro Mendes está com pagamento em atraso",
    time: "2 horas atrás",
    type: "warning",
    read: true,
  },
  {
    id: 4,
    title: "Sistema atualizado",
    message: "MICROCREDIT foi atualizado para versão 2.1.0",
    time: "1 dia atrás",
    type: "info",
    read: true,
  },
];

const menuItems = [
  {
    id: "dashboard",
    label: "Início",
    icon: HomeIcon,
    href: "/home",
  },
  {
    id: "clients",
    label: "Clientes",
    icon: Users,
    href: "/clients",
  },
  {
    id: "loans",
    label: "Empréstimos",
    icon: CreditCard,
    href: "/loans",
  },
  {
    id: "payments",
    label: "Pagamentos",
    icon: Wallet,
    href: "/payments",
  },
  {
    id: "reports",
    label: "Relatórios",
    icon: BarChart3,
    href: "/reports",
  },
];

export const HeaderNav = () => {
  const pathname = usePathname();
  const router = useRouter();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const { data: session, status } = useSession();

  const notificationsRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  const handleLogout = async () => {
    await signOut();

    window.location.href = "/"; //use it if you don't show the dashboard for non-authenticated users
    // router.push("/");
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  const isActivePath = (href: string) => {
    if (href === "/") {
      return pathname === "/dashboard" || pathname === "/";
    }
    return pathname.startsWith(href);
  };

  // Fechar dropdowns ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        notificationsRef.current &&
        !notificationsRef.current.contains(event.target as Node)
      ) {
        setShowNotifications(false);
      }
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setShowProfileMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="border-b  bg-muted/30">
        <div className="container mx-auto max-w-screen-2xl flex h-16 items-center justify-between px-4 md:px-6 lg:px-32">
          <div className="flex items-center space-x-4">
            {status === "authenticated" && (
              <div className="md:hidden">
                <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
                  <SheetTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Menu className="h-5 w-5" />
                      <span className="sr-only">Toggle navigation menu</span>
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-72 p-0">
                    <div className="flex h-full flex-col">
                      <div className="flex h-16 items-center border-b px-6 bg-muted/30">
                        <div className="flex items-center space-x-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/80 shadow-lg">
                            <PiggyBank className="h-5 w-5 text-primary-foreground" />
                          </div>
                          <div>
                            <span className="font-bold text-lg">
                              MICROCREDIT
                            </span>
                            <p className="text-xs text-muted-foreground font-medium">
                              v2.0.0
                            </p>
                          </div>
                        </div>
                      </div>
                      <nav className="flex-1 space-y-2 p-6">
                        {menuItems.map((item) => (
                          <Link key={item.id} href={item.href}>
                            <Button
                              variant={
                                isActivePath(item.href) ? "default" : "ghost"
                              }
                              className="w-full justify-start h-11 font-medium"
                              onClick={() => setSidebarOpen(false)}
                            >
                              <item.icon className="mr-3 h-4 w-4" />
                              {item.label}
                            </Button>
                          </Link>
                        ))}
                      </nav>
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            )}

            <Link href="/dashboard" className="flex items-center space-x-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/80 shadow-lg">
                <PiggyBank className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <span className="font-bold text-lg">MICROCREDIT</span>
                <p className="text-xs text-muted-foreground font-medium hidden sm:block">
                  Sistema de Gestão de Microcrédito
                </p>
              </div>
            </Link>
          </div>

          <div className="flex items-center space-x-2 md:space-x-4">
            {status === "loading" && (
              <div className="flex items-center space-x-1">
                <Loader2 className="h-6 w-6 mr-2 animate-spin" />
              </div>
            )}

            {status === "unauthenticated" && (
              <div className="relative flex items-center space-x-1">
                <div className=" md:flex items-center space-x-2 md:space-x-4">
                  <Link href="/">
                    <Button>Entrar</Button>
                  </Link>
                </div>
              </div>
            )}
            {status === "authenticated" && (
              <>
                {/* Notifications Dropdown */}
                <div className="relative" ref={notificationsRef}>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="relative"
                    onClick={() => setShowNotifications(!showNotifications)}
                  >
                    <Bell className="h-5 w-5" />
                    {unreadCount > 0 && (
                      <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-xs text-white flex items-center justify-center font-medium">
                        {unreadCount}
                      </span>
                    )}
                  </Button>

                  {showNotifications && (
                    <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg border z-50 overflow-hidden">
                      <div className="flex items-center justify-between p-4 border-b">
                        <h4 className="font-semibold">Notificações</h4>
                        <Badge variant="secondary">{unreadCount} novas</Badge>
                      </div>
                      <div className="max-h-96 overflow-y-auto">
                        {notifications.map((notification) => (
                          <div
                            key={notification.id}
                            className={`p-4 border-b hover:bg-muted/50 cursor-pointer ${
                              !notification.read ? "bg-muted/30" : ""
                            }`}
                            onClick={() => setShowNotifications(false)}
                          >
                            <div className="flex items-start gap-3">
                              <div
                                className={`h-2 w-2 rounded-full mt-2 ${
                                  notification.type === "success"
                                    ? "bg-green-500"
                                    : notification.type === "warning"
                                    ? "bg-yellow-500"
                                    : notification.type === "info"
                                    ? "bg-blue-500"
                                    : "bg-gray-500"
                                }`}
                              />
                              <div className="flex-1 space-y-1">
                                <p className="text-sm font-medium">
                                  {notification.title}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  {notification.message}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  {notification.time}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="p-2 border-t">
                        <Button variant="ghost" className="w-full text-sm">
                          Ver todas as notificações
                        </Button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Profile Dropdown */}
                <div className="relative" ref={profileRef}>
                  <Button
                    variant="ghost"
                    className="border-2 relative h-10 w-10 rounded-full hover:bg-muted/50 transition-colors duration-200"
                    onClick={() => setShowProfileMenu(!showProfileMenu)}
                  >
                    <Avatar className="h-9 w-9">
                      <AvatarImage
                        src={session?.user?.image || "/placeholder-user.jpg"}
                        alt="User Avatar"
                      />
                      <AvatarFallback>
                        {session?.user?.name?.charAt(0) || "U"}
                      </AvatarFallback>
                    </Avatar>
                  </Button>

                  {showProfileMenu && (
                    <div className="absolute right-0 mt-2 w-64 bg-white rounded-md shadow-lg border z-50 overflow-hidden">
                      <div className="flex items-center justify-start gap-2 p-4 border-b">
                        <Avatar className="h-10 w-10">
                          <AvatarImage
                            src={
                              session?.user?.image || "/placeholder-user.jpg"
                            }
                            alt="User Avatar"
                          />
                          <AvatarFallback>
                            {session?.user?.name?.charAt(0) || "U"}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col space-y-1 leading-none">
                          <p className="font-medium">
                            {session?.user?.name || "Administrador"}
                          </p>
                          <p className="w-[200px] truncate text-sm text-muted-foreground">
                            {session?.user?.email}
                          </p>
                        </div>
                      </div>
                      <div className="p-1">
                        <Link href="/profile">
                          <div
                            className="flex items-center px-2 py-1.5 text-sm rounded-sm cursor-pointer hover:bg-accent hover:text-accent-foreground transition-colors"
                            onClick={() => setShowProfileMenu(false)}
                          >
                            <User className="mr-2 h-4 w-4" />
                            <span>Perfil</span>
                          </div>
                        </Link>
                        <Link href="/settings">
                          <div
                            className="flex items-center px-2 py-1.5 text-sm rounded-sm cursor-pointer hover:bg-accent hover:text-accent-foreground transition-colors"
                            onClick={() => setShowProfileMenu(false)}
                          >
                            <Settings className="mr-2 h-4 w-4" />
                            <span>Configurações</span>
                          </div>
                        </Link>
                        <div className="h-px bg-muted my-1"></div>
                        <div
                          className="flex items-center px-2 py-1.5 text-sm rounded-sm cursor-pointer hover:bg-accent hover:text-accent-foreground transition-colors text-red-600 hover:text-red-700"
                          onClick={handleLogout}
                        >
                          <LogOut className="mr-2 h-4 w-4" />
                          <span>Sair</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      {status === "authenticated" && (
        <div className="px-4 md:px-6 lg:px-8 py-2 border-t border-slate-100 ">
          <div className="container max-w-screen-2xl mx-auto">
            <nav className="flex items-center justify-center">
              <div className="flex items-center gap-1 overflow-x-auto">
                {menuItems.map((item) => (
                  <Link key={item.id} href={item.href}>
                    <Button
                      variant={isActivePath(item.href) ? "default" : "ghost"}
                      size="sm"
                      className={`hidden md:flex items-center gap-2 transition-all duration-200 ${
                        isActivePath(item.href)
                          ? "bg-primary text-white shadow-sm"
                          : "text-slate-600 hover:text-slate-900 hover:bg-white"
                      }`}
                    >
                      <item.icon className="h-4 w-4" />
                      {item.label}
                    </Button>
                  </Link>
                ))}
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};
