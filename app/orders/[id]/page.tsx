"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Download, Edit, Save, X } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"

export default function OrderDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const [isEditing, setIsEditing] = useState(false)

  // 注文データのステータス値を更新
  const [orderData, setOrderData] = useState({
    id: params.id,
    orderNumber: "2024-001",
    customer: "ABC商事",
    specialStore: "店舗A",
    status: "配送指示待ち",
    orderDate: "2024-01-15",
    deliveryDate: "2024-01-20",
    quantity: "100",
    oilBusinessOffice: "営業所1",
    transportCompany: "運送会社1",
    remarks: "取扱注意",
    amount: "¥125,000",
  })

  // 履歴データを更新
  const [history, setHistory] = useState([
    {
      date: "2024-01-15 10:30",
      user: "admin@company.com",
      action: "受注作成",
      details: "初回受注登録",
    },
    {
      date: "2024-01-15 14:20",
      user: "admin@company.com",
      action: "ステータス更新",
      details: "下書きから配送指示待ちに変更",
    },
  ])

  // 編集可能条件を更新
  const canEdit = orderData.status === "下書き" || orderData.status === "配送指示待ち"

  const handleSave = () => {
    toast({
      title: "受注が更新されました",
      description: "受注詳細が正常に保存されました",
    })
    setIsEditing(false)
  }

  const exportPDF = () => {
    toast({
      title: "PDF出力",
      description: "受注伝票のPDFが生成されました",
    })
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">受注詳細</h1>
          <p className="text-muted-foreground">受注番号 #{orderData.orderNumber}</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={exportPDF} variant="outline">
            <Download className="mr-2 h-4 w-4" />
            PDF出力
          </Button>
          {canEdit && !isEditing && (
            <Button onClick={() => setIsEditing(true)}>
              <Edit className="mr-2 h-4 w-4" />
              編集
            </Button>
          )}
          {isEditing && (
            <>
              <Button onClick={handleSave}>
                <Save className="mr-2 h-4 w-4" />
                保存
              </Button>
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                <X className="mr-2 h-4 w-4" />
                キャンセル
              </Button>
            </>
          )}
        </div>
      </div>

      <Tabs defaultValue="details" className="space-y-4">
        <TabsList>
          <TabsTrigger value="details">受注詳細</TabsTrigger>
          <TabsTrigger value="history">履歴</TabsTrigger>
        </TabsList>

        <TabsContent value="details">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>受注情報</CardTitle>
                <Badge
                  variant={
                    orderData.status === "配送中" || orderData.status === "配送完了"
                      ? "default"
                      : orderData.status === "配送前"
                        ? "secondary"
                        : orderData.status === "配送指示待ち"
                          ? "outline"
                          : "secondary"
                  }
                >
                  {orderData.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="orderNumber">受注番号</Label>
                  <Input id="orderNumber" value={orderData.orderNumber} disabled />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="orderDate">受注日</Label>
                  <Input id="orderDate" type="date" value={orderData.orderDate} disabled />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="customer">顧客</Label>
                  <Select value={orderData.customer} disabled={!isEditing}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ABC Corporation">ABC Corporation</SelectItem>
                      <SelectItem value="XYZ Limited">XYZ Limited</SelectItem>
                      <SelectItem value="DEF Industries">DEF Industries</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="specialStore">特約店</Label>
                  <Select value={orderData.specialStore} disabled={!isEditing}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Store A">Store A</SelectItem>
                      <SelectItem value="Store B">Store B</SelectItem>
                      <SelectItem value="Store C">Store C</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="quantity">数量</Label>
                  <Input
                    id="quantity"
                    value={orderData.quantity}
                    onChange={(e) => setOrderData((prev) => ({ ...prev, quantity: e.target.value }))}
                    disabled={!isEditing}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="deliveryDate">配送日</Label>
                  <Input
                    id="deliveryDate"
                    type="date"
                    value={orderData.deliveryDate}
                    onChange={(e) => setOrderData((prev) => ({ ...prev, deliveryDate: e.target.value }))}
                    disabled={!isEditing}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="oilBusinessOffice">石油営業所</Label>
                  <Select value={orderData.oilBusinessOffice} disabled={!isEditing}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Office 1">Office 1</SelectItem>
                      <SelectItem value="Office 2">Office 2</SelectItem>
                      <SelectItem value="Office 3">Office 3</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="transportCompany">運送会社</Label>
                  <Select value={orderData.transportCompany} disabled={!isEditing}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Carrier 1">Carrier 1</SelectItem>
                      <SelectItem value="Carrier 2">Carrier 2</SelectItem>
                      <SelectItem value="Carrier 3">Carrier 3</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="remarks">備考</Label>
                <Textarea
                  id="remarks"
                  value={orderData.remarks}
                  onChange={(e) => setOrderData((prev) => ({ ...prev, remarks: e.target.value }))}
                  disabled={!isEditing}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label>合計金額</Label>
                <div className="text-2xl font-bold">{orderData.amount}</div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle>変更履歴</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>日時</TableHead>
                    <TableHead>ユーザー</TableHead>
                    <TableHead>操作</TableHead>
                    <TableHead>詳細</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {history.map((entry, index) => (
                    <TableRow key={index}>
                      <TableCell>{entry.date}</TableCell>
                      <TableCell>{entry.user}</TableCell>
                      <TableCell>{entry.action}</TableCell>
                      <TableCell>{entry.details}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
