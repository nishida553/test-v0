"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Download, Search, Eye, Clock, CheckCircle, AlertTriangle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"

// Mock data for agreement targets
const agreementTargets = [
  {
    id: "AGR-001",
    orderNumber: "2024-001",
    customer: "ABC商事",
    oilType: "出光A",
    quantity: "100L",
    deliveryAddress: "東京都千代田区1-1-1",
    plannedDeliveryDate: "2024-01-21",
    plannedDeliveryTime: "午前",
    transportCompany: "運送会社1",
    driverName: "田中運転手",
    vehicleNumber: "品川500あ1234",
    agreementStatus: "承認待ち",
    planSubmittedDate: "2024-01-20 14:30",
    urgencyLevel: "通常",
    estimatedDuration: "2時間",
    specialInstructions: "取扱注意",
  },
  {
    id: "AGR-002",
    orderNumber: "2024-002",
    customer: "XYZ株式会社",
    oilType: "出光B",
    quantity: "75L",
    deliveryAddress: "大阪府大阪市中央区2-2-2",
    plannedDeliveryDate: "2024-01-22",
    plannedDeliveryTime: "午後",
    transportCompany: "運送会社2",
    driverName: "佐藤運転手",
    vehicleNumber: "なにわ500あ5678",
    agreementStatus: "承認済み",
    planSubmittedDate: "2024-01-19 16:45",
    urgencyLevel: "急ぎ",
    estimatedDuration: "3時間",
    specialInstructions: "時間厳守",
  },
  {
    id: "AGR-003",
    orderNumber: "2024-003",
    customer: "DEF工業",
    oilType: "軽油",
    quantity: "200L",
    deliveryAddress: "愛知県名古屋市中区3-3-3",
    plannedDeliveryDate: "2024-01-23",
    plannedDeliveryTime: "午前",
    transportCompany: "運送会社1",
    driverName: "鈴木運転手",
    vehicleNumber: "名古屋500あ9012",
    agreementStatus: "要修正",
    planSubmittedDate: "2024-01-18 11:20",
    urgencyLevel: "通常",
    estimatedDuration: "2.5時間",
    specialInstructions: "荷卸し場所要確認",
  },
  {
    id: "AGR-004",
    orderNumber: "2024-004",
    customer: "GHI商事",
    oilType: "重油",
    quantity: "150L",
    deliveryAddress: "福岡県福岡市博多区4-4-4",
    plannedDeliveryDate: "2024-01-24",
    plannedDeliveryTime: "午後",
    transportCompany: "運送会社3",
    driverName: "高橋運転手",
    vehicleNumber: "福岡500あ3456",
    agreementStatus: "承認待ち",
    planSubmittedDate: "2024-01-20 09:15",
    urgencyLevel: "急ぎ",
    estimatedDuration: "4時間",
    specialInstructions: "特になし",
  },
]

export default function AgreementTargetsPage() {
  const { toast } = useToast()
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [urgencyFilter, setUrgencyFilter] = useState("all")
  const [companyFilter, setCompanyFilter] = useState("all")

  const filteredTargets = agreementTargets.filter((target) => {
    const matchesSearch =
      target.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      target.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      target.oilType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      target.driverName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || target.agreementStatus === statusFilter
    const matchesUrgency = urgencyFilter === "all" || target.urgencyLevel === urgencyFilter
    const matchesCompany = companyFilter === "all" || target.transportCompany === companyFilter

    return matchesSearch && matchesStatus && matchesUrgency && matchesCompany
  })

  const exportToCSV = () => {
    toast({
      title: "CSV出力開始",
      description: "合意対象一覧のCSVファイルを生成中です",
    })
  }

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "承認済み":
        return "default"
      case "承認待ち":
        return "secondary"
      case "要修正":
        return "destructive"
      default:
        return "outline"
    }
  }

  const getUrgencyIcon = (urgency: string) => {
    return urgency === "急ぎ" ? <AlertTriangle className="h-4 w-4 text-orange-500" /> : null
  }

  const getStatusCounts = () => {
    return {
      total: filteredTargets.length,
      pending: filteredTargets.filter((t) => t.agreementStatus === "承認待ち").length,
      approved: filteredTargets.filter((t) => t.agreementStatus === "承認済み").length,
      needsRevision: filteredTargets.filter((t) => t.agreementStatus === "要修正").length,
    }
  }

  const statusCounts = getStatusCounts()

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">合意対象一覧</h1>
          <p className="text-muted-foreground">運送計画の承認・確認管理</p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-blue-500" />
              <div>
                <div className="text-2xl font-bold">{statusCounts.pending}</div>
                <p className="text-xs text-muted-foreground">承認待ち</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <div>
                <div className="text-2xl font-bold">{statusCounts.approved}</div>
                <p className="text-xs text-muted-foreground">承認済み</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-orange-500" />
              <div>
                <div className="text-2xl font-bold">{statusCounts.needsRevision}</div>
                <p className="text-xs text-muted-foreground">要修正</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">{statusCounts.total}</div>
            <p className="text-xs text-muted-foreground">総件数</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>フィルター</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-5">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="合意対象を検索..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="承認ステータス" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">すべてのステータス</SelectItem>
                <SelectItem value="承認待ち">承認待ち</SelectItem>
                <SelectItem value="承認済み">承認済み</SelectItem>
                <SelectItem value="要修正">要修正</SelectItem>
              </SelectContent>
            </Select>

            <Select value={urgencyFilter} onValueChange={setUrgencyFilter}>
              <SelectTrigger>
                <SelectValue placeholder="緊急度" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">すべての緊急度</SelectItem>
                <SelectItem value="急ぎ">急ぎ</SelectItem>
                <SelectItem value="通常">通常</SelectItem>
              </SelectContent>
            </Select>

            <Select value={companyFilter} onValueChange={setCompanyFilter}>
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
                <TableHead>需要家</TableHead>
                <TableHead>油種</TableHead>
                <TableHead>数量</TableHead>
                <TableHead>配送予定日時</TableHead>
                <TableHead>運送会社</TableHead>
                <TableHead>運転手</TableHead>
                <TableHead>承認ステータス</TableHead>
                <TableHead>緊急度</TableHead>
                <TableHead>計画提出日時</TableHead>
                <TableHead>操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTargets.map((target) => (
                <TableRow key={target.id}>
                  <TableCell className="font-medium">
                    <Link href={`/agreement/targets/${target.id}`} className="text-blue-600 hover:underline">
                      {target.orderNumber}
                    </Link>
                  </TableCell>
                  <TableCell>{target.customer}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{target.oilType}</Badge>
                  </TableCell>
                  <TableCell>{target.quantity}</TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span>{target.plannedDeliveryDate}</span>
                      <span className="text-xs text-muted-foreground">{target.plannedDeliveryTime}</span>
                    </div>
                  </TableCell>
                  <TableCell>{target.transportCompany}</TableCell>
                  <TableCell>{target.driverName}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusVariant(target.agreementStatus)}>{target.agreementStatus}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      {getUrgencyIcon(target.urgencyLevel)}
                      <span>{target.urgencyLevel}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm">{target.planSubmittedDate}</TableCell>
                  <TableCell>
                    <Link href={`/agreement/targets/${target.id}`}>
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
          {agreementTargets.length}件中{filteredTargets.length}件を表示
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
