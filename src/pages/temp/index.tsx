import { useParams } from "react-router-dom";

function Temp() {
    const { id } = useParams();

    const link = `https://kiosk.xbot.vn/api/public/pa/image/${id}`

    return (
        <img src={link} className="w-screen"/>
    )
}

export default Temp