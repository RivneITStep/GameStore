import { SysReqAdd } from './sysreq-add.model';

export class ProductAdd {
  name: string;
  price: number;
  description: string;
  evaluation: number;
  developer: string;
  publisher: string;
  data: any;

  imageHead: string;
  image1: string;
  image2: string;
  image3: string;
  image4: string;

  sysreqProduct: SysReqAdd;
  sysminProduct: SysReqAdd;

  listidLang: number[];
  listidCateg: number[];

  constructor() {
    this.name = null;
    this.price = null;
    this.description = null;
    this.evaluation = null;
    this.developer = null;
    this.publisher = null;
    this.data = null;
    this.imageHead = null;
    this.image1 = null;
    this.image2 = null;
    this.image3 = null;
    this.image4 = null;
  }

}
