"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Download, Search, Plus, Eye } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"

// Mock data
const deliveryInstructions = [
  {
    id: "DI-001",
    orderNumber: "2024-001",
    customer: "ABC商事",
    item: "出光A",
    deliveryAddress: "東京都千代田区1-1-1",
    status: "運送前",
    deliveryDate: "2024-01-21",
    deliveryTime: "午前",
    driverName: "田中運転手",
    vehicleNumber: "品川500あ1234",
    carrier: "運送会社1",
  },
  {
    id: "DI-002",
    orderNumber: "2024-002",
    customer: "XYZ株式会社",
    item: "出光B",
    deliveryAddress: "大阪府大阪市中央区2-2-2",
    status: "運送中",
    deliveryDate: "2024-01-22",
    deliveryTime: "午後",
    driverName: "佐藤運転手",
    vehicleNumber: "なにわ500あ5678",
    carrier: "運送会社2",
  },
  {
    id: "DI-003",
    orderNumber: "2024-003",
    customer: "DEF工業",
    item: "出光C",
    deliveryAddress: "愛知県名古屋市中区3-3-3",
    status: "運送完了",
    deliveryDate: "2024-01-19",
    deliveryTime: "午前",
    driverName: "鈴木運転手",
    vehicleNumber: "名古屋500あ9012",
    carrier: "運送会社1",
  },
]

export default function DeliveryInstructionsPage() {
  const { toast } = useToast()
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [carrierFilter, setCarrierFilter] = useState("all")

  const filteredInstructions = deliveryInstructions.filter((instruction) => {
    const matchesSearch =
      instruction.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      instruction.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      instruction.driverName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      instruction.item.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || instruction.status === statusFilter
    const matchesCarrier = carrierFilter === "all" || instruction.carrier === carrierFilter

    return matchesSearch && matchesStatus && matchesCarrier
  })

  const exportToCSV = () => {
    toast({
      title: "CSV出力",
      description: "運送対象一覧のCSVファイルを生成中です",
    })
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">運送対象一覧</h1>
          <p className="text-muted-foreground">すべての運送対象を管理・追跡</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          新規運送対象
        </Button>
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
                <TableHead>油種</TableHead>
                <TableHead>配送先住所</TableHead>
                <TableHead>ステータス</TableHead>
                <TableHead>配送日</TableHead>
                <TableHead>配送時間</TableHead>
                <TableHead>運転手</TableHead>
                <TableHead>車両番号</TableHead>
                <TableHead>運送会社</TableHead>
                <TableHead>操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredInstructions.map((instruction) => (
                <TableRow key={instruction.id}>
                  <TableCell className="font-medium">
                    <Link href={`/delivery/instructions/${instruction.id}`} className="text-blue-600 hover:underline">
                      {instruction.orderNumber}
                    </Link>
                  </TableCell>
                  <TableCell>{instruction.customer}</TableCell>
                  <TableCell>{instruction.item}</TableCell>
                  <TableCell>{instruction.deliveryAddress}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        instruction.status === "運送完了"
                          ? "default"
                          : instruction.status === "運送中"
                            ? "secondary"
                            : "outline"
                      }
                    >
                      {instruction.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{instruction.deliveryDate}</TableCell>
                  <TableCell>{instruction.deliveryTime}</TableCell>
                  <TableCell>{instruction.driverName}</TableCell>
                  <TableCell>{instruction.vehicleNumber}</TableCell>
                  <TableCell>{instruction.carrier}</TableCell>
                  <TableCell>
                    <Link href={`/delivery/instructions/${instruction.id}`}>
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
          {deliveryInstructions.length}件中{filteredInstructions.length}件を表示
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
