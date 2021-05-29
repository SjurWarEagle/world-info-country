import axios, {AxiosInstance} from "axios";
import {Parser, Builder} from "xml2js";
import {WorldData} from "../types/world-data";
import {CountryData} from "../types/country-data";

import { Injectable } from '@nestjs/common';
import {readFileSync} from "fs";

@Injectable()
export class SvgLoaderService {
  readonly instance: AxiosInstance;

  constructor() {
    this.instance = axios.create()
  }

  public async load(worldData: WorldData): Promise<string> {
    const response = await readFileSync('public/world_border.svg')
    const xml = await new Parser().parseStringPromise(response);
    console.debug(xml);

    // TODO add size handling
    // xml.svg.$.width = '1000';

    this.highlightCountries(xml, worldData)


    return new Builder().buildObject(xml);
  }

  private highlightCountry(xml: any, isoString: string, fillColor: string) {
    for (let country of xml.svg.g[0].path) {
      if (country.$['data-iso'].toLowerCase() === isoString.toLowerCase()) {
        country.$.style = `fill: ${fillColor};`;
      }
    }
  }

  private highlightCountries(xml: any, worldData: WorldData) {
    worldData.countries.forEach((countryData: CountryData) => {
      const result = worldData.colors.find((entry) => entry.min < countryData.value && entry.max >= countryData.value)
      if (!result) {
        console.log('result=', result);
        console.log('countryData=', countryData);
      } else {
        const color = result.color;
        this.highlightCountry(xml, countryData.isoCode, color);
      }
    })
  }
}
