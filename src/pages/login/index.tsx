import { ILoginBody } from "@/api/auth";
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form"
import Rectangle from "@/assets/login/rectangle.png"
import LoginSocia from "@/assets/login/login_social.png"
import RainbowRing from "@/assets/login/rainbow_ring.png"
import Rectangle2 from "@/assets/login/rectangle_2.png"
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
// import { useSetUser } from "@/redux/hooks/user";

function Login() {
    const navigate = useNavigate();
    // const setUser = useSetUser();

    const {
        register,
        handleSubmit,
        // formState: { errors },
    } = useForm<ILoginBody>()

    const onSubmit: SubmitHandler<ILoginBody> = () => {
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
        <div className="grid grid-cols-12 gap-4 h-screen relative">
            <div className="col-span-6 flex justify-center flex-col pl-24">
                <h1 className="text-6xl">Chào mừng trở lại!</h1>
                <h3 className="text-2xl border border-2 px-3 py-1 mt-3 border-black">
                    Học tập. Nghiên cứu. Sáng tạo. Tất cả trong một!
                </h3>
                <div className="h-24"/>
            </div>
            <div className="col-span-6 flex justify-end items-center pr-24">
                <Card className="w-[500px] z-10 bg-login-form-background backdrop-blur-sm">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <CardHeader>
                            <CardTitle className="text-2xl">Bắt đầu khám phá!</CardTitle>
                            <CardDescription>Deploy your new project in one-click.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div>
                                <Label htmlFor="username">Tên đăng nhập</Label>
                                <Input id="username" className="mt-1" placeholder="Tên đăng nhập..." {...register("username", { required: true })} />
                            </div>
                            <div className="mt-3">
                                <Label htmlFor="password">Mật khẩu</Label>
                                <Input id="password" className="mt-1" placeholder="Mật khẩu..." {...register("password", { required: true })} />
                            </div>

                            <div className="flex items-center space-x-2 mt-3">
                                <Checkbox id="terms" checked />
                                <label
                                    htmlFor="terms"
                                    className="text-sm"
                                >
                                    Lưu đăng nhập
                                </label>
                            </div>

                            <Button className="w-full bg-gradient-to-r from-[#628EFF] via-[#8740CD] to-[#580475] mt-6" type="submit">Đăng nhập</Button>

                            <p className="text-sm text-right my-4">Lấy lại mật khẩu</p>

                            <div className="flex items-center justify-between">
                                <Separator className="w-40" />
                                <p className="text-sm text-center">Tài khoản khác</p>
                                <Separator className="w-40" />
                            </div>

                            <img src={LoginSocia} className="h-8 w-full object-contain mt-3" style={{ zIndex: -1 }} />

                        </CardContent>
                        <CardFooter className="block opacity-60">
                            <p className="text-sm text-center my-4 w-full font-medium">Cần tạo tài khoản nhanh</p>
                            <div className="grid grid-cols-3">
                                <p className="col-span-1 text-sm underline w-full text-center">Lưu ý</p>
                                <p className="col-span-1 text-sm underline text-center w-full">Yêu cầu hỗ trợ</p>
                                <p className="col-span-1 text-sm underline">Câu hỏi thường gặp</p>
                            </div>
                        </CardFooter>
                    </form>
                </Card>

            </div>
            <img src={Rectangle} className="w-36 absolute bottom-16 right-96" style={{ zIndex: -1 }} />
            <img src={Rectangle2} className="w-52 absolute top-16 left-[40%]" style={{ zIndex: -1 }} />
            <img src={RainbowRing} className="h-[400px] absolute bottom-0 left-0" style={{ zIndex: -1 }} />
        </div>
    )
}

export default Login