import { useState } from "react"
import { Eye, EyeOff, LogIn } from "lucide-react"
import { Button } from "@/models/ui/button"
import { Input } from "@/models/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/models/ui/card"
import { useToast } from "@/hooks/use-toast"

interface AdminProps {
  onLogin: () => void
}

export default function Admin({ onLogin }: AdminProps) {
  const [credentials, setCredentials] = useState({ email: "", password: "" })
  const [showPassword, setShowPassword] = useState(false)
  const { toast } = useToast()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (credentials.email === "stock@gmail.com" && credentials.password === "123456") {
      toast({
        title: "Login successful",
        description: "Welcome to the admin panel!",
      })
      onLogin()
    } else {
      toast({
        title: "Invalid credentials",
        description: "Please check your email and password.",
        variant: "destructive"
      })
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Admin Login</CardTitle>
          <p className="text-muted-foreground">Access the stock management panel</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
              <Input
                id="email"
                type="email"
                value={credentials.email}
                onChange={(e) => setCredentials(prev => ({ ...prev, email: e.target.value }))}
                placeholder="stock@gmail.com"
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-2">Password</label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={credentials.password}
                  onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
                  placeholder="123456"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>
            <Button type="submit" className="w-full">
              <LogIn className="h-4 w-4 mr-2" />
              Login
            </Button>
          </form>
          <div className="mt-4 p-3 bg-muted rounded text-sm text-muted-foreground">
            {/* <p><strong>Demo Credentials:</strong></p>
            <p>Email: stock@gmail.com</p>
            <p>Password: 123456</p> */}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

