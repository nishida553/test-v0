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
const shippingStatuses = [
  {
    id: "SS-001",
    orderNumber: "2024-001",
    customer: "ABC商事",
    businessOffice: "営業所1",
    estimatedArrivalDate: "2024-01-21",
    estimatedArrivalTime: "午前",
    truckNumber: "T-001",
    status: "配送中",
    deliveryConfirmed: false,
  },
  {
    id: "SS-002",
    orderNumber: "2024-002",
    customer: "XYZ株式会社",
    businessOffice: "営業所2",
    estimatedArrivalDate: "2024-01-23",
    estimatedArrivalTime: "午後",
    truckNumber: "T-002",
    status: "配送中",
    deliveryConfirmed: false,
  },
  {
    id: "SS-003",
    orderNumber: "2024-003",
    customer: "DEF工業",
    businessOffice: "営業所1",
    estimatedArrivalDate: "2024-01-19",
    estimatedArrivalTime: "午前",
    truckNumber: "T-003",
    status: "配送完了",
    deliveryConfirmed: true,
  },
]

export default function ShippingStatusPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [officeFilter, setOfficeFilter] = useState("all")

  const filteredStatuses = shippingStatuses.filter((status) => {
    const matchesSearch =
      status.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      status.customer.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || status.status === statusFilter
    const matchesOffice = officeFilter === "all" || status.businessOffice === officeFilter

    return matchesSearch && matchesStatus && matchesOffice
  })

  const exportToCSV = () => {
    // Mock CSV export
    console.log("Exporting filtered shipping statuses to CSV...")
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">配送状況一覧</h1>
          <p className="text-muted-foreground">すべての配送状況を管理・追跡</p>
        </div>
        <Link href="/shipping/status/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            新規配送状況
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
                placeholder="配送状況を検索..."
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
                <SelectItem value="配送前">配送前</SelectItem>
                <SelectItem value="配送中">配送中</SelectItem>
                <SelectItem value="配送完了">配送完了</SelectItem>
              </SelectContent>
            </Select>

            <Select value={officeFilter} onValueChange={setOfficeFilter}>
              <SelectTrigger>
                <SelectValue placeholder="営業所" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">すべての営業所</SelectItem>
                <SelectItem value="営業所1">営業所1</SelectItem>
                <SelectItem value="営業所2">営業所2</SelectItem>
                <SelectItem value="営業所3">営業所3</SelectItem>
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
                <TableHead>営業所</TableHead>
                <TableHead>到着予定日</TableHead>
                <TableHead>到着予定時間</TableHead>
                <TableHead>トラック番号</TableHead>
                <TableHead>ステータス</TableHead>
                <TableHead>配送確認</TableHead>
                <TableHead>操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStatuses.map((status) => (
                <TableRow key={status.id}>
                  <TableCell className="font-medium">
                    <Link href={`/shipping/status/${status.id}`} className="text-blue-600 hover:underline">
                      {status.orderNumber}
                    </Link>
                  </TableCell>
                  <TableCell>{status.customer}</TableCell>
                  <TableCell>{status.businessOffice}</TableCell>
                  <TableCell>{status.estimatedArrivalDate}</TableCell>
                  <TableCell>{status.estimatedArrivalTime}</TableCell>
                  <TableCell>{status.truckNumber}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        status.status === "配送完了" ? "default" : status.status === "配送中" ? "secondary" : "outline"
                      }
                    >
                      {status.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{status.deliveryConfirmed ? "確認済み" : "未確認"}</TableCell>
                  <TableCell>
                    <Link href={`/shipping/status/${status.id}`}>
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
          {shippingStatuses.length}件中{filteredStatuses.length}件を表示
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
