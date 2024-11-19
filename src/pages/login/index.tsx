import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useNavigate } from "react-router-dom";

function Login() {
    const navigate = useNavigate();

    const handleLogin = () => {
        navigate("/")
    }
    
    return (
        <div className="grid grid-cols-12 gap-4 h-screen">
            <div className="col-span-7 flex justify-center items-center">
                <Card className="w-[500px]">
                    <CardHeader>
                        <CardTitle className="text-2xl">Đăng nhập</CardTitle>
                        <CardDescription>Deploy your new project in one-click.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form>
                            <div>
                                <Label htmlFor="username">Tên đăng nhập</Label>
                                <Input id="username" className="mt-1" placeholder="Tên đăng nhập..." />
                            </div>
                            <div className="mt-3">
                                <Label htmlFor="password">Mật khẩu</Label>
                                <Input id="password" className="mt-1" placeholder="Mật khẩu..." />
                            </div>
                        </form>
                    </CardContent>
                    <CardFooter>
                        <Button className="w-full rounded-full" onClick={handleLogin}>Đăng nhập</Button>
                    </CardFooter>
                </Card>

            </div>
            <div className="col-span-5 bg-slate-100">

            </div>
        </div>
    )
}

export default Login