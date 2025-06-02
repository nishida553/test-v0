"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Download,
  Upload,
  Database,
  FileText,
  Settings,
  Activity,
  Calendar,
  Clock,
  AlertTriangle,
  CheckCircle,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

// Mock data for system logs
const systemLogs = [
  {
    id: "LOG-001",
    timestamp: "2024-01-20 10:30:15",
    level: "INFO",
    module: "受注管理",
    action: "受注作成",
    user: "admin@company.com",
    details: "受注番号2024-001が作成されました",
  },
  {
    id: "LOG-002",
    timestamp: "2024-01-20 11:15:22",
    level: "WARNING",
    module: "配送管理",
    action: "配送遅延",
    user: "system",
    details: "受注番号2024-002の配送が遅延しています",
  },
  {
    id: "LOG-003",
    timestamp: "2024-01-20 14:45:33",
    level: "ERROR",
    module: "マスタ管理",
    action: "データ更新失敗",
    user: "admin@company.com",
    details: "顧客マスタの更新に失敗しました",
  },
]

// Mock data for scheduled tasks
const scheduledTasks = [
  {
    id: "TASK-001",
    name: "日次データバックアップ",
    schedule: "毎日 02:00",
    lastRun: "2024-01-20 02:00:00",
    status: "成功",
    nextRun: "2024-01-21 02:00:00",
  },
  {
    id: "TASK-002",
    name: "週次レポート生成",
    schedule: "毎週月曜日 06:00",
    lastRun: "2024-01-15 06:00:00",
    status: "成功",
    nextRun: "2024-01-22 06:00:00",
  },
  {
    id: "TASK-003",
    name: "月次データクリーンアップ",
    schedule: "毎月1日 01:00",
    lastRun: "2024-01-01 01:00:00",
    status: "失敗",
    nextRun: "2024-02-01 01:00:00",
  },
]

