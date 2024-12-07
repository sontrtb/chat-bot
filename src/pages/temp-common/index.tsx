import TempVerse from "@/components/common/temp-verse";
import { useParams } from "react-router-dom";
import { Fragment } from "react/jsx-runtime";

enum ETypeTemp {
    VERSE = "verse"
}

function TempCommon() {
    const { type, id } = useParams();

    console.log("id", id)

    const image = `
        Tháng mười hai, hoa cải vàng rợp lối,\n
        Đào Thoan bước giữa sắc hoa chen,  \n
        Con đường nơi ấy bừng lên rạng rỡ,  \n
        Tựa như lòng người đang mở rộng bến mê.\n
        \n
        Mỗi bước đi là một khúc nhạc du dương,  \n
        Cánh hoa cải rung rinh theo nhịp bước,  \n
        Đào Thoan giữa bức tranh mùa đông,  \n
        Nghe tiếng gió hát, lòng người, say nắng.\n
\n
        Sắc vàng rực chẳng phai theo thời gian,  \n
        Đường quê in dấu chân Đào Thoan,  \n
        Thiên nhiên chan hòa với lời ước hẹn,  \n
        Mỗi sớm mai, tình yêu lại dâng tràn.\n
\n
        Hoa cải tháng mười hai mãi ngát hương,  \n
        Đào Thoan cùng mộng mơ vang vọng,  \n
        Khúc hành trình theo năm tháng dài,  \n
        Hoa vàng sóng sánh, tình không phôi phai.\n
    `

    switch(type) {
        case ETypeTemp.VERSE:
            return (
                <div >
                    <TempVerse>
                        <div
                            className=""
                            dangerouslySetInnerHTML={{ __html: image }}
                        />
                    </TempVerse>
                </div>
            )
        default: 
            return <Fragment />
    }
}

export default TempCommon