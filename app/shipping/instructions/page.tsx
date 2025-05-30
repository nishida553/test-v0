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
const shippingInstructions = [
  {
    id: "SI-001",
    orderNumber: "2024-001",
    customer: "ABC商事",
    specialStore: "店舗A",
    status: "配送前",
    shipmentDate: "2024-01-20",
    shipmentTime: "午前",
    truckNumber: "T-001",
    carrier: "運送会社1",
  },
  {
    id: "SI-002",
    orderNumber: "2024-002",
    customer: "XYZ株式会社",
    specialStore: "店舗B",
    status: "配送中",
    shipmentDate: "2024-01-22",
    shipmentTime: "午後",
    truckNumber: "T-002",
    carrier: "運送会社2",
  },
  {
    id: "SI-003",
    orderNumber: "2024-003",
    customer: "DEF工業",
    specialStore: "店舗A",
    status: "配送完了",
    shipmentDate: "2024-01-18",
    shipmentTime: "午前",
    truckNumber: "T-003",
    carrier: "運送会社1",
  },
]

export default function ShippingInstructionsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [carrierFilter, setCarrierFilter] = useState("all")

  const filteredInstructions = shippingInstructions.filter((instruction) => {
    const matchesSearch =
      instruction.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      instruction.customer.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || instruction.status === statusFilter
    const matchesCarrier = carrierFilter === "all" || instruction.carrier === carrierFilter

    return matchesSearch && matchesStatus && matchesCarrier
  })

  const exportToCSV = () => {
    // Mock CSV export
    console.log("Exporting filtered shipping instructions to CSV...")
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">配送指示一覧</h1>
          <p className="text-muted-foreground">すべての配送指示を管理・追跡</p>
        </div>
        <Link href="/shipping/instructions/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            新規配送指示
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
                placeholder="配送指示を検索..."
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

            <Select value={carrierFilter} onValueChange={setCarrierFilter}>
              <SelectTrigger>
                <SelectValue placeholder="運送会社" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">すべての運送会社</SelectItem>
                <SelectItem value="運送会社1">運送会社1</SelectItem>
                <SelectItem value="運送会社2">運送会社2</SelectItem>
                <SelectItem value="運送会社3">運送会社3</SelectItem>
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
                <TableHead>出荷日</TableHead>
                <TableHead>出荷時間</TableHead>
                <TableHead>トラック番号</TableHead>
                <TableHead>運送会社</TableHead>
                <TableHead>操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredInstructions.map((instruction) => (
                <TableRow key={instruction.id}>
                  <TableCell className="font-medium">
                    <Link href={`/shipping/instructions/${instruction.id}`} className="text-blue-600 hover:underline">
                      {instruction.orderNumber}
                    </Link>
                  </TableCell>
                  <TableCell>{instruction.customer}</TableCell>
                  <TableCell>{instruction.specialStore}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        instruction.status === "配送完了"
                          ? "default"
                          : instruction.status === "配送中"
                            ? "secondary"
                            : "outline"
                      }
                    >
                      {instruction.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{instruction.shipmentDate}</TableCell>
                  <TableCell>{instruction.shipmentTime}</TableCell>
                  <TableCell>{instruction.truckNumber}</TableCell>
                  <TableCell>{instruction.carrier}</TableCell>
                  <TableCell>
                    <Link href={`/shipping/instructions/${instruction.id}`}>
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
          {shippingInstructions.length}件中{filteredInstructions.length}件を表示
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