export default function OthersPage() {
  const { toast } = useToast()
  const [selectedLogLevel, setSelectedLogLevel] = useState("all")
  const [selectedModule, setSelectedModule] = useState("all")
  const [backupDate, setBackupDate] = useState("")
  const [importFile, setImportFile] = useState("")

  const filteredLogs = systemLogs.filter((log) => {
    const matchesLevel = selectedLogLevel === "all" || log.level === selectedLogLevel
    const matchesModule = selectedModule === "all" || log.module === selectedModule
    return matchesLevel && matchesModule
  })

  const handleDataBackup = () => {
    toast({
      title: "データバックアップ開始",
      description: "システムデータのバックアップを開始しました",
    })
  }

  const handleDataRestore = () => {
    if (!backupDate) {
      toast({
        title: "エラー",
        description: "復元日を選択してください",
        variant: "destructive",
      })
      return
    }
    toast({
      title: "データ復元開始",
      description: `${backupDate}のバックアップからデータを復元中です`,
    })
  }

  const handleDataImport = () => {
    if (!importFile) {
      toast({
        title: "エラー",
        description: "インポートファイルを選択してください",
        variant: "destructive",
      })
      return
    }
    toast({
      title: "データインポート開始",
      description: "選択されたファイルからデータをインポート中です",
    })
  }

  const handleDataExport = () => {
    toast({
      title: "データエクスポート開始",
      description: "システムデータをエクスポート中です",
    })
  }

  const handleSystemMaintenance = () => {
    toast({
      title: "システムメンテナンス開始",
      description: "システムメンテナンスを実行中です",
    })
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">その他機能</h1>
        <p className="text-muted-foreground">システム管理とユーティリティ機能</p>
      </div>

      <Tabs defaultValue="logs" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="logs">システムログ</TabsTrigger>
          <TabsTrigger value="backup">バックアップ・復元</TabsTrigger>
          <TabsTrigger value="import-export">インポート・エクスポート</TabsTrigger>
          <TabsTrigger value="maintenance">システム保守</TabsTrigger>
        </TabsList>

        <TabsContent value="logs">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  システムログ
                </CardTitle>
                <div className="flex gap-2">
                  <Select value={selectedLogLevel} onValueChange={setSelectedLogLevel}>
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="レベル" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">すべて</SelectItem>
                      <SelectItem value="INFO">INFO</SelectItem>
                      <SelectItem value="WARNING">WARNING</SelectItem>
                      <SelectItem value="ERROR">ERROR</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={selectedModule} onValueChange={setSelectedModule}>
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="モジュール" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">すべて</SelectItem>
                      <SelectItem value="受注管理">受注管理</SelectItem>
                      <SelectItem value="配送管理">配送管理</SelectItem>
                      <SelectItem value="マスタ管理">マスタ管理</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>日時</TableHead>
                    <TableHead>レベル</TableHead>
                    <TableHead>モジュール</TableHead>
                    <TableHead>操作</TableHead>
                    <TableHead>ユーザー</TableHead>
                    <TableHead>詳細</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredLogs.map((log) => (
                    <TableRow key={log.id}>
                      <TableCell>{log.timestamp}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            log.level === "ERROR" ? "destructive" : log.level === "WARNING" ? "secondary" : "default"
                          }
                        >
                          {log.level}
                        </Badge>
                      </TableCell>
                      <TableCell>{log.module}</TableCell>
                      <TableCell>{log.action}</TableCell>
                      <TableCell>{log.user}</TableCell>
                      <TableCell>{log.details}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="backup">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5" />
                  データバックアップ
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">システム全体のデータをバックアップします</p>
                <Button onClick={handleDataBackup} className="w-full">
                  <Download className="mr-2 h-4 w-4" />
                  バックアップ実行
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="h-5 w-5" />
                  データ復元
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="backupDate">復元日選択</Label>
                  <Input
                    id="backupDate"
                    type="date"
                    value={backupDate}
                    onChange={(e) => setBackupDate(e.target.value)}
                  />
                </div>
                <Button onClick={handleDataRestore} variant="outline" className="w-full">
                  <Upload className="mr-2 h-4 w-4" />
                  復元実行
                </Button>
              </CardContent>
            </Card>
          </div>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                スケジュールタスク
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>タスク名</TableHead>
                    <TableHead>スケジュール</TableHead>
                    <TableHead>最終実行</TableHead>
                    <TableHead>ステータス</TableHead>
                    <TableHead>次回実行</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {scheduledTasks.map((task) => (
                    <TableRow key={task.id}>
                      <TableCell className="font-medium">{task.name}</TableCell>
                      <TableCell>{task.schedule}</TableCell>
                      <TableCell>{task.lastRun}</TableCell>
                      <TableCell>
                        <Badge variant={task.status === "成功" ? "default" : "destructive"}>{task.status}</Badge>
                      </TableCell>
                      <TableCell>{task.nextRun}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="import-export">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="h-5 w-5" />
                  データインポート
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="importFile">インポートファイル</Label>
                  <Select value={importFile} onValueChange={setImportFile}>
                    <SelectTrigger>
                      <SelectValue placeholder="ファイルを選択" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="customers.csv">顧客マスタ (CSV)</SelectItem>
                      <SelectItem value="products.csv">商品マスタ (CSV)</SelectItem>
                      <SelectItem value="orders.csv">受注データ (CSV)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button onClick={handleDataImport} className="w-full">
                  <Upload className="mr-2 h-4 w-4" />
                  インポート実行
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Download className="h-5 w-5" />
                  データエクスポート
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">システムデータをCSV形式でエクスポートします</p>
                <div className="space-y-2">
                  <Button onClick={handleDataExport} variant="outline" className="w-full">
                    <FileText className="mr-2 h-4 w-4" />
                    全データエクスポート
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="maintenance">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  システムメンテナンス
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <Button onClick={handleSystemMaintenance} variant="outline" className="w-full">
                    <Database className="mr-2 h-4 w-4" />
                    データベース最適化
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Clock className="mr-2 h-4 w-4" />
                    ログファイルクリーンアップ
                  </Button>
                  <Button variant="outline" className="w-full">
                    <CheckCircle className="mr-2 h-4 w-4" />
                    システム整合性チェック
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  システム状態
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">データベース接続</span>
                    <Badge variant="default">正常</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">ディスク使用量</span>
                    <Badge variant="secondary">75%</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">メモリ使用量</span>
                    <Badge variant="default">45%</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">最終バックアップ</span>
                    <span className="text-sm text-muted-foreground">2024-01-20</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
