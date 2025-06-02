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
const deliveryStatuses = [
  {
    id: "DS-001",
    orderNumber: "2024-001",
    customer: "ABC商事",
    deliveryAddress: "東京都千代田区1-1-1",
    estimatedArrivalTime: "2024-01-21 10:30",
    actualArrivalTime: "",
    driverName: "田中運転手",
    vehicleNumber: "品川500あ1234",
    status: "運送中",
    deliveryConfirmed: false,
    signatureReceived: false,
  },
  {
    id: "DS-002",
    orderNumber: "2024-002",
    customer: "XYZ株式会社",
    deliveryAddress: "大阪府大阪市中央区2-2-2",
    estimatedArrivalTime: "2024-01-22 14:00",
    actualArrivalTime: "",
    driverName: "佐藤運転手",
    vehicleNumber: "なにわ500あ5678",
    status: "運送中",
    deliveryConfirmed: false,
    signatureReceived: false,
  },
  {
    id: "DS-003",
    orderNumber: "2024-003",
    customer: "DEF工業",
    deliveryAddress: "愛知県名古屋市中区3-3-3",
    estimatedArrivalTime: "2024-01-19 09:00",
    actualArrivalTime: "2024-01-19 09:15",
    driverName: "鈴木運転手",
    vehicleNumber: "名古屋500あ9012",
    status: "運送完了",
    deliveryConfirmed: true,
    signatureReceived: true,
  },
]

export default function DeliveryStatusPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [confirmationFilter, setConfirmationFilter] = useState("all")

  const filteredStatuses = deliveryStatuses.filter((status) => {
    const matchesSearch =
      status.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      status.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      status.driverName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || status.status === statusFilter
    const matchesConfirmation =
      confirmationFilter === "all" ||
      (confirmationFilter === "confirmed" && status.deliveryConfirmed) ||
      (confirmationFilter === "unconfirmed" && !status.deliveryConfirmed)

    return matchesSearch && matchesStatus && matchesConfirmation
  })

  const exportToCSV = () => {
    // Mock CSV export
    console.log("Exporting filtered delivery statuses to CSV...")
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">運送対象編集</h1>
          <p className="text-muted-foreground">すべての運送対象を管理・追跡</p>
        </div>
        <Link href="/delivery/status/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            新規運送対象
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
                placeholder="運送対象を検索..."
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
                <SelectItem value="運送前">運送前</SelectItem>
                <SelectItem value="運送中">運送中</SelectItem>
                <SelectItem value="運送完了">運送完了</SelectItem>
              </SelectContent>
            </Select>

            <Select value={confirmationFilter} onValueChange={setConfirmationFilter}>
              <SelectTrigger>
                <SelectValue placeholder="配送確認" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">すべて</SelectItem>
                <SelectItem value="confirmed">確認済み</SelectItem>
                <SelectItem value="unconfirmed">未確認</SelectItem>
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
                <TableHead>配送先住所</TableHead>
                <TableHead>到着予定時刻</TableHead>
                <TableHead>実際到着時刻</TableHead>
                <TableHead>運転手</TableHead>
                <TableHead>車両番号</TableHead>
                <TableHead>ステータス</TableHead>
                <TableHead>配送確認</TableHead>
                <TableHead>操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStatuses.map((status) => (
                <TableRow key={status.id}>
                  <TableCell className="font-medium">
                    <Link href={`/delivery/status/${status.id}`} className="text-blue-600 hover:underline">
                      {status.orderNumber}
                    </Link>
                  </TableCell>
                  <TableCell>{status.customer}</TableCell>
                  <TableCell>{status.deliveryAddress}</TableCell>
                  <TableCell>{status.estimatedArrivalTime}</TableCell>
                  <TableCell>{status.actualArrivalTime || "未到着"}</TableCell>
                  <TableCell>{status.driverName}</TableCell>
                  <TableCell>{status.vehicleNumber}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        status.status === "運送完了" ? "default" : status.status === "運送中" ? "secondary" : "outline"
                      }
                    >
                      {status.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1">
                      <span>{status.deliveryConfirmed ? "確認済み" : "未確認"}</span>
                      {status.signatureReceived && (
                        <Badge variant="outline" className="text-xs">
                          署名済み
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Link href={`/delivery/status/${status.id}`}>
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
          {deliveryStatuses.length}件中{filteredStatuses.length}件を表示
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
