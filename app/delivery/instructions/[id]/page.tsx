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

export default function DeliveryInstructionDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const [isEditing, setIsEditing] = useState(false)

  // Mock delivery instruction data
  const [instructionData, setInstructionData] = useState({
    id: params.id,
    orderNumber: "2024-001",
    customer: "ABC商事",
    item: "出光A",
    deliveryAddress: "東京都千代田区1-1-1",
    contactPerson: "山田太郎",
    contactPhone: "03-1234-5678",
    status: "運送前",
    deliveryDate: "2024-01-21",
    deliveryTime: "午前",
    driverName: "田中運転手",
    vehicleNumber: "品川500あ1234",
    carrier: "運送会社1",
    specialInstructions: "取扱注意",
    estimatedDuration: "2時間",
    quantity: "100L",
  })

  // Mock history data
  const [history, setHistory] = useState([
    {
      date: "2024-01-20 10:30",
      user: "admin@company.com",
      action: "運送対象作成",
      details: "初回運送対象登録",
    },
    {
      date: "2024-01-20 14:20",
      user: "admin@company.com",
      action: "ステータス更新",
      details: "運送前に変更",
    },
  ])

  const canEdit = instructionData.status === "運送前"

  const handleSave = () => {
    toast({
      title: "運送対象が更新されました",
      description: "運送対象詳細が正常に保存されました",
    })
    setIsEditing(false)
  }

  const exportPDF = () => {
    toast({
      title: "PDF出力",
      description: "運送対象詳細のPDFが生成されました",
    })
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">運送対象詳細</h1>
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
          <TabsTrigger value="details">運送対象詳細</TabsTrigger>
          <TabsTrigger value="history">履歴</TabsTrigger>
        </TabsList>

        <TabsContent value="details">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>運送情報</CardTitle>
                <Badge
                  variant={
                    instructionData.status === "運送完了"
                      ? "default"
                      : instructionData.status === "運送中"
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
                  <Label htmlFor="customer">顧客</Label>
                  <Input id="customer" value={instructionData.customer} disabled />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="item">油種</Label>
                  <Select
                    value={instructionData.item}
                    onValueChange={(value) => setInstructionData((prev) => ({ ...prev, item: value }))}
                    disabled={!isEditing}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="出光A">出光A</SelectItem>
                      <SelectItem value="出光B">出光B</SelectItem>
                      <SelectItem value="出光C">出光C</SelectItem>
                      <SelectItem value="軽油">軽油</SelectItem>
                      <SelectItem value="重油">重油</SelectItem>
                      <SelectItem value="ガソリン">ガソリン</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="quantity">数量</Label>
                  <Input
                    id="quantity"
                    value={instructionData.quantity}
                    onChange={(e) => setInstructionData((prev) => ({ ...prev, quantity: e.target.value }))}
                    disabled={!isEditing}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="deliveryAddress">配送先住所</Label>
                  <Input
                    id="deliveryAddress"
                    value={instructionData.deliveryAddress}
                    onChange={(e) => setInstructionData((prev) => ({ ...prev, deliveryAddress: e.target.value }))}
                    disabled={!isEditing}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contactPerson">担当者</Label>
                  <Input
                    id="contactPerson"
                    value={instructionData.contactPerson}
                    onChange={(e) => setInstructionData((prev) => ({ ...prev, contactPerson: e.target.value }))}
                    disabled={!isEditing}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contactPhone">連絡先電話番号</Label>
                  <Input
                    id="contactPhone"
                    value={instructionData.contactPhone}
                    onChange={(e) => setInstructionData((prev) => ({ ...prev, contactPhone: e.target.value }))}
                    disabled={!isEditing}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="deliveryDate">配送日</Label>
                  <Input
                    id="deliveryDate"
                    type="date"
                    value={instructionData.deliveryDate}
                    onChange={(e) => setInstructionData((prev) => ({ ...prev, deliveryDate: e.target.value }))}
                    disabled={!isEditing}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="deliveryTime">配送時間</Label>
                  <RadioGroup
                    value={instructionData.deliveryTime}
                    onValueChange={(value) => setInstructionData((prev) => ({ ...prev, deliveryTime: value }))}
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
                  <Label htmlFor="driverName">運転手</Label>
                  <Select
                    value={instructionData.driverName}
                    onValueChange={(value) => setInstructionData((prev) => ({ ...prev, driverName: value }))}
                    disabled={!isEditing}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="田中運転手">田中運転手</SelectItem>
                      <SelectItem value="佐藤運転手">佐藤運転手</SelectItem>
                      <SelectItem value="鈴木運転手">鈴木運転手</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="vehicleNumber">車両番号</Label>
                  <Input
                    id="vehicleNumber"
                    value={instructionData.vehicleNumber}
                    onChange={(e) => setInstructionData((prev) => ({ ...prev, vehicleNumber: e.target.value }))}
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
                  <Label htmlFor="estimatedDuration">予想所要時間</Label>
                  <Input
                    id="estimatedDuration"
                    value={instructionData.estimatedDuration}
                    onChange={(e) => setInstructionData((prev) => ({ ...prev, estimatedDuration: e.target.value }))}
                    disabled={!isEditing}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="specialInstructions">特別指示</Label>
                <Textarea
                  id="specialInstructions"
                  value={instructionData.specialInstructions}
                  onChange={(e) => setInstructionData((prev) => ({ ...prev, specialInstructions: e.target.value }))}
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
