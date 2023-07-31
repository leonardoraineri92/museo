import { Gallery } from "./gallery";

export interface Museum {
    id: number;
    name: string;
    galleries: Gallery[];
}
