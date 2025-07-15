// eslint-disable-next-line

import { Pallete, PaletteColor } from "@mui/material/styles/createPalette";

declare module "@mui/material/styles/createPalette" {
    interface PaletteColor {
        [key: number]: string;

    }

    interface Pallete {
        tertiary: PaletteColor;
    }
}