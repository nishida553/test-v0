"use client"
import {
  Package,
  Truck,
  Users,
  Building2,
  Settings,
  BarChart3,
  ShoppingCart,
  UserCheck,
  Database,
  Home,
  LogOut,
  CheckSquare,
  FileCheck,
  MessageSquare,
  ClipboardList,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar"
import Link from "next/link"

// Mock user data - in real app this would come from auth context
const user = {
  name: "管理者ユーザー",
  email: "admin@company.com",
  role: "admin",
}

const navigationItems = [
  {
    title: "ダッシュボード",
    url: "/dashboard",
    icon: Home,
  },
]

const orderItems = [
  {
    title: "受注一覧",
    url: "/orders",
    icon: ShoppingCart,
  },
  {
    title: "受注登録",
    url: "/orders/new",
    icon: Package,
  },
]

const shippingItems = [
  {
    title: "出荷対象一覧",
    url: "/shipping/instructions",
    icon: Truck,
  },
]

const deliveryItems = [
  {
    title: "運送対象一覧",
    url: "/delivery/instructions",
    icon: Truck,
  },
]

const agreementItems = [
  {
    title: "合意対象一覧",
    url: "/agreement/targets",
    icon: CheckSquare,
  },
]

const masterDataItems = [
  {
    title: "商品マスタ",
    url: "/master/products",
    icon: Package,
  },
  {
    title: "顧客マスタ",
    url: "/master/customers",
    icon: Users,
  },
  {
    title: "特約店マスタ",
    url: "/master/stores",
    icon: Building2,
  },
  {
    title: "運送会社マスタ",
    url: "/master/carriers",
    icon: Truck,
  },
  {
    title: "営業所マスタ",
    url: "/master/offices",
    icon: Building2,
  },
]

const adminItems = [
  {
    title: "ユーザー管理",
    url: "/admin/users",
    icon: Users,
  },
  {
    title: "権限管理",
    url: "/admin/roles",
    icon: UserCheck,
  },
  {
    title: "レポート",
    url: "/reports",
    icon: BarChart3,
  },
  {
    title: "システム管理",
    url: "/admin/system",
    icon: Settings,
  },
  {
    title: "その他機能",
    url: "/others",
    icon: ClipboardList,
  },
]

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2 px-2 py-2">
          <Database className="h-6 w-6" />
          <span className="font-semibold">受注管理システム</span>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        <SidebarGroup>
          <SidebarGroupLabel>受注管理</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {orderItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>出荷管理</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {shippingItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        <SidebarGroup>
          <SidebarGroupLabel>運送管理</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {deliveryItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>合意管理</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {agreementItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        <SidebarGroup>
          <SidebarGroupLabel>マスタデータ</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {masterDataItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {user.role === "admin" && (
          <SidebarGroup>
            <SidebarGroupLabel>管理機能</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {adminItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <div className="flex flex-col gap-1 px-2 py-2">
              <span className="text-sm font-medium">{user.name}</span>
              <span className="text-xs text-muted-foreground">{user.email}</span>
            </div>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="/auth/login">
                <LogOut />
                <span>ログアウト</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
