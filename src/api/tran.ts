import rootApi from "./api";

interface IVoiceToTextBody {
    fileName: string;
    fileData: string;
}

const path = {
  voiceToText: "/a/trans",
};

const voiceToText = async (data: IVoiceToTextBody): Promise<string> => {
  return await rootApi(
    {
      url: path.voiceToText,
      method: "post",
      data: data
    },
  );
};

export { voiceToText };
