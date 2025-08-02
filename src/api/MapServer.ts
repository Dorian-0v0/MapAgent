import { gaodekey, tiandituKey } from "@/utils/request";
import axios from 'axios';
export const inverseGeoService = async (location) => {
    const { longitude, latitude } = location;
    try {
        const response = await axios.get(`http://api.tianditu.gov.cn/geocoder`, {
            params: {
                postStr: JSON.stringify({
                    lon: longitude,
                    lat: latitude,
                    ver: 1
                }),
                type: 'geocode',
                tk: tiandituKey
            }
        });
        console.log("响应数据：", response);
        if (response.data.status === "0") {
            const { formatted_address, addressComponent } = response.data.result;
            const { town, county, city, province,poi ,county_code} = addressComponent;

            return {
                town: town,
                county: county,
                city: city,
                province: province,
                poi: poi,
                countyCode:county_code 
            };
        } else {
            console.error("逆地理编码服务返回错误：", response.data.msg);
            return null;
        }

    } catch (error) {
        console.error("获取数据时发生错误：", error);
    }
}


// export const weatherService = async (locationCode : string) => { 
//     try {
//         const response = await axios.get(`https://restapi.amap.com/v3/weather/weatherInfo`, {
//             params: {
//                 city: locationCode,
//                 key: gaodekey
//             }
//         });
//         console.log("响应数据：", response);
//         if (response.data.status != 1) {
//             console.error("获取", response.data.msg);
//         }

// }