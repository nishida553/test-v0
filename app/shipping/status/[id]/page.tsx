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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Download, Edit, Save, X } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"

export default function ShippingStatusDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const [isEditing, setIsEditing] = useState(false)

  // Mock shipping status data
  const [statusData, setStatusData] = useState({
    id: params.id,
    orderNumber: "2024-001",
    customer: "ABC商事",
    businessOffice: "営業所1",
    estimatedArrivalDate: "2024-01-21",
    estimatedArrivalTime: "午前",
    truckNumber: "T-001",
    status: "配送中",
    deliveryConfirmed: false,
    deliveryImpossible: false,
    notes: "特になし",
  })

  // Mock history data
  const [history, setHistory] = useState([
    {
      date: "2024-01-19 10:30",
      user: "admin@company.com",
      action: "配送状況作成",
      details: "初回配送状況登録",
    },
    {
      date: "2024-01-19 14:20",
      user: "admin@company.com",
      action: "ステータス更新",
      details: "配送中に変更",
    },
  ])

  const canEdit = statusData.status !== "配送完了"

  const handleSave = () => {
    toast({
      title: "配送状況が更新されました",
      description: "配送状況詳細が正常に保存されました",
    })
    setIsEditing(false)
  }

  const exportPDF = () => {
    toast({
      title: "PDF出力",
      description: "配送状況レポートのPDFが生成されました",
    })
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">配送状況詳細</h1>
          <p className="text-muted-foreground">受注番号 #{statusData.orderNumber}</p>
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
          <TabsTrigger value="details">配送状況詳細</TabsTrigger>
          <TabsTrigger value="history">履歴</TabsTrigger>
        </TabsList>

        <TabsContent value="details">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>配送情報</CardTitle>
                <Badge
                  variant={
                    statusData.status === "配送完了"
                      ? "default"
                      : statusData.status === "配送中"
                        ? "secondary"
                        : "outline"
                  }
                >
                  {statusData.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="orderNumber">受注番号</Label>
                  <Input id="orderNumber" value={statusData.orderNumber} disabled />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="customer">顧客</Label>
                  <Input id="customer" value={statusData.customer} disabled />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="businessOffice">営業所</Label>
                  <Select
                    value={statusData.businessOffice}
                    onValueChange={(value) => setStatusData((prev) => ({ ...prev, businessOffice: value }))}
                    disabled={!isEditing}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="営業所1">営業所1</SelectItem>
                      <SelectItem value="営業所2">営業所2</SelectItem>
                      <SelectItem value="営業所3">営業所3</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="estimatedArrivalDate">到着予定日</Label>
                  <Input
                    id="estimatedArrivalDate"
                    type="date"
                    value={statusData.estimatedArrivalDate}
                    onChange={(e) => setStatusData((prev) => ({ ...prev, estimatedArrivalDate: e.target.value }))}
                    disabled={!isEditing}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="estimatedArrivalTime">到着予定時間</Label>
                  <RadioGroup
                    value={statusData.estimatedArrivalTime}
                    onValueChange={(value) => setStatusData((prev) => ({ ...prev, estimatedArrivalTime: value }))}
                    className="flex gap-4"
                    disabled={!isEditing}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="午前" id="morning" disabled={!isEditing} />
                      <Label htmlFor="morning">午前</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="午後" id="afternoon" disabled={!isEditing} />
                      <Label htmlFor="afternoon">午後</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="truckNumber">トラック番号</Label>
                  <Input
                    id="truckNumber"
                    value={statusData.truckNumber}
                    onChange={(e) => setStatusData((prev) => ({ ...prev, truckNumber: e.target.value }))}
                    disabled={!isEditing}
                  />
                </div>

                <div className="space-y-2">
                  <Label>配送状態</Label>
                  <div className="flex flex-col gap-2 pt-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="deliveryConfirmed"
                        checked={statusData.deliveryConfirmed}
                        onCheckedChange={(checked) =>
                          setStatusData((prev) => ({ ...prev, deliveryConfirmed: checked as boolean }))
                        }
                        disabled={!isEditing}
                      />
                      <Label htmlFor="deliveryConfirmed">配送確認済み</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="deliveryImpossible"
                        checked={statusData.deliveryImpossible}
                        onCheckedChange={(checked) =>
                          setStatusData((prev) => ({ ...prev, deliveryImpossible: checked as boolean }))
                        }
                        disabled={!isEditing}
                      />
                      <Label htmlFor="deliveryImpossible">配送不可</Label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">備考</Label>
                <Textarea
                  id="notes"
                  value={statusData.notes}
                  onChange={(e) => setStatusData((prev) => ({ ...prev, notes: e.target.value }))}
                  disabled={!isEditing}
                  rows={3}
                />
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
