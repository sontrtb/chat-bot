import { ILoginBody, login } from "@/api/auth";
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input, PasswordInput } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form"
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { TypeAnimation } from 'react-type-animation';
import { useGetCurrentTheme, useSetTheme } from "@/redux/hooks/theme";
import { cn } from "@/lib/utils";
import { Switch } from "@/components/ui/switch";
import { useSetUser } from "@/redux/hooks/user";
import { useMutation } from "@tanstack/react-query";
import { useIsMobile } from "@/hooks/use-mobile";

const listBot = [
    "./svg/bots/gemma.svg",
    "./svg/bots/gpt.svg",
    "./svg/bots/meta.svg",
    "./svg/bots/mistral.svg",
    "./svg/bots/sonet.svg",
    "./svg/bots/ubnd.svg"
]

function Login() {
    const navigate = useNavigate();
    const setUser = useSetUser();
    const theme = useGetCurrentTheme()
    const setTheme = useSetTheme();

    const isMobile = useIsMobile()

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

    return (
        <div className="grid grid-cols-12 gap-4 h-screen relative">
            <div className="hidden md:flex col-span-6 justify-center flex-col pl-24">
                <TypeAnimation
                    sequence={[
                        'VĂN PHÒNG UBND THÀNH PHỐ HÀ NỘI',
                        1000,
                    ]}
                    cursor={false}
                    speed={50}
                    className="font-medium text-4xl text-center"
                />
                 <TypeAnimation
                    sequence={[
                        'HANOI ARTIFICIAL INTELLIGENCE',
                        1000,
                    ]}
                    speed={50}
                    cursor={false}
                    repeat={Infinity}
                    className="font-medium text-2xl mt-3 text-center"
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
                    cursor={false}
                    repeat={Infinity}
                    className="font-medium text-2xl mt-3 text-center h-20"
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
                                    className="text-2xl hidden md:block"
                                />
                                <TypeAnimation
                                    sequence={[
                                        "VĂN PHÒNG ỦY BAN NHÂN DÂN THÀNH PHỐ HÀ NỘI",
                                        1000,
                                    ]}
                                    cursor={false}
                                    speed={50}
                                    className="text-2xl block md:hidden h-20"
                                />
                            </CardTitle>
                            <CardDescription>{isMobile ? "HANOI ARTIFICIAL INTELLIGENCE" : "Đăng nhập tài khoản của bạn"}</CardDescription>
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
                                className="w-full bg-gradient-to-r from-[#628EFF] to-[#0068b4] mt-6"
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
                                    listBot.map(bot => (
                                        <img src={bot} className="h-10 rounded-full w-10 object-contain mx-1 p-2 bg-secondary" />
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
            <img src="./logo.svg" className={cn("w-20 absolute top-6 left-8", theme === "dark" && "brightness-200")} />
            <div className={cn("w-36 h-36 absolute bottom-16 right-96 animate-float duration-10000 bg-primary-blue rounded-full blur-sm")} />
            <div className={cn("w-56 h-56 absolute top-32 md:top-20 left-[40%] animate-float bg-primary-blue rounded-full blur-sm", theme === "dark" && "brightness-50")} />
        </div>
    )
}

export default Login