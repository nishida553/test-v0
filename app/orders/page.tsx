"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Download, Search, Plus, Eye } from "lucide-react"
import Link from "next/link"

// Mock data
const orders = [
  {
    id: "ORD-001",
    orderNumber: "2024-001",
    customer: "ABC商事",
    specialStore: "店舗A",
    status: "下書き",
    orderDate: "2024-01-15",
    deliveryDate: "2024-01-20",
    quantity: 100,
    amount: "¥125,000",
  },
  {
    id: "ORD-002",
    orderNumber: "2024-002",
    customer: "XYZ株式会社",
    specialStore: "店舗B",
    status: "配送指示待ち",
    orderDate: "2024-01-16",
    deliveryDate: "2024-01-22",
    quantity: 75,
    amount: "¥89,000",
  },
  {
    id: "ORD-003",
    orderNumber: "2024-003",
    customer: "DEF工業",
    specialStore: "店舗A",
    status: "配送中",
    orderDate: "2024-01-17",
    deliveryDate: "2024-01-25",
    quantity: 200,
    amount: "¥210,000",
  },
]

export default function OrderListPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [storeFilter, setStoreFilter] = useState("all")

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || order.status === statusFilter
    const matchesStore = storeFilter === "all" || order.specialStore === storeFilter

    return matchesSearch && matchesStatus && matchesStore
  })

  const exportToCSV = () => {
    // Mock CSV export
    console.log("Exporting filtered orders to CSV...")
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">受注一覧</h1>
          <p className="text-muted-foreground">すべての受注を管理・追跡</p>
        </div>
        <Link href="/orders/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            新規受注
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>フィルター</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="受注を検索..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="ステータス" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">すべてのステータス</SelectItem>
                <SelectItem value="下書き">下書き</SelectItem>
                <SelectItem value="配送指示待ち">配送指示待ち</SelectItem>
                <SelectItem value="配送前">配送前</SelectItem>
                <SelectItem value="配送中">配送中</SelectItem>
                <SelectItem value="配送完了">配送完了</SelectItem>
              </SelectContent>
            </Select>

            <Select value={storeFilter} onValueChange={setStoreFilter}>
              <SelectTrigger>
                <SelectValue placeholder="特約店" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">すべての店舗</SelectItem>
                <SelectItem value="Store A">店舗A</SelectItem>
                <SelectItem value="Store B">店舗B</SelectItem>
                <SelectItem value="Store C">店舗C</SelectItem>
              </SelectContent>
            </Select>

            <Button onClick={exportToCSV} variant="outline">
              <Download className="mr-2 h-4 w-4" />
              CSV出力
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>受注番号</TableHead>
                <TableHead>顧客</TableHead>
                <TableHead>特約店</TableHead>
                <TableHead>ステータス</TableHead>
                <TableHead>受注日</TableHead>
                <TableHead>配送予定日</TableHead>
                <TableHead>数量</TableHead>
                <TableHead>金額</TableHead>
                <TableHead>操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">
                    <Link href={`/orders/${order.id}`} className="text-blue-600 hover:underline">
                      {order.orderNumber}
                    </Link>
                  </TableCell>
                  <TableCell>{order.customer}</TableCell>
                  <TableCell>{order.specialStore}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        order.status === "配送中" || order.status === "配送完了"
                          ? "default"
                          : order.status === "配送前"
                            ? "secondary"
                            : order.status === "配送指示待ち"
                              ? "outline"
                              : "secondary"
                      }
                    >
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{order.orderDate}</TableCell>
                  <TableCell>{order.deliveryDate}</TableCell>
                  <TableCell>{order.quantity}</TableCell>
                  <TableCell>{order.amount}</TableCell>
                  <TableCell>
                    <Link href={`/orders/${order.id}`}>
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="flex justify-between items-center">
        <p className="text-sm text-muted-foreground">
          {orders.length}件中{filteredOrders.length}件を表示
        </p>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            前へ
          </Button>
          <Button variant="outline" size="sm">
            次へ
          </Button>
        </div>
      </div>
    </div>
  )
}
