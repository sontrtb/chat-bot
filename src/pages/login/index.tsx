import { ILoginBody, login } from "@/api/auth";
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input, PasswordInput } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form"
import Rectangle from "@/assets/login/rectangle.png"
import RainbowRing from "@/assets/login/rainbow_ring.png"
import Rectangle2 from "@/assets/login/rectangle_2.png"
import Logo from "@/assets/logo/logo.png"
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { TypeAnimation } from 'react-type-animation';
import { useGetCurrentTheme, useSetTheme } from "@/redux/hooks/theme";
import { cn } from "@/lib/utils";
import { Switch } from "@/components/ui/switch";
import { useSetUser } from "@/redux/hooks/user";
import { useMutation, useQuery } from "@tanstack/react-query";
import queryKey from "@/const/query-key";
import { getListBot } from "@/api/bot";

function Login() {
    const navigate = useNavigate();
    const setUser = useSetUser();
    const theme = useGetCurrentTheme()
    const setTheme = useSetTheme();

    const {
        register,
        handleSubmit,
    } = useForm<ILoginBody>()

    const loginMuation = useMutation({
        mutationFn: login,
        onSuccess: (res) => {
            setUser(res)
            navigate("/")
        }
    })
    const onSubmit: SubmitHandler<ILoginBody> = (data) => {
        loginMuation.mutate(data)
    }

    const getListBotQuery = useQuery({
        queryKey: [queryKey.getListBot],
        queryFn: getListBot
    })

    console.log("getListBotQuery", getListBotQuery.data)

    return (
        <div className="grid grid-cols-12 gap-4 h-screen relative">
            <div className="hidden md:flex col-span-6 justify-center flex-col pl-24">
                <TypeAnimation
                    sequence={[
                        'Văn phòng UBND Hà Nội',
                        1000,
                    ]}
                    cursor={false}
                    speed={50}
                    className="font-medium text-5xl"
                />
                <TypeAnimation
                    sequence={[
                        'Với trợ lý ảo, bạn có thể học tập!',
                        800,
                        'Với trợ lý ảo, bạn có thể nghiên cứu!',
                        800,
                        'Với trợ lý ảo, bạn có thể sáng tạo!',
                        800,
                        'Tất cả trong một!',
                        1000,
                    ]}
                    speed={50}
                    repeat={Infinity}
                    className="font-medium text-2xl mt-3"
                />
                <div className="h-24" />
            </div>
            <div className="flex justify-end items-center md:pr-24 md:py-4  md:col-span-6 col-span-12">
                <div className="flex items-center space-x-2 absolute top-6 right-8">
                    <Switch
                        id="airplane-mode"
                        checked={theme === "dark"}
                        onCheckedChange={e => {
                            setTheme(e ? "dark" : "light")
                        }}
                    />
                    <Label htmlFor="airplane-mode">Chế độ tối</Label>
                </div>
                <Card className="md:w-[500px] m-auto w-11/12 z-10 bg-login-form-background backdrop-blur-sm">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <CardHeader>
                            <CardTitle className="text-2xl">
                                <TypeAnimation
                                    sequence={[
                                        'Bắt đầu khám phá!',
                                        1000,
                                    ]}
                                    cursor={false}
                                    speed={50}
                                    className="text-2xl"
                                />
                            </CardTitle>
                            <CardDescription>Đăng nhập tài khoản của bạn</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div>
                                <Label htmlFor="username">Tên đăng nhập</Label>
                                <Input id="username" className="mt-1" placeholder="Tên đăng nhập..." {...register("username", { required: true })} />
                            </div>
                            <div className="mt-3">
                                <Label htmlFor="password">Mật khẩu</Label>
                                <PasswordInput
                                    id="password"
                                    className="mt-1"
                                    placeholder="Mật khẩu..."
                                    {...register("password", { required: true })}
                                />
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

                            <Button
                                className="w-full bg-gradient-to-r from-[#628EFF] via-[#8740CD] to-[#580475] mt-6"
                                type="submit"
                                disabled={loginMuation.isPending}
                            >
                                Đăng nhập
                            </Button>

                            <p className="text-sm text-right my-4 underline">Lấy lại mật khẩu</p>

                            <div className="hidden md:flex items-center justify-between">
                                <Separator className="w-32" />
                                <p className="text-sm text-center">Danh sách trí tuệ nhân tạo</p>
                                <Separator className="w-32" />
                            </div>

                            <div className="flex justify-center mt-4">
                                {
                                    getListBotQuery.data?.map(bot => (
                                        <img src={import.meta.env.VITE_API_URL + bot.icon} className="h-10 rounded-full w-10 object-contain mx-1 p-2 bg-secondary" />
                                    ))
                                }
                            </div>

                        </CardContent>
                        <CardFooter className="hidden md:block opacity-60">
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
            <img src={Logo} className="w-20 absolute top-6 left-8 brightness-200" />
            <img src={Rectangle} className="w-36 absolute bottom-16 right-96 animate-float duration-10000" />
            <img src={Rectangle2} className={cn("w-56 absolute top-32 md:top-20 left-[40%] animate-float", theme === "dark" && "brightness-50")} />
            <img src={RainbowRing} className={cn("h-[400px] absolute bottom-0 left-0 hidden md:block", theme === "dark" && "brightness-50")} />
        </div>
    )
}

export default Login