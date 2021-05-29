import {CountryData} from "./country-data";
import {WorldDataLimit} from "./world-data-limit";

export interface WorldData {
    colors: WorldDataLimit[];
    countries: CountryData[];
}
