"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"

export default function ShippingStatusRegistrationPage() {
  const router = useRouter()
  const { toast } = useToast()

  const [formData, setFormData] = useState({
    orderNumber: "",
    businessOffice: "",
    estimatedArrivalDate: "",
    estimatedArrivalTime: "午前",
    truckNumber: "",
    deliveryConfirmed: false,
    deliveryImpossible: false,
    notes: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validation
    if (!formData.orderNumber || !formData.businessOffice || !formData.estimatedArrivalDate || !formData.truckNumber) {
      toast({
        title: "入力エラー",
        description: "必須項目をすべて入力してください",
        variant: "destructive",
      })
      return
    }

    // Mock shipping status creation
    toast({
      title: "配送状況が作成されました",
      description: "配送状況が正常に登録されました",
    })

    router.push("/shipping/status")
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">配送状況登録</h1>
        <p className="text-muted-foreground">新しい配送状況を作成</p>
      </div>

      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>配送状況詳細</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="orderNumber">受注番号 *</Label>
                <Select
                  value={formData.orderNumber}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, orderNumber: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="受注番号を選択" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2024-001">2024-001 (ABC商事)</SelectItem>
                    <SelectItem value="2024-002">2024-002 (XYZ株式会社)</SelectItem>
                    <SelectItem value="2024-003">2024-003 (DEF工業)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="businessOffice">営業所 *</Label>
                <Select
                  value={formData.businessOffice}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, businessOffice: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="営業所を選択" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="営業所1">営業所1</SelectItem>
                    <SelectItem value="営業所2">営業所2</SelectItem>
                    <SelectItem value="営業所3">営業所3</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="estimatedArrivalDate">到着予定日 *</Label>
                <Input
                  id="estimatedArrivalDate"
                  type="date"
                  value={formData.estimatedArrivalDate}
                  onChange={(e) => setFormData((prev) => ({ ...prev, estimatedArrivalDate: e.target.value }))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="estimatedArrivalTime">到着予定時間 *</Label>
                <RadioGroup
                  value={formData.estimatedArrivalTime}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, estimatedArrivalTime: value }))}
                  className="flex gap-4"
                  disabled={!formData.businessOffice || !formData.estimatedArrivalDate}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value="午前"
                      id="morning"
                      disabled={!formData.businessOffice || !formData.estimatedArrivalDate}
                    />
                    <Label htmlFor="morning">午前</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value="午後"
                      id="afternoon"
                      disabled={!formData.businessOffice || !formData.estimatedArrivalDate}
                    />
                    <Label htmlFor="afternoon">午後</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label htmlFor="truckNumber">トラック番号 *</Label>
                <Input
                  id="truckNumber"
                  value={formData.truckNumber}
                  onChange={(e) => setFormData((prev) => ({ ...prev, truckNumber: e.target.value }))}
                  placeholder="トラック番号を入力"
                />
              </div>

              <div className="space-y-2">
                <Label>配送状態</Label>
                <div className="flex flex-col gap-2 pt-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="deliveryConfirmed"
                      checked={formData.deliveryConfirmed}
                      onCheckedChange={(checked) =>
                        setFormData((prev) => ({ ...prev, deliveryConfirmed: checked as boolean }))
                      }
                    />
                    <Label htmlFor="deliveryConfirmed">配送確認済み</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="deliveryImpossible"
                      checked={formData.deliveryImpossible}
                      onCheckedChange={(checked) =>
                        setFormData((prev) => ({ ...prev, deliveryImpossible: checked as boolean }))
                      }
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
                value={formData.notes}
                onChange={(e) => setFormData((prev) => ({ ...prev, notes: e.target.value }))}
                placeholder="追加の備考を入力"
                rows={3}
              />
            </div>

            <div className="flex gap-4 pt-4">
              <Button type="submit">配送状況登録</Button>
              <Button type="button" variant="outline" onClick={() => router.back()}>
                キャンセル
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  )
}
