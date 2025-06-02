"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import {
  Download,
  CheckCircle,
  XCircle,
  MessageSquare,
  Clock,
  MapPin,
  Truck,
  User,
  AlertTriangle,
  FileText,
} from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"

export default function AgreementTargetDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()

  const [agreementDecision, setAgreementDecision] = useState("")
  const [customerComments, setCustomerComments] = useState("")

  // Mock agreement target data
  const [targetData] = useState({
    id: params.id,
    orderNumber: "2024-001",
    customer: "ABC商事",
    customerContact: "山田太郎",
    customerPhone: "03-1234-5678",
    customerEmail: "yamada@abc-corp.com",
    oilType: "出光A",
    quantity: "100L",
    deliveryAddress: "東京都千代田区1-1-1 ABCビル1F",
    plannedDeliveryDate: "2024-01-21",
    plannedDeliveryTime: "午前 (09:00-12:00)",
    transportCompany: "運送会社1",
    driverName: "田中運転手",
    driverPhone: "090-1234-5678",
    vehicleNumber: "品川500あ1234",
    vehicleType: "タンクローリー (5000L)",
    agreementStatus: "承認待ち",
    planSubmittedDate: "2024-01-20 14:30",
    urgencyLevel: "通常",
    estimatedDuration: "2時間",
    estimatedArrival: "09:30",
    estimatedDeparture: "11:30",
    specialInstructions: "取扱注意・荷卸し場所は正面入口左側",
    transportRoute: "営業所 → 首都高速 → 千代田区",
    emergencyContact: "運送会社1 緊急連絡先: 03-5678-9012",
  })

  // Mock history data
  const [history] = useState([
    {
      date: "2024-01-20 14:30",
      user: "運送会社1",
      action: "運送計画提出",
      details: "初回運送計画を提出しました",
    },
    {
      date: "2024-01-20 15:00",
      user: "system",
      action: "承認依頼送信",
      details: "需要家に承認依頼メールを送信しました",
    },
  ])

  const handleApproval = () => {
    if (!agreementDecision) {
      toast({
        title: "選択エラー",
        description: "承認・否認を選択してください",
        variant: "destructive",
      })
      return
    }

    const action = agreementDecision === "approve" ? "承認" : "否認"
    toast({
      title: `運送計画を${action}しました`,
      description: `運送計画が正常に${action}されました`,
    })

    // Redirect back to list
    router.push("/agreement/targets")
  }

  const handleRequestRevision = () => {
    if (!customerComments.trim()) {
      toast({
        title: "入力エラー",
        description: "修正依頼の理由を入力してください",
        variant: "destructive",
      })
      return
    }

    toast({
      title: "修正依頼を送信しました",
      description: "運送会社に修正依頼が送信されました",
    })

    router.push("/agreement/targets")
  }

  const exportPDF = () => {
    toast({
      title: "PDF出力",
      description: "運送計画書のPDFが生成されました",
    })
  }

  const canTakeAction = targetData.agreementStatus === "承認待ち"

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">合意対象詳細</h1>
          <p className="text-muted-foreground">受注番号 #{targetData.orderNumber} の運送計画確認</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={exportPDF} variant="outline">
            <Download className="mr-2 h-4 w-4" />
            PDF出力
          </Button>
        </div>
      </div>

      <Tabs defaultValue="plan" className="space-y-4">
        <TabsList>
          <TabsTrigger value="plan">運送計画</TabsTrigger>
          <TabsTrigger value="approval">承認・確認</TabsTrigger>
          <TabsTrigger value="history">履歴</TabsTrigger>
        </TabsList>

        <TabsContent value="plan">
          <div className="grid gap-6 md:grid-cols-2">
            {/* 基本情報 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  基本情報
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-3">
                  <div className="flex justify-between">
                    <Label className="font-medium">受注番号:</Label>
                    <span>{targetData.orderNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <Label className="font-medium">需要家:</Label>
                    <span>{targetData.customer}</span>
                  </div>
                  <div className="flex justify-between">
                    <Label className="font-medium">油種:</Label>
                    <Badge variant="outline">{targetData.oilType}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <Label className="font-medium">数量:</Label>
                    <span>{targetData.quantity}</span>
                  </div>
                  <div className="flex justify-between">
                    <Label className="font-medium">緊急度:</Label>
                    <div className="flex items-center gap-1">
                      {targetData.urgencyLevel === "急ぎ" && <AlertTriangle className="h-4 w-4 text-orange-500" />}
                      <span>{targetData.urgencyLevel}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 配送情報 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  配送情報
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label className="font-medium">配送先住所:</Label>
                  <p className="text-sm">{targetData.deliveryAddress}</p>
                </div>
                <div className="grid gap-3">
                  <div className="flex justify-between">
                    <Label className="font-medium">配送予定日:</Label>
                    <span>{targetData.plannedDeliveryDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <Label className="font-medium">配送時間:</Label>
                    <span>{targetData.plannedDeliveryTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <Label className="font-medium">到着予定:</Label>
                    <span>{targetData.estimatedArrival}</span>
                  </div>
                  <div className="flex justify-between">
                    <Label className="font-medium">出発予定:</Label>
                    <span>{targetData.estimatedDeparture}</span>
                  </div>
                  <div className="flex justify-between">
                    <Label className="font-medium">所要時間:</Label>
                    <span>{targetData.estimatedDuration}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 運送情報 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Truck className="h-5 w-5" />
                  運送情報
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-3">
                  <div className="flex justify-between">
                    <Label className="font-medium">運送会社:</Label>
                    <span>{targetData.transportCompany}</span>
                  </div>
                  <div className="flex justify-between">
                    <Label className="font-medium">車両番号:</Label>
                    <span>{targetData.vehicleNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <Label className="font-medium">車両タイプ:</Label>
                    <span>{targetData.vehicleType}</span>
                  </div>
                  <div className="space-y-1">
                    <Label className="font-medium">運送ルート:</Label>
                    <p className="text-sm text-muted-foreground">{targetData.transportRoute}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 担当者情報 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  担当者情報
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-3">
                  <div className="flex justify-between">
                    <Label className="font-medium">運転手:</Label>
                    <span>{targetData.driverName}</span>
                  </div>
                  <div className="flex justify-between">
                    <Label className="font-medium">運転手連絡先:</Label>
                    <span>{targetData.driverPhone}</span>
                  </div>
                  <div className="space-y-1">
                    <Label className="font-medium">緊急連絡先:</Label>
                    <p className="text-sm text-muted-foreground">{targetData.emergencyContact}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 特別指示 */}
          <Card>
            <CardHeader>
              <CardTitle>特別指示・注意事項</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm">{targetData.specialInstructions}</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="approval">
          {canTakeAction ? (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  承認・確認
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <Label className="text-base font-medium">運送計画の承認</Label>
                  <RadioGroup value={agreementDecision} onValueChange={setAgreementDecision}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="approve" id="approve" />
                      <Label htmlFor="approve" className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        承認する
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="reject" id="reject" />
                      <Label htmlFor="reject" className="flex items-center gap-2">
                        <XCircle className="h-4 w-4 text-red-500" />
                        否認する
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <Separator />

                <div className="space-y-4">
                  <Label htmlFor="comments" className="text-base font-medium">
                    コメント・修正依頼
                  </Label>
                  <Textarea
                    id="comments"
                    value={customerComments}
                    onChange={(e) => setCustomerComments(e.target.value)}
                    placeholder="承認・否認の理由や修正依頼の詳細を入力してください"
                    rows={4}
                  />
                </div>

                <div className="flex gap-4 pt-4">
                  <Button onClick={handleApproval} disabled={!agreementDecision}>
                    <CheckCircle className="mr-2 h-4 w-4" />
                    決定を送信
                  </Button>
                  <Button onClick={handleRequestRevision} variant="outline">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    修正依頼
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>承認状況</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <Badge variant={targetData.agreementStatus === "承認済み" ? "default" : "destructive"}>
                    {targetData.agreementStatus}
                  </Badge>
                  <span className="text-sm text-muted-foreground">この運送計画は既に処理済みです</span>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                処理履歴
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>日時</TableHead>
                    <TableHead>処理者</TableHead>
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
