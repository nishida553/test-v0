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
import { Download, Edit, Save, X } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"

export default function ShippingInstructionDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const [isEditing, setIsEditing] = useState(false)

  // Mock shipping instruction data
  const [instructionData, setInstructionData] = useState({
    id: params.id,
    orderNumber: "2024-001",
    customer: "ABC商事",
    specialStore: "店舗A",
    status: "配送前",
    shipmentDate: "2024-01-20",
    shipmentTime: "午前",
    truckNumber: "T-001",
    carrier: "運送会社1",
    notes: "特になし",
    oilType: "原油", // 新しい油種選択欄の追加
  })

  // Mock history data
  const [history, setHistory] = useState([
    {
      date: "2024-01-18 10:30",
      user: "admin@company.com",
      action: "配送指示作成",
      details: "初回配送指示登録",
    },
    {
      date: "2024-01-18 14:20",
      user: "admin@company.com",
      action: "ステータス更新",
      details: "配送前に変更",
    },
  ])

  const canEdit = instructionData.status === "配送前"

  const handleSave = () => {
    toast({
      title: "配送指示が更新されました",
      description: "配送指示詳細が正常に保存されました",
    })
    setIsEditing(false)
  }

  const exportPDF = () => {
    toast({
      title: "PDF出力",
      description: "配送指示書のPDFが生成されました",
    })
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">配送指示詳細</h1>
          <p className="text-muted-foreground">受注番号 #{instructionData.orderNumber}</p>
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
          <TabsTrigger value="details">配送指示詳細</TabsTrigger>
          <TabsTrigger value="history">履歴</TabsTrigger>
        </TabsList>

        <TabsContent value="details">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>配送情報</CardTitle>
                <Badge
                  variant={
                    instructionData.status === "配送完了"
                      ? "default"
                      : instructionData.status === "配送中"
                        ? "secondary"
                        : "outline"
                  }
                >
                  {instructionData.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="orderNumber">受注番号</Label>
                  <Input id="orderNumber" value={instructionData.orderNumber} disabled />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="customer">需要家</Label>
                  <Input id="customer" value={instructionData.customer} disabled />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="specialStore">特販店</Label>
                  <Input id="specialStore" value={instructionData.specialStore} disabled />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="shipmentDate">出荷日</Label>
                  <Input
                    id="shipmentDate"
                    type="date"
                    value={instructionData.shipmentDate}
                    onChange={(e) => setInstructionData((prev) => ({ ...prev, shipmentDate: e.target.value }))}
                    disabled={!isEditing}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="shipmentTime">出荷時間</Label>
                  <RadioGroup
                    value={instructionData.shipmentTime}
                    onValueChange={(value) => setInstructionData((prev) => ({ ...prev, shipmentTime: value }))}
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
                    value={instructionData.truckNumber}
                    onChange={(e) => setInstructionData((prev) => ({ ...prev, truckNumber: e.target.value }))}
                    disabled={!isEditing}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="carrier">運送会社</Label>
                  <Select
                    value={instructionData.carrier}
                    onValueChange={(value) => setInstructionData((prev) => ({ ...prev, carrier: value }))}
                    disabled={!isEditing}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="運送会社1">運送会社1</SelectItem>
                      <SelectItem value="運送会社2">運送会社2</SelectItem>
                      <SelectItem value="運送会社3">運送会社3</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="oilType">油種</Label>
                  <Select
                    value={instructionData.oilType}
                    onValueChange={(value) => setInstructionData((prev) => ({ ...prev, oilType: value }))}
                    disabled={!isEditing}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="原油">原油</SelectItem>
                      <SelectItem value="軽油">軽油</SelectItem>
                      <SelectItem value="重油">重油</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">備考</Label>
                <Textarea
                  id="notes"
                  value={instructionData.notes}
                  onChange={(e) => setInstructionData((prev) => ({ ...prev, notes: e.target.value }))}
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
