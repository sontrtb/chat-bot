import MessageInput from "../chat/components/message-input"
import { useNavigate } from "react-router-dom";
import { useSetMessageTyping } from "@/redux/hooks/message-typing";
import { Button } from "@/components/ui/button";
import { TypeAnimation } from 'react-type-animation';

import Feture1 from "@/assets/home/feture_1.png"
import Feture2 from "@/assets/home/feture_2.png"
import Feture3 from "@/assets/home/feture_3.png"

function HomeScreen() {
    const navigate = useNavigate();

    const setMessageTyping = useSetMessageTyping()

    const handleSendMess = (mess: string) => {
        setTimeout(() => {
            setMessageTyping(mess)
        }, 500)

        navigate("/chat")
    }

    return (
        <div className="m-auto">
            <h1 className="text-3xl font-semibold mb-1 w-[48rem] m-auto">Tất cả <span className="bg-gradient-to-r from-violet-500 via-yellow-500 to-red-500 text-transparent bg-clip-text">trí tuệ nhân tạo</span> hàng đầu trên thế giới.</h1>
            <h1 className="text-3xl font-semibold w-[48rem] m-auto">Đều ở đây!</h1>

            <div className="h-56 w-[48rem] m-auto flex-col bg-no-repeat bg-contain bg-[url('/images/bg-home.png')] flex justify-center items-center">
                <div className="h-2" />
                <Button size="lg" className="h-12">Chat Bot CB</Button>
            </div>

            <div className="grid grid-cols-3 gap-8 w-[66rem] mb-16">
                <div className="p-4 bg-neutral-100 rounded-lg flex items-start">
                    <div className="mr-3 w-56 h-36">
                        <h3 className="font-semibold mb-1">Sức mạnh toàn diện</h3>
                        <TypeAnimation
                            sequence={[
                                'Khai thác trí tuệ từ các nền tảng AI mạnh mẽ nhất hiện nay. Từ phân tích ngôn ngữ, tạo nội dung, đến thiết kế sáng tạo - mọi thứ đều nằm trong tầm tay bạn!',
                                3000,
                            ]}
                            cursor
                            speed={50}
                            className="text-sm font-light"
                        />
                    </div>
                    <img src={Feture1} className="w-16 object-contain" />
                </div>
                <div className="p-4 bg-neutral-100 rounded-lg flex items-start">
                    <div className="mr-3 w-56 h-36">
                        <h3 className="font-semibold mb-1">Tốc độ vượt trội</h3>
                        <TypeAnimation
                            sequence={[
                                'Không cần chờ đợi lâu - câu trả lời, hình ảnh hoặc giải pháp của bạn sẽ đến chỉ trong tích tắc. Tăng tốc ý tưởng và giải quyết vấn đề nhanh hơn bao giờ hết!',
                                3000,
                            ]}
                            cursor
                            speed={50}
                            className="text-sm font-light"
                        />
                    </div>
                    <img src={Feture2} className="w-16 object-contain" />
                </div>
                <div className="p-4 bg-neutral-100 rounded-lg flex items-start">
                    <div className="mr-3 w-56 h-36">
                        <h3 className="font-semibold mb-1 flex-1">Linh hoạt theo nhu cầu</h3>
                        <TypeAnimation
                            sequence={[
                                'Lựa chọn đúng mô hình cho các mục đích được tối ưu riêng hoặc kết hợp tất cả để đạt hiệu quả cao nhất - tùy theo nhu cầu của bạn!',
                                3000,
                            ]}
                            cursor
                            speed={50}
                            className="text-sm font-light"
                        />
                    </div>
                    <img src={Feture3} className="w-16 object-contain" />
                </div>
            </div>

            <MessageInput onSubmit={handleSendMess} />
        </div>
    )
}

export default HomeScreen