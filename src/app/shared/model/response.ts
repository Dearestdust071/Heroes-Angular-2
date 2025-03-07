export interface Product {
    data?:         Datum[];
    totalRecords?: number;
}

export interface Datum {
    id?:          number;
    nombre?:      string;
    genero?:      Genero;
    descripcion?: string;
    url?:         string;
    categoria?:   string;
    created_at?:  Date;
    updated_at?:  Date;
}

export enum Genero {
    Empty = "",
    Hombre = "hombre",
    Mujer = "mujer",
}
