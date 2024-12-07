import rootApi from "./api";

const path = {
    getDataTemp: "/public/mess/",
};

const getDataTemp = async (id: string): Promise<string> => {
  return await rootApi(
    {
      url: path.getDataTemp + id,
      method: "get",
    },
  );
};

export { getDataTemp };
