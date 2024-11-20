import { ILoginBody, login } from "@/api/auth";
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form"
import { useSetUser } from "@/redux/hooks/user";

function Login() {
    const navigate = useNavigate();
    const setUser = useSetUser();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ILoginBody>()

    const onSubmit: SubmitHandler<ILoginBody> = (data) => {
        // login(data).then((res) => {
        //     console.log("res", res)
        //     setUser(res)
        //     navigate("/")
        // }).catch((err) => {
        //     console.log("err", err)
        // })

        navigate("/")
    }

    return (
        <div className="grid grid-cols-12 gap-4 h-screen">
            <div className="col-span-7 flex justify-center items-center">
                <Card className="w-[500px]">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <CardHeader>
                            <CardTitle className="text-2xl">Đăng nhập</CardTitle>
                            <CardDescription>Deploy your new project in one-click.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div>
                                <Label htmlFor="username">Tên đăng nhập</Label>
                                <Input id="username" className="mt-1" placeholder="Tên đăng nhập..." {...register("username", {required: true})}/>
                            </div>
                            <div className="mt-3">
                                <Label htmlFor="password">Mật khẩu</Label>
                                <Input id="password" className="mt-1" placeholder="Mật khẩu..." {...register("password", {required: true})}/>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button className="w-full rounded-full" type="submit">Đăng nhập</Button>
                        </CardFooter>
                    </form>
                </Card>

            </div>
            <div className="col-span-5 bg-slate-100">

            </div>
        </div>
    )
}

export default Login