import TempVerse from "@/components/common/temp-verse";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { Fragment } from "react/jsx-runtime";
import { getDataTemp } from "@/api/temp";
import queryKey from "@/const/query-key";
import { marked } from "marked";

enum ETypeTemp {
    VERSE = "verse"
}

function TempCommon() {
    const { type, id } = useParams();

    const getDataTempQuery = useQuery({
        queryFn: () => getDataTemp(id ?? ""),
        queryKey: [queryKey.getDataTemp, id],
        enabled: !!id
    })


    switch (type) {
        case ETypeTemp.VERSE:
            return (
                <div >
                    <TempVerse>
                        <div
                            className="text-slate-700"
                            dangerouslySetInnerHTML={{ __html: marked.parse(getDataTempQuery.data ?? "sd s ds d") as string }}
                        />
                    </TempVerse>
                </div>
            )
        default:
            return <Fragment />
    }
}

export default TempCommon