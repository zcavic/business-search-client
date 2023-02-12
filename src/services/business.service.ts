import http from "../http-common";
import { IBusinessData, IBusinessDetailsData } from "../types/business.type";

class BusinessDataService {
    getAll(search: string) {
        return http.get<Array<IBusinessData>>(`/businesses?filter=${search}`);
    }

    get(id: string) {
        return http.get<IBusinessDetailsData>(`/businesses/${id}`);
    }

    findByName(name: string) {
        return http.get<Array<IBusinessData>>(`/businesses?name=${name}`);
    }
}

export default new BusinessDataService();
